#!/usr/bin/env python3
"""Vertont die Web-Videos und baut pro Lektion ein Audio-Sprite.

Stimme über TTS_ENGINE wählbar:
  piper       kostenlos, offline (Standard, klingt eher technisch)
  azure       Azure Speech, neuronale Stimmen (AZURE_SPEECH_KEY, AZURE_SPEECH_REGION, AZURE_VOICE)
  openai      gpt-4o-mini-tts mit Sprechanweisung (OPENAI_API_KEY, OPENAI_VOICE)
  elevenlabs  ElevenLabs Multilingual v2 (ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID)

Eingabe:  web/audio_src.json  (aus tools/export_beats.js)
Ausgabe:  web/audio/<lektion>.mp3 und web/audio/index.json  {lessons: {id: {key: [start, ende]}}}
Schlüssel: Tom = fnv(Text), Lisa = fnv("L|" + Text)  (identisch zu web/src/player.js)
Lektionen, deren Sprechtexte sich nicht geändert haben, werden übersprungen.
"""
import hashlib, json, os, pathlib, subprocess, sys, tempfile, time, urllib.request, wave
from xml.sax.saxutils import escape as xesc

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
from make_audio import fnv, speakable  # gleiche Aussprache-Tabelle wie die iOS-Vertonung

SRC = ROOT / "web" / "audio_src.json"
OUT = ROOT / "web" / "audio"
VOICE_T = os.environ.get("VOICE_TOM", "de_DE-thorsten-high")
VOICE_L = os.environ.get("VOICE_LISA", "de_DE-kerstin-low")
GAP = 0.4   # Sekunden Stille zwischen den Beats
SR = 24000


def key(who, say):
    return fnv("L|" + say) if who == "L" else fnv(say)


def synth(voice, cfg, text, wav_path):
    with wave.open(wav_path, "wb") as wf:
        if cfg is not None:
            voice.synthesize_wav(speakable(text), wf, syn_config=cfg)
        else:
            voice.synthesize_wav(speakable(text), wf)


def to_pcm(wav_in, raw_out):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav_in,
                    "-af", "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,loudnorm=I=-16:TP=-1.5",
                    "-ac", "1", "-ar", str(SR), "-f", "s16le", raw_out], check=True)


ENGINE = os.environ.get("TTS_ENGINE", "piper")
INSTR = ("Du bist ein sympathischer, sehr guter Nachhilfelehrer für IT-Azubis. Sprich natürliches Deutsch, warm, "
         "locker und mit Energie, wie in einem guten Erklärvideo. Betone Schlüsselbegriffe, mach kurze Pausen vor wichtigen Punkten. "
         "Englische Fachbegriffe (SELECT, JOIN, Scrum, Backlog) englisch aussprechen.")


def http(url, data, headers, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, data=data, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=120) as r:
                return r.read()
        except Exception as e:
            if i == tries - 1:
                raise
            print("retry", e, flush=True)
            time.sleep(3 * (i + 1))


def cloud_synth(text, out_path):
    """Schreibt die Sprachausgabe als Audiodatei (wav/mp3), ffmpeg normalisiert danach."""
    if ENGINE == "azure":
        voice = os.environ.get("AZURE_VOICE", "de-DE-FlorianMultilingualNeural")
        ssml = (f'<speak version="1.0" xml:lang="de-DE" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts">'
                f'<voice name="{voice}"><mstts:express-as style="friendly"><prosody rate="+4%">{xesc(text)}</prosody></mstts:express-as></voice></speak>')
        region = os.environ["AZURE_SPEECH_REGION"]
        data = http(f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1", ssml.encode(),
                    {"Ocp-Apim-Subscription-Key": os.environ["AZURE_SPEECH_KEY"], "Content-Type": "application/ssml+xml",
                     "X-Microsoft-OutputFormat": "riff-24khz-16bit-mono-pcm", "User-Agent": "ap2-trainer"})
    elif ENGINE == "openai":
        body = {"model": os.environ.get("OPENAI_TTS_MODEL", "gpt-4o-mini-tts"), "voice": os.environ.get("OPENAI_VOICE", "ash"),
                "input": text, "instructions": INSTR, "response_format": "wav"}
        data = http("https://api.openai.com/v1/audio/speech", json.dumps(body).encode(),
                    {"Authorization": "Bearer " + os.environ["OPENAI_API_KEY"], "Content-Type": "application/json"})
    elif ENGINE == "elevenlabs":
        vid = os.environ["ELEVENLABS_VOICE_ID"]
        body = {"text": text, "model_id": "eleven_multilingual_v2", "language_code": "de",
                "voice_settings": {"stability": 0.45, "similarity_boost": 0.8, "style": 0.25}}
        data = http(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format=mp3_44100_128", json.dumps(body).encode(),
                    {"xi-api-key": os.environ["ELEVENLABS_API_KEY"], "Content-Type": "application/json"})
    else:
        raise SystemExit("unbekannte TTS_ENGINE " + ENGINE)
    pathlib.Path(out_path).write_bytes(data)


