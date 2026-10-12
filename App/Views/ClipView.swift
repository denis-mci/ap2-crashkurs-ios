import SwiftUI
import AVFoundation

final class Speaker: NSObject, AVSpeechSynthesizerDelegate {
    private let synth = AVSpeechSynthesizer()
    private var current: AVSpeechUtterance?
    var onFinish: (() -> Void)?

    static let voice: AVSpeechSynthesisVoice? = {
        let de = AVSpeechSynthesisVoice.speechVoices().filter { $0.language == "de-DE" }
        return de.max { $0.quality.rawValue < $1.quality.rawValue } ?? AVSpeechSynthesisVoice(language: "de-DE")
    }()

    override init() {
        super.init()
        synth.delegate = self
    }

    func speak(_ text: String, rate: Double) {
        if synth.isSpeaking { synth.stopSpeaking(at: .immediate) }
        let u = AVSpeechUtterance(string: text)
        u.voice = Speaker.voice
        u.rate = min(AVSpeechUtteranceMaximumSpeechRate, AVSpeechUtteranceDefaultSpeechRate * Float(rate))
        current = u
        try? AVAudioSession.sharedInstance().setActive(true)
        synth.speak(u)
    }

    func stop() {
        onFinish = nil
        current = nil
        if synth.isSpeaking { synth.stopSpeaking(at: .immediate) }
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        releaseSession()
        guard utterance === current else { return }
        DispatchQueue.main.async { self.onFinish?() }
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didCancel utterance: AVSpeechUtterance) {
        releaseSession()
    }

    private func releaseSession() {
        DispatchQueue.main.async { [weak self] in
            guard let self, !self.synth.isSpeaking else { return }
            try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
        }
    }
}

struct ClipStep: View {
    @Environment(AppStore.self) private var store
    let lesson: Lesson
    let onQuiz: () -> Void

    @State private var idx = 0
    @State private var playing = false
    @State private var finished = false
    @State private var progress: Double = 0
    @State private var gen = 0
    @State private var sceneStart = Date()
    @State private var sceneDur: Double = 5
    @State private var speaker: Speaker? = nil
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var haptic = 0
    private let tick = Timer.publish(every: 0.1, on: .main, in: .common).autoconnect()

