"""Baut die Web-Version nach web/_site (für GitHub Pages).

Aufruf aus dem Repo-Root: python3 web/build.py
"""
import json
import pathlib
import shutil

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
OUT = ROOT / "_site"

CONTENT = [
    "c_ga2.js", "c_ga1.js", "c_wiso.js", "clips_ga2.js", "clips_ga1.js", "clips_wiso.js",
    "n_a.js", "n_b.js", "n_c.js", "n_d.js", "nclips_a.js", "nclips_b.js", "nclips_c.js", "nclips_d.js",
    "wiso_bank.js", "cases_ga1.js", "cases_ga2.js", "cases_ga1b.js", "cases_ga2b.js", "belegsatz.js",
]

HEAD = """<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="AP2 Crashkurs">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="#EEF0F5">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" href="icon-192.png">
<link rel="manifest" href="manifest.webmanifest">
</head>
<body>
"""

MANIFEST = {
    "name": "AP2 Crashkurs",
    "short_name": "AP2",
    "lang": "de",
    "start_url": "./",
    "scope": "./",
    "display": "standalone",
    "background_color": "#EEF0F5",
    "theme_color": "#EEF0F5",
    "icons": [
        {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
    ],
}


def main():
    shell = (SRC / "shell.html").read_text()
    content = "\n".join((SRC / f).read_text() for f in CONTENT)
    page = (
        shell.replace("/*CONTENT*/", content)
        .replace("/*PLAYER*/", (SRC / "clipplayer.js").read_text())
        .replace("/*APP*/", (SRC / "app.js").read_text())
    )
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    (OUT / "index.html").write_text(HEAD + page + "\n</body>\n</html>\n")
    (OUT / "manifest.webmanifest").write_text(json.dumps(MANIFEST, ensure_ascii=False, indent=2))
    for s in (180, 192, 512):
        shutil.copy(ROOT / f"icon-{s}.png", OUT)
    shutil.copytree(ROOT / "audio", OUT / "audio")
    # Diagramme teilt sich die Web-Version mit der iOS-App
    shutil.copytree(ROOT.parent / "App" / "Resources" / "diagrams", OUT / "diagrams")
    (OUT / ".nojekyll").write_text("")
    print(f"index.html: {len(page) // 1024} KB")


if __name__ == "__main__":
    main()