def voice_id():
    return {"piper": VOICE_T, "azure": os.environ.get("AZURE_VOICE", "de-DE-FlorianMultilingualNeural"),
            "openai": os.environ.get("OPENAI_VOICE", "ash"), "elevenlabs": os.environ.get("ELEVENLABS_VOICE_ID", "")}.get(ENGINE, "")


def main():
    voices = {}
    if ENGINE == "piper":
        voices = load_piper()
    run(voices)


def load_piper():
    from piper import PiperVoice
    try:
        from piper import SynthesisConfig
        cfg_t = SynthesisConfig(length_scale=1.0, noise_scale=0.6, noise_w_scale=0.7)
        cfg_l = SynthesisConfig(length_scale=0.97, noise_scale=0.6, noise_w_scale=0.7)
    except Exception:
        cfg_t = cfg_l = None
    v = {"T": (PiperVoice.load(VOICE_T + ".onnx"), cfg_t)}
    if os.path.exists(VOICE_L + ".onnx"):
        v["L"] = (PiperVoice.load(VOICE_L + ".onnx"), cfg_l)
    return v


def run(voices):
    src = json.loads(SRC.read_text())
    OUT.mkdir(parents=True, exist_ok=True)
    idx_path = OUT / "index.json"
    old = json.loads(idx_path.read_text()) if idx_path.exists() else {}
    old_digest = old.get("digest", {})
    lessons, digest = {}, {}
    only = set(filter(None, os.environ.get("ONLY", "").split(",")))
    for lid, beats in src.items():
        d = hashlib.sha1((ENGINE + voice_id() + json.dumps(beats, ensure_ascii=False)).encode()).hexdigest()[:12]
        digest[lid] = d
        mp3 = OUT / f"{lid}.mp3"
        if old_digest.get(lid) == d and mp3.exists() and lid in old.get("lessons", {}) and not (only and lid in only):
            lessons[lid] = old["lessons"][lid]
            continue
        print(f"vertone {lid} ({len(beats)} Beats)", flush=True)
        tmp = pathlib.Path(tempfile.mkdtemp())
        pcm = bytearray()
        gap = b"\x00\x00" * int(SR * GAP)
        seg = {}
        for i, b in enumerate(beats):
            w, r = str(tmp / f"{i}.wav"), str(tmp / f"{i}.raw")
            if ENGINE == "piper":
                voice, cfg = voices[b["who"]]
                synth(voice, cfg, b["say"], w)
            else:
                cloud_synth(b["say"], w)
            to_pcm(w, r)
            data = pathlib.Path(r).read_bytes()
            start = len(pcm) / 2 / SR
            pcm += data
            seg[key(b["who"], b["say"])] = [round(start, 3), round(len(pcm) / 2 / SR, 3)]
            pcm += gap
        raw_all = tmp / "all.raw"
        raw_all.write_bytes(bytes(pcm))
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", str(raw_all),
                        "-b:a", "64k", str(mp3)], check=True)
        lessons[lid] = seg
    for f in OUT.glob("*.mp3"):
        if f.stem not in src:
            f.unlink()
    idx_path.write_text(json.dumps({"engine": ENGINE, "voice": voice_id(), "digest": digest, "lessons": lessons}, ensure_ascii=False))
    print(f"fertig: {len(lessons)} Lektionen")


if __name__ == "__main__":
    main()
