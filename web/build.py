"""Baut die Web-Version nach web/_site (für GitHub Pages).

Aufruf aus dem Repo-Root: python3 web/build.py
"""
import base64
import hashlib
import json
import pathlib
import re
import shutil

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
OUT = ROOT / "_site"

CONTENT = [
    "c_ga2.js", "c_ga1.js", "c_wiso.js", "clips_ga2.js", "clips_ga1.js", "clips_wiso.js",
    "n_a.js", "n_b.js", "n_c.js", "n_d.js", "nclips_a.js", "nclips_b.js", "nclips_c.js", "nclips_d.js",
    "wiso_bank.js", "cases_ga1.js", "cases_ga2.js", "cases_ga1b.js", "cases_ga2b.js", "belegsatz.js",
    "firebase-config.js", "dialog_ga1.js", "dialog_ga2.js", "dialog_wiso.js", "merke.js", "qfix.js", "extra_ga1.js", "extra_ga2.js", "extra_wiso.js",
]

HEAD = """<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="AP2 Trainer">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="#F4F5FA">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" href="icon-192.png">
<link rel="manifest" href="manifest.webmanifest">
</head>
<body>
"""

MANIFEST = {
    "name": "AP2 Trainer",
    "short_name": "AP2 Trainer",
    "lang": "de",
    "start_url": "./",
    "scope": "./",
    "display": "standalone",
    "background_color": "#F4F5FA",
    "theme_color": "#F4F5FA",
    "icons": [
        {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
    ],
}


def csp_meta(page):
    """Strenge Content-Security-Policy: Inline-Skripte nur per SHA-256-Hash, keine fremden Skriptquellen
    außer Googles Login (apis.google.com), das Firebase Auth für den Anmeldedialog braucht."""
    hashes = []
    for m in re.finditer(r"<script>(.*?)</script>", page, re.S):
        h = base64.b64encode(hashlib.sha256(m.group(1).encode("utf-8")).digest()).decode()
        hashes.append(f"'sha256-{h}'")
    auth = ""
    cfg = (SRC / "firebase-config.js").read_text()
    m = re.search(r'authDomain:\s*"([^"]+)"', cfg)
    if m:
        auth = " https://" + m.group(1)
    policy = "; ".join([
        "default-src 'none'",
        "script-src 'self' " + " ".join(hashes) + " https://apis.google.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src https://fonts.gstatic.com",
        "img-src 'self' data: blob: https://*.googleusercontent.com",
        "media-src 'self' blob:",
        "connect-src 'self' blob: https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com",
        "frame-src https://accounts.google.com https://apis.google.com" + auth,
        "manifest-src 'self'",
        "worker-src 'none'",
        "object-src 'none'",
        "base-uri 'none'",
        "form-action 'none'",
    ])
    return (f'<meta http-equiv="Content-Security-Policy" content="{policy}">\n'
            '<meta name="referrer" content="strict-origin-when-cross-origin">')


def main():
    shell = (SRC / "shell.html").read_text()
    content = "\n".join((SRC / f).read_text() for f in CONTENT)
    page = (
        shell.replace("/*CONTENT*/", content)
        .replace("/*PLAYER*/", (SRC / "clipplayer.js").read_text() + "\n" + (SRC / "player.js").read_text())
        .replace("/*APP*/", (SRC / "app.js").read_text())
    )
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    (OUT / "index.html").write_text(HEAD.replace("</head>", csp_meta(page) + "\n</head>") + page + "\n</body>\n</html>\n")
    (OUT / "manifest.webmanifest").write_text(json.dumps(MANIFEST, ensure_ascii=False, indent=2))
    for s in (180, 192, 512):
        shutil.copy(ROOT / f"icon-{s}.png", OUT)
    shutil.copytree(ROOT / "audio", OUT / "audio")
    # Firebase-SDK selbst gehostet (kein Fremd-CDN, CSP bleibt bei 'self')
    shutil.copytree(ROOT / "vendor", OUT / "vendor")
    # Diagramme teilt sich die Web-Version mit der iOS-App
    shutil.copytree(ROOT.parent / "App" / "Resources" / "diagrams", OUT / "diagrams")
    (OUT / ".nojekyll").write_text("")
    # Variante für claude.ai (Artifact): ohne eigenen <head>, Gerüst kommt beim Veröffentlichen
    (OUT / "artifact.html").write_text('<meta name="theme-color" content="#F4F5FA">\n' + page)
    print(f"index.html: {len(page) // 1024} KB")


if __name__ == "__main__":
    main()
