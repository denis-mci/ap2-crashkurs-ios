#!/usr/bin/env python3
"""Vertont alle Clip-Beats mit Piper (Stimme Thorsten) und legt pro Beat eine MP3 ab.

Dateiname = FNV-1a-32 über den Anzeigetext (identisch zur Web- und iOS-App).
Für die Aussprache englischer Fachbegriffe wird vor der Synthese ein Wörterbuch angewendet,
der Dateiname bleibt aber am Originaltext hängen.
"""
import json, os, re, subprocess, sys, tempfile, wave, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CLIPS = ROOT / "App/Resources/clips.json"
OUT = ROOT / "App/Resources/audio"
MODEL = os.environ.get("PIPER_MODEL", "de_DE-thorsten-high")

def fnv(s: str) -> str:
    h = 0x811C9DC5
    for ch in s:
        h ^= ord(ch)
        h = (h * 0x01000193) & 0xFFFFFFFF
    return f"{h:08x}"

# Aussprache englischer Begriffe für eine deutsche Stimme
PRON = {
    "Bubble Sort": "Babbel Sort", "Selection Sort": "Selekschen Sort", "Insertion Sort": "Insörschen Sort",
    "INNER JOIN": "Inner Dschoin", "LEFT JOIN": "Left Dschoin", "Join": "Dschoin", "Joins": "Dschoins",
    "GROUP BY": "Gruup Bai", "ORDER BY": "Order Bai", "HAVING": "Häwing", "WHERE": "Wär", "SELECT": "Selekt",
    "COUNT": "Kaunt", "UPDATE": "Apdäit", "DELETE": "Dilieht", "INSERT": "Insört", "DISTINCT": "Distinkt",
    "SQL": "S Q L", "NULL": "Null", "LIKE": "Laik", "Prepared Statements": "Pripärd Stäitments",
    "Scrum Master": "Skram Master", "Scrum": "Skram", "Product Owner": "Prodakt Ouner", "Product Backlog": "Prodakt Bäcklog",
    "Sprint Backlog": "Sprint Bäcklog", "Backlog": "Bäcklog", "Developers": "Diwelopers", "Review": "Riwju",
    "Retrospektive": "Retrospektiewe", "Daily": "Däili", "Increment": "Inkrement", "Definition of Done": "Definischen of Dann",
    "User Story": "Juser Stori", "User Stories": "Juser Storis", "Stakeholder": "Stäikholder",
    "Interface": "Interfäis", "public": "pablik", "private": "praiwet", "protected": "protekted", "static": "stätik",
    "Singleton": "Singelten", "Observer": "Obsörwer", "Factory": "Fäktori", "Facade": "Fassaad", "update": "apdäit",
    "Unit-Test": "Juhnit Test", "Unit-Tests": "Juhnit Tests", "Black-Box": "Bläck Box", "White-Box": "Weit Box",
    "Hash": "Häsch", "Salt": "Solt", "Man in the Middle": "Män in se Middel", "Phishing": "Fisching", "Ransomware": "Rensomwer",
    "Cross Site Scripting": "Kross Seit Skripting", "Backup": "Bäckapp", "Backups": "Bäckapps", "Firewall": "Feierwol",
    "Make or Buy": "Mäik or Bai", "Stack Overflow": "Stäck Ouwerflo", "Request": "Rikwest", "Branch": "Bräntsch",
    "Merge": "Mörtsch", "Commit": "Kommitt", "Push": "Pusch", "Token": "Touken", "Use Case": "Jus Keis",
    "Client": "Klaient", "Server": "Sörwer", "Facade": "Fassaad", "Swimlanes": "Swimmläins", "Guard": "Gaard",
    "Dashboard": "Däschbord", "Login": "Login", "Usability": "Jusabiliti", "Make": "Mäik", "Buy": "Bai",
    "Green IT": "Grien I T", "Compliance": "Kompleiens", "Social Engineering": "Sohschel Ändschiniering",
}
PRON_RE = [(re.compile(r"(?<![\wÄÖÜäöüß])" + re.escape(k) + r"(?![\wÄÖÜäöüß])"), v)
           for k, v in sorted(PRON.items(), key=lambda kv: -len(kv[0]))]

def speakable(text: str) -> str:
    for rx, rep in PRON_RE:
        text = rx.sub(rep, text)
    return text

def main():
    from piper import PiperVoice
    try:
        from piper import SynthesisConfig
        cfg = SynthesisConfig(length_scale=1.02, noise_scale=0.6, noise_w_scale=0.7)
    except Exception:
        cfg = None
    model_path = pathlib.Path(MODEL + ".onnx")
    voice = PiperVoice.load(str(model_path))
    clips = json.loads(CLIPS.read_text())
    OUT.mkdir(parents=True, exist_ok=True)
    texts = sorted({b["say"] for scenes in clips.values() for s in scenes for b in s["beats"]})
    made = 0
    for t in texts:
        h = fnv(t)
        mp3 = OUT / f"{h}.mp3"
        if mp3.exists():
            continue
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            wav_path = tmp.name
        with wave.open(wav_path, "wb") as wf:
            if cfg is not None:
                voice.synthesize_wav(speakable(t), wf, syn_config=cfg)
            else:
                voice.synthesize_wav(speakable(t), wf)
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav_path,
                        "-af", "silenceremove=start_periods=1:start_threshold=-50dB,loudnorm=I=-16:TP=-1.5",
                        "-ac", "1", "-ar", "24000", "-b:a", "56k", str(mp3)], check=True)
        os.unlink(wav_path)
        made += 1
        if made % 25 == 0:
            print(f"{made} neu vertont", flush=True)
    keep = {fnv(t) for t in texts}
    for f in OUT.glob("*.mp3"):
        if f.stem not in keep:
            f.unlink()
    (OUT / "index.json").write_text(json.dumps({"voice": MODEL, "files": sorted(keep)}, indent=0))
    print(f"fertig: {len(keep)} Beats, {made} neu")

if __name__ == "__main__":
    main()