    private var scene: ClipScene { lesson.clip[idx] }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Label {
                Text(lesson.why)
            } icon: {
                Image(systemName: "exclamationmark.bubble.fill").foregroundStyle(Color.orange)
            }
            .font(.subheadline)
            .padding(12)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))

            player

            if finished {
                VStack(alignment: .leading, spacing: 10) {
                    Text("Clip durch. Jetzt das Quiz dazu.").font(.headline)
                    Button(action: onQuiz) {
                        Label("Quiz starten", systemImage: "checklist").frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.borderedProminent).controlSize(.large)
                }
                .padding()
                .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 14))
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }

            if !lesson.videos.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Mehr dazu auf YouTube").font(.headline)
                    Text("Optional. Das Quiz fragt den Clip oben ab.").font(.caption).foregroundStyle(.secondary)
                    ForEach(lesson.videos, id: \.id) { v in
                        Link(destination: v.url) {
                            HStack(spacing: 12) {
                                Image(systemName: "play.rectangle.fill").font(.title2).foregroundStyle(.red)
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(v.t).font(.subheadline.weight(.semibold)).foregroundStyle(.primary).multilineTextAlignment(.leading)
                                    Text(v.c).font(.caption).foregroundStyle(.secondary)
                                }
                                Spacer()
                                Image(systemName: "arrow.up.right").font(.caption).foregroundStyle(.secondary)
                            }
                            .padding(12)
                            .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))
                        }
                    }
                }
            }
        }
        .onReceive(tick) { _ in
            if playing { progress = min(1, Date().timeIntervalSince(sceneStart) / sceneDur) }
        }
        .onAppear { if speaker == nil { speaker = Speaker() } }
        .onDisappear { halt() }
        .sensoryFeedback(.selection, trigger: haptic)
    }

    private var player: some View {
        VStack(spacing: 0) {
            HStack(spacing: 4) {
                ForEach(0..<lesson.clip.count, id: \.self) { i in
                    GeometryReader { g in
                        ZStack(alignment: .leading) {
                            Capsule().fill(Color.secondary.opacity(0.25))
                            Capsule().fill(Color.primary)
                                .frame(width: g.size.width * segValue(i))
                        }
                    }
                    .frame(height: 4)
                }
            }
            .padding([.horizontal, .top], 12)
            .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 12) {
                Text("SZENE \(idx + 1) VON \(lesson.clip.count)")
                    .font(.caption2.weight(.bold)).tracking(1).foregroundStyle(.secondary)
                Text(scene.h).font(.title2.weight(.heavy))
                VisualView(v: scene.v)
                    .id(idx)
                    .transition(reduceMotion ? .opacity : .asymmetric(insertion: .move(edge: .trailing).combined(with: .opacity), removal: .opacity))
            }
            .padding(16)
            .frame(maxWidth: .infinity, minHeight: 260, alignment: .topLeading)
            .contentShape(Rectangle())
            .simultaneousGesture(DragGesture(minimumDistance: 30).onEnded { v in
                guard abs(v.translation.width) > abs(v.translation.height) * 1.5 else { return }
                if v.translation.width < -40 { jump(1) } else if v.translation.width > 40 { jump(-1) }
            })
            .accessibilityElement(children: .combine)
            .accessibilityValue("Szene \(idx + 1) von \(lesson.clip.count)")
            .accessibilityAdjustableAction { d in if d == .increment { jump(1) } else { jump(-1) } }

            Text(scene.say)
                .font(.callout)
                .foregroundStyle(.white)
                .padding(14)
                .frame(maxWidth: .infinity, minHeight: 96, alignment: .topLeading)
                .background(Color.ink)

            HStack {
                Button {
                    store.state.sound.toggle(); store.save()
                    if playing { run() }
                } label: {
                    Image(systemName: store.state.sound ? "speaker.wave.2.fill" : "speaker.slash.fill")
                        .frame(width: 44, height: 44)
                }
                .accessibilityLabel(store.state.sound ? "Ton aus" : "Ton an")
                Spacer()
                Button { jump(-1) } label: { Image(systemName: "backward.fill").frame(width: 44, height: 44) }
                    .accessibilityLabel("Vorherige Szene")
                Button(action: toggle) {
                    Image(systemName: playing ? "pause.fill" : "play.fill")
                        .font(.title2)
                        .foregroundStyle(.white)
                        .frame(width: 60, height: 60)
                        .background(Circle().fill(Color.cobalt))
                }
                .accessibilityLabel(playing ? "Pause" : "Abspielen")
                Button { jump(1) } label: { Image(systemName: "forward.fill").frame(width: 44, height: 44) }
                    .accessibilityLabel("Nächste Szene")
                Spacer()
                Button {
                    let rates: [Double] = [1, 1.25, 1.5]
                    let i = rates.firstIndex(of: store.state.rate) ?? 0
                    store.state.rate = rates[(i + 1) % rates.count]; store.save()
                    if playing { run() }
                } label: {
                    Text(rateLabel).font(.subheadline.weight(.bold)).monospacedDigit().frame(width: 44, height: 44)
                }
                .accessibilityLabel("Tempo ändern")
            }
            .padding(.horizontal, 12).padding(.vertical, 6)
        }
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .animation(.easeOut(duration: 0.25), value: idx)
    }

    private var rateLabel: String {
        let r = store.state.rate
        return r == 1 ? "1×" : (r == 1.25 ? "1,25×" : "1,5×")
    }

    private func segValue(_ i: Int) -> Double {
        if finished || i < idx { return 1 }
        if i == idx { return progress }
        return 0
    }

    private func estimate(_ s: String) -> Double {
        max(3.5, Double(s.count) * 0.062 / store.state.rate)
    }

    private func run() {
        gen += 1
        let my = gen
        sceneStart = Date()
        sceneDur = estimate(scene.say)
        progress = 0
        speaker?.stop()
        if store.state.sound, let speaker {
            speaker.onFinish = {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    if my == gen && playing { advance() }
                }
            }
            speaker.speak(scene.say, rate: store.state.rate)
            DispatchQueue.main.asyncAfter(deadline: .now() + sceneDur * 1.8 + 2.5) {
                if my == gen && playing { advance() }
            }
        } else {
            DispatchQueue.main.asyncAfter(deadline: .now() + sceneDur) {
                if my == gen && playing { advance() }
            }
        }
    }

    private func advance() {
        if idx < lesson.clip.count - 1 {
            idx += 1
            haptic += 1
            if playing { run() } else { progress = 0 }
        } else {
            finish()
        }
    }

    private func finish() {
        halt()
        progress = 1
        withAnimation { finished = true }
        if !store.progress(lesson.id).clip {
            store.update(lesson.id) { $0.clip = true }
            store.gain(20)
        }
    }

    private func halt() {
        playing = false
        gen += 1
        speaker?.stop()
    }

    private func toggle() {
        if playing {
            halt()
        } else {
            if finished { idx = 0; finished = false }
            playing = true
            run()
        }
    }

    private func jump(_ d: Int) {
        let n = idx + d
        guard n >= 0 else { return }
        if n >= lesson.clip.count { finish(); return }
        idx = n
        haptic += 1
        if playing { run() } else { gen += 1; speaker?.stop(); progress = 0 }
    }
}

struct VisualView: View {
    let v: Visual

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            if let code = v.code {
                ScrollView(.horizontal, showsIndicators: false) {
                    Text(code)
                        .font(.system(.caption, design: .monospaced))
                        .fixedSize(horizontal: true, vertical: false)
                        .padding(12)
                }
                .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 10))
            }
            if let list = v.list {
                ForEach(Array(list.enumerated()), id: \.offset) { _, item in
                    HStack(alignment: .top, spacing: 10) {
                        RoundedRectangle(cornerRadius: 2).fill(Color.marker).frame(width: 4)
                        Text(item).font(.subheadline)
                        Spacer(minLength: 0)
                    }
                    .padding(10)
                    .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 10))
                }
            }
            if let s = v.stat {
                Text(s)
                    .font(.system(.largeTitle, design: .rounded, weight: .black))
                    .background(alignment: .bottom) { Color.marker.opacity(0.85).frame(height: 14).offset(y: -4) }
                if let sub = v.sub { Text(sub).foregroundStyle(.secondary) }
            }
            if let t = v.table { TableBlock(rows: t) }
            if let t = v.table2 { TableBlock(rows: t) }
        }
    }
}

struct TableBlock: View {
    let rows: [[String]]
    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            Grid(alignment: .leading, horizontalSpacing: 14, verticalSpacing: 8) {
                if let head = rows.first {
                    GridRow {
                        ForEach(Array(head.enumerated()), id: \.offset) { _, c in
                            Text(c).font(.footnote.weight(.bold))
                                .frame(minWidth: 50, maxWidth: 210, alignment: .leading)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                    Divider()
                }
                ForEach(Array(rows.dropFirst().enumerated()), id: \.offset) { _, r in
                    GridRow {
                        ForEach(Array(r.enumerated()), id: \.offset) { _, c in
                            Text(c).font(.footnote)
                                .frame(minWidth: 50, maxWidth: 210, alignment: .leading)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                }
            }
            .padding(12)
        }
        .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 10))
    }
}
