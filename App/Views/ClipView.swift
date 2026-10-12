import SwiftUI
import AVFoundation

// MARK: - Ton: vorab vertonte MP3 (Piper Thorsten), sonst Systemstimme

final class Narrator: NSObject, AVSpeechSynthesizerDelegate, AVAudioPlayerDelegate {
    private let synth = AVSpeechSynthesizer()
    private var player: AVAudioPlayer?
    private var currentUtterance: AVSpeechUtterance?
    private var token = 0
    var onFinish: (() -> Void)?

    static let voice: AVSpeechSynthesisVoice? = {
        let de = AVSpeechSynthesisVoice.speechVoices().filter { $0.language == "de-DE" }
        return de.max { $0.quality.rawValue < $1.quality.rawValue } ?? AVSpeechSynthesisVoice(language: "de-DE")
    }()

    static var hasRecordedAudio: Bool { Bundle.main.url(forResource: "index", withExtension: "json") != nil }

    override init() {
        super.init()
        synth.delegate = self
    }

    func say(_ text: String, rate: Double) {
        stop(keepHandler: true)
        token += 1
        try? AVAudioSession.sharedInstance().setActive(true)
        if let url = Bundle.main.url(forResource: fnv(text), withExtension: "mp3"),
           let p = try? AVAudioPlayer(contentsOf: url) {
            p.enableRate = true
            p.rate = Float(rate)
            p.delegate = self
            player = p
            p.play()
            return
        }
        let u = AVSpeechUtterance(string: text)
        u.voice = Narrator.voice
        u.rate = min(AVSpeechUtteranceMaximumSpeechRate, AVSpeechUtteranceDefaultSpeechRate * Float(rate))
        currentUtterance = u
        synth.speak(u)
    }

    func stop(keepHandler: Bool = false) {
        if !keepHandler { onFinish = nil }
        token += 1
        player?.stop(); player = nil
        currentUtterance = nil
        if synth.isSpeaking { synth.stopSpeaking(at: .immediate) }
    }

    private func finished() {
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            if !self.synth.isSpeaking && self.player == nil {
                try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
            }
            self.onFinish?()
        }
    }

    func audioPlayerDidFinishPlaying(_ p: AVAudioPlayer, successfully flag: Bool) {
        guard p === player else { return }
        player = nil
        finished()
    }

    func speechSynthesizer(_ s: AVSpeechSynthesizer, didFinish u: AVSpeechUtterance) {
        guard u === currentUtterance else { return }
        currentUtterance = nil
        finished()
    }
}

// MARK: - Clip-Schritt

struct ClipStep: View {
    @Environment(AppStore.self) private var store
    let lesson: Lesson
    let onQuiz: () -> Void

    @State private var finished = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Label { Text(lesson.why) } icon: {
                Image(systemName: "exclamationmark.bubble.fill").foregroundStyle(.orange)
            }
            .font(.subheadline)
            .padding(12)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))

            if let scenes = Clips.all[lesson.id], scenes.contains(where: { !$0.beats.isEmpty }) {
                ClipPlayerView(scenes: scenes) {
                    withAnimation { finished = true }
                    if !store.progress(lesson.id).clip {
                        store.update(lesson.id) { $0.clip = true }
                        store.gain(20)
                    }
                } onCheck: { ok in
                    if ok { store.gain(5) }
                }
            }

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
    }
}

// MARK: - Player

private let stageBG = Color(red: 0.055, green: 0.075, blue: 0.133)
private let stageFG = Color(red: 0.93, green: 0.945, blue: 0.97)
private let mk = Color(red: 1.0, green: 0.88, blue: 0.30)
private let okGreen = Color(red: 0.18, green: 0.72, blue: 0.47)
private let swapRed = Color(red: 1.0, green: 0.48, blue: 0.36)
private let barBlue = Color(red: 0.24, green: 0.34, blue: 0.84)
private let groupColors: [Color] = [mk.opacity(0.22), Color(red: 0.49, green: 0.58, blue: 1).opacity(0.25), okGreen.opacity(0.25), swapRed.opacity(0.25)]

struct FlatBeat { let scene: Int; let beat: Int; let last: Bool }

struct ClipPlayerView: View {
    @Environment(AppStore.self) private var store
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    let scenes: [Scene2]
    let onFinish: () -> Void
    let onCheck: (Bool) -> Void

    @State private var pos = 0
    @State private var playing = false
    @State private var ended = false
    @State private var gen = 0
    @State private var checkOpen = false
    @State private var answered: Set<Int> = []
    @State private var picked: Int? = nil
    @State private var narrator: Narrator? = nil
    @State private var haptic = 0

    private var flat: [FlatBeat] {
        var out: [FlatBeat] = []
        for (si, s) in scenes.enumerated() {
            for b in s.beats.indices {
                out.append(FlatBeat(scene: si, beat: b, last: b == s.beats.count - 1))
            }
        }
        return out
    }
    private var cur: FlatBeat { flat[min(pos, flat.count - 1)] }
    private var scene: Scene2 { scenes[cur.scene] }
    private var beat: Beat { scene.beats[cur.beat] }

    var body: some View {
        VStack(spacing: 10) {
            stage
            controls
            Text(Narrator.hasRecordedAudio ? "Stimme: Thorsten (Piper, vorab vertont)" : "Natürliche Stimme folgt mit dem nächsten Update. Bis dahin liest dein iPhone vor.")
                .font(.caption).foregroundStyle(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .onAppear { if narrator == nil { narrator = Narrator() } }
        .onDisappear { halt() }
        .sensoryFeedback(.selection, trigger: haptic)
    }

    // Bühne
    private var stage: some View {
        VStack(alignment: .leading, spacing: 0) {
            progressBar

            HStack(alignment: .firstTextBaseline) {
                Text(scene.h).font(.headline.weight(.heavy))
                Spacer()
                Text("\(cur.scene + 1) / \(scenes.count)").font(.caption.weight(.bold)).monospacedDigit().opacity(0.6)
            }
            .padding(.horizontal, 14).padding(.top, 10)

            StageVisual(v: scene.v, show: beat.show ?? Show())
                .id(cur.scene)
                .transition(sceneTransition)
                .padding(.horizontal, 14).padding(.vertical, 12)
                .frame(maxWidth: .infinity, minHeight: 250, alignment: .center)
                .contentShape(Rectangle())
                .onTapGesture { toggle() }

            Text(beat.say)
                .font(.body.weight(.semibold))
                .id(pos)
                .transition(.opacity.combined(with: .move(edge: .bottom)))
                .padding(14)
                .frame(maxWidth: .infinity, minHeight: 90, alignment: .topLeading)
                .background(.white.opacity(0.08), in: RoundedRectangle(cornerRadius: 12))
                .padding([.horizontal, .bottom], 12)
        }
        .foregroundStyle(stageFG)
        .background(stageBG)
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .overlay {
            if checkOpen, let ch = scene.check { checkOverlay(ch) }
            else if !playing {
                Button(action: toggle) {
                    Image(systemName: ended ? "arrow.counterclockwise" : "play.fill")
                        .font(.system(size: 30, weight: .bold))
                        .foregroundStyle(Color(red: 0.1, green: 0.08, blue: 0))
                        .frame(width: 76, height: 76)
                        .background(Circle().fill(mk))
                        .shadow(color: .black.opacity(0.4), radius: 12, y: 6)
                }
                .accessibilityLabel(ended ? "Nochmal abspielen" : "Abspielen")
            }
        }
        .simultaneousGesture(DragGesture(minimumDistance: 30).onEnded { v in
            guard abs(v.translation.width) > abs(v.translation.height) * 1.5 else { return }
            jumpScene(v.translation.width < 0 ? 1 : -1)
        })
        .animation(.easeOut(duration: 0.3), value: pos)
        .animation(.easeOut(duration: 0.25), value: checkOpen)
        .accessibilityElement(children: .contain)
        .accessibilityAdjustableAction { d in if d == .increment { jumpBeat(1) } else { jumpBeat(-1) } }
    }

    private var sceneTransition: AnyTransition {
        if reduceMotion { return AnyTransition.opacity }
        let insertion = AnyTransition.move(edge: .trailing).combined(with: AnyTransition.opacity)
        return AnyTransition.asymmetric(insertion: insertion, removal: AnyTransition.opacity)
    }

    private func feedbackText(_ p: Int, _ ch: Check) -> Text {
        let ok = p == ch.a
        let head: String = ok ? "Genau. " : "Nicht ganz. "
        let color: Color = ok ? okGreen : swapRed
        return Text(head).bold().foregroundColor(color) + Text(ch.e)
    }

    private var rateLabel: String {
        if store.state.rate == 1 { return "1×" }
        return store.state.rate == 1.25 ? "1,25×" : "1,5×"
    }

    private var progressBar: some View {
        HStack(spacing: 4) {
            ForEach(scenes.indices, id: \.self) { i in
                GeometryReader { g in
                    ZStack(alignment: .leading) {
                        Capsule().fill(Color.white.opacity(0.18))
                        Capsule().fill(mk).frame(width: g.size.width * CGFloat(segValue(i)))
                    }
                }
                .frame(height: 4)
            }
        }
        .padding([.horizontal, .top], 12)
        .animation(.easeOut(duration: 0.4), value: pos)
        .accessibilityHidden(true)
    }

    private func checkOverlay(_ ch: Check) -> some View {
        ZStack {
            stageBG.opacity(0.96)
            VStack(alignment: .leading, spacing: 12) {
                Text("KURZ MITDENKEN").font(.caption.weight(.heavy)).tracking(1).foregroundStyle(mk)
                Text(ch.q).font(.title3.weight(.heavy))
                ForEach(ch.o.indices, id: \.self) { i in
                    Button {
                        guard picked == nil else { return }
                        picked = i
                        onCheck(i == ch.a)
                        haptic += 1
                    } label: {
                        HStack {
                            Text(ch.o[i]).font(.body.weight(.semibold)).multilineTextAlignment(.leading)
                            Spacer()
                            if picked != nil && i == ch.a { Image(systemName: "checkmark.circle.fill").foregroundStyle(okGreen) }
                            else if picked == i { Image(systemName: "xmark.circle.fill").foregroundStyle(swapRed) }
                        }
                        .padding(13)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(optionBG(i, ch), in: RoundedRectangle(cornerRadius: 12))
                        .overlay(RoundedRectangle(cornerRadius: 12).stroke(optionStroke(i, ch), lineWidth: 2))
                    }
                    .buttonStyle(PressStyle())
                    .disabled(picked != nil)
                }
                if let p = picked {
                    feedbackText(p, ch)
                        .font(.subheadline)
                    Button {
                        answered.insert(cur.scene); picked = nil; checkOpen = false
                        playing = true
                        advance()
                    } label: {
                        Text("Weiter").font(.headline).foregroundStyle(Color(red: 0.1, green: 0.08, blue: 0))
                            .frame(maxWidth: .infinity).padding(13)
                            .background(mk, in: RoundedRectangle(cornerRadius: 12))
                    }
                }
            }
            .padding(18)
        }
        .foregroundStyle(stageFG)
        .transition(.opacity)
    }

    private func optionBG(_ i: Int, _ ch: Check) -> Color {
        guard picked != nil else { return .white.opacity(0.08) }
        if i == ch.a { return okGreen.opacity(0.22) }
        if i == picked { return swapRed.opacity(0.22) }
        return .white.opacity(0.05)
    }
    private func optionStroke(_ i: Int, _ ch: Check) -> Color {
        guard picked != nil else { return .white.opacity(0.15) }
        if i == ch.a { return okGreen }
        if i == picked { return swapRed }
        return .white.opacity(0.1)
    }

    private var controls: some View {
        HStack {
            Button {
                store.state.sound.toggle(); store.save()
                if playing { playBeat() }
            } label: {
                Image(systemName: store.state.sound ? "speaker.wave.2.fill" : "speaker.slash.fill").frame(width: 44, height: 44)
            }
            .accessibilityLabel(store.state.sound ? "Ton aus" : "Ton an")
            Spacer()
            Button { jumpBeat(-1) } label: { Image(systemName: "backward.fill").frame(width: 44, height: 44) }
                .accessibilityLabel("Zurück")
            Button(action: toggle) {
                Image(systemName: playing ? "pause.fill" : "play.fill")
                    .font(.title2).foregroundStyle(.white)
                    .frame(width: 58, height: 58)
                    .background(Circle().fill(Color.cobalt))
            }
            .accessibilityLabel(playing ? "Pause" : "Abspielen")
            Button { jumpBeat(1) } label: { Image(systemName: "forward.fill").frame(width: 44, height: 44) }
                .accessibilityLabel("Weiter")
            Spacer()
            Button {
                let rates: [Double] = [1, 1.25, 1.5]
                let i = rates.firstIndex(of: store.state.rate) ?? 0
                store.state.rate = rates[(i + 1) % rates.count]; store.save()
                if playing { playBeat() }
            } label: {
                Text(rateLabel)
                    .font(.subheadline.weight(.bold)).monospacedDigit().frame(width: 52, height: 44)
            }
            .accessibilityLabel("Tempo ändern")
        }
        .padding(.horizontal, 4)
    }

    private func segValue(_ i: Int) -> Double {
        if i < cur.scene { return 1 }
        if i > cur.scene { return 0 }
        let n = Double(max(1, scenes[i].beats.count))
        return min(1, (Double(cur.beat) + (ended ? 1 : 0)) / n)
    }

    // Ablauf
    private func estimate(_ t: String) -> Double { max(2.2, Double(t.count) * 0.068 / store.state.rate) }

    private func playBeat() {
        gen += 1
        let my = gen
        let text = beat.say
        let est = estimate(text)
        narrator?.stop()
        let next = {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) { if my == gen && playing { afterBeat() } }
        }
        if store.state.sound, let narrator {
            narrator.onFinish = { if my == gen { next() } }
            narrator.say(text, rate: store.state.rate)
            DispatchQueue.main.asyncAfter(deadline: .now() + est * 2.2 + 3) { if my == gen && playing { afterBeat() } }
        } else {
            DispatchQueue.main.asyncAfter(deadline: .now() + est) { if my == gen && playing { afterBeat() } }
        }
    }

    private func afterBeat() {
        gen += 1
        if cur.last, scene.check != nil, !answered.contains(cur.scene) {
            narrator?.stop()
            checkOpen = true
            return
        }
        advance()
    }

    private func advance() {
        if pos < flat.count - 1 {
            let oldScene = cur.scene
            pos += 1
            if cur.scene != oldScene { haptic += 1 }
            if playing { playBeat() }
        } else {
            finish()
        }
    }

    private func finish() {
        halt()
        ended = true
        onFinish()
    }

    private func halt() {
        playing = false
        gen += 1
        narrator?.stop()
    }

    private func toggle() {
        guard !checkOpen else { return }
        if playing { halt() }
        else {
            if ended { pos = 0; ended = false; answered = [] }
            playing = true
            playBeat()
        }
    }

    private func jumpBeat(_ d: Int) {
        guard !checkOpen else { return }
        let n = pos + d
        guard n >= 0 else { return }
        if n >= flat.count { finish(); return }
        pos = n; ended = false
        if playing { playBeat() } else { gen += 1; narrator?.stop() }
    }

    private func jumpScene(_ d: Int) {
        guard !checkOpen else { return }
        let target = cur.scene + d
        guard target >= 0, target < scenes.count, let i = flat.firstIndex(where: { $0.scene == target }) else { return }
        pos = i; ended = false; haptic += 1
        if playing { playBeat() } else { gen += 1; narrator?.stop() }
    }
}

// MARK: - Visuals

struct StageVisual: View {
    let v: Visual2
    let show: Show

    private var step: Step { show.step ?? Step.n(0) }
    private var isStatic: Bool {
        (v.code != nil && v.anim == nil) || v.list != nil || v.table != nil || v.stat != nil
    }

    var body: some View {
        Group {
            if isStatic { staticVisual } else { animVisual }
        }
        .animation(.easeOut(duration: 0.35), value: show)
    }

    @ViewBuilder private var staticVisual: some View {
        if let code = v.code, v.anim == nil { CodeBlock(code: code, range: show.lines) }
        else if let list = v.list { ListBlock(items: list, upTo: show.item) }
        else if let t = v.table { StageTable(rows: t, upTo: show.rows, hl: show.hl) }
        else if let s = v.stat { StatBlock(stat: s, sub: v.sub) }
    }

    @ViewBuilder private var animVisual: some View {
        if v.anim == "bubble", let arr = v.arr { BubbleAnim(arr: arr, step: step) }
        else if v.anim == "binsearch", let arr = v.arr, let t = v.target { BinAnim(arr: arr, target: t, step: step) }
        else if v.anim == "join", let l = v.left, let r = v.right, let on = v.on, on.count >= 2 { JoinAnim(left: l, right: r, on: on, isLeft: v.type == "left", step: step.index(3)) }
        else if v.anim == "trace", let code = v.code, let vars = v.vars, let rows = v.rows { TraceAnim(code: code, vars: vars, rows: rows, upTo: show.rows ?? 0) }
        else if v.anim == "stack", let calls = v.calls, let rets = v.returns { StackAnim(calls: calls, returns: rets, step: step) }
        else if v.anim == "group", let cols = v.cols, let rows = v.rows, let fn = v.fn, cols.count >= 2 { GroupAnim(cols: cols, rows: rows, fn: fn, step: step.index(3)) }
    }
}

struct CodeBlock: View {
    let code: String
    let range: [Int]?
    var body: some View {
        let lines = code.components(separatedBy: "\n")
        let r = range ?? [1, lines.count]
        let full = r.first == 1 && r.last == lines.count
        ScrollView(.horizontal, showsIndicators: false) {
            VStack(alignment: .leading, spacing: 2) {
                ForEach(lines.indices, id: \.self) { i in
                    let n = i + 1
                    let visible = n <= (r.last ?? lines.count)
                    let hl = visible && !full && n >= (r.first ?? 1)
                    HStack(spacing: 10) {
                        Text("\(n)").foregroundStyle(.white.opacity(0.3)).frame(minWidth: 18, alignment: .trailing)
                        Text(lines[i].isEmpty ? " " : lines[i])
                    }
                    .font(.system(.caption, design: .monospaced))
                    .padding(.vertical, 1).padding(.horizontal, 10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(hl ? mk.opacity(0.16) : Color.clear)
                    .overlay(alignment: .leading) { if hl { Rectangle().fill(mk).frame(width: 3) } }
                    .opacity(!visible ? 0 : (hl || full ? 1 : 0.55))
                    .offset(x: visible ? 0 : -8)
                }
            }
            .padding(.vertical, 8)
            .fixedSize(horizontal: true, vertical: false)
        }
        .background(.white.opacity(0.05), in: RoundedRectangle(cornerRadius: 10))
    }
}

struct ListBlock: View {
    let items: [String]
    let upTo: Int?
    var body: some View {
        let n = upTo ?? items.count
        VStack(alignment: .leading, spacing: 8) {
            ForEach(items.indices, id: \.self) { i in
                let k = i + 1
                let hl = upTo != nil && k == n
                HStack(alignment: .top, spacing: 12) {
                    Text("\(k)").font(.caption.weight(.heavy))
                        .frame(width: 24, height: 24)
                        .background(Circle().fill(hl ? mk : Color.white.opacity(0.12)))
                        .foregroundStyle(hl ? Color.black : stageFG)
                    Text(items[i]).font(.subheadline.weight(.semibold))
                    Spacer(minLength: 0)
                }
                .padding(10)
                .background(hl ? mk.opacity(0.16) : Color.white.opacity(0.06), in: RoundedRectangle(cornerRadius: 12))
                .opacity(k > n ? 0 : (hl || upTo == nil ? 1 : 0.6))
                .offset(y: k > n ? 8 : 0)
            }
        }
    }
}

struct StageTable: View {
    let rows: [[String]]
    var upTo: Int? = nil
    var hl: [Int]? = nil
    var rowTint: ((Int) -> Color?)? = nil
    var small = false
    var body: some View {
        let n = upTo ?? (rows.count - 1)
        ScrollView(.horizontal, showsIndicators: false) {
            Grid(alignment: .leading, horizontalSpacing: 12, verticalSpacing: 6) {
                if let head = rows.first {
                    GridRow {
                        ForEach(head.indices, id: \.self) { c in
                            Text(head[c]).font((small ? Font.caption2 : Font.caption).weight(.bold)).opacity(0.7)
                        }
                    }
                    Divider().overlay(.white.opacity(0.15))
                }
                ForEach(Array(rows.dropFirst().enumerated()), id: \.offset) { ri, r in
                    let k = ri + 1
                    GridRow {
                        ForEach(r.indices, id: \.self) { c in
                            let cell = isHL(row: k, col: c + 1)
                            Text(r[c]).font(small ? .caption2 : .caption)
                                .padding(.horizontal, cell ? 4 : 0)
                                .background(cell ? mk : Color.clear, in: RoundedRectangle(cornerRadius: 4))
                                .foregroundStyle(cell ? Color.black : stageFG)
                                .frame(minWidth: 30, maxWidth: 170, alignment: .leading)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                    .padding(.vertical, 2)
                    .background(rowBG(ri: ri, k: k, n: n))
                    .opacity(rowOpacity(k: k, n: n))
                }
            }
            .padding(10)
        }
        .background(.white.opacity(0.05), in: RoundedRectangle(cornerRadius: 10))
    }

    private func isHL(row: Int, col: Int) -> Bool {
        guard let hl, hl.count >= 2 else { return false }
        return hl[0] == row && hl[1] == col
    }
    private func rowBG(ri: Int, k: Int, n: Int) -> Color {
        if let t = rowTint?(ri) { return t }
        return (upTo != nil && k == n) ? mk.opacity(0.16) : Color.clear
    }
    private func rowOpacity(k: Int, n: Int) -> Double {
        if k > n { return 0 }
        return (upTo != nil && k != n) ? 0.6 : 1
    }
}

struct StatBlock: View {
    let stat: String
    let sub: String?
    @State private var appear = false
    var body: some View {
        VStack(spacing: 12) {
            Text(stat)
                .font(.system(.largeTitle, design: .rounded, weight: .black))
                .foregroundStyle(mk)
                .scaleEffect(appear ? 1 : 0.6).opacity(appear ? 1 : 0)
            if let sub { Text(sub).font(.subheadline).multilineTextAlignment(.center).opacity(0.75) }
        }
        .frame(maxWidth: .infinity)
        .onAppear { withAnimation(.spring(response: 0.5, dampingFraction: 0.6)) { appear = true } }
    }
}

struct BubbleAnim: View {
    let arr: [Int]
    let step: Step
    var body: some View {
        let steps = bubbleSteps(arr)
        let s = steps[step.index(steps.count)]
        let maxV = Double(arr.max() ?? 1)
        VStack(spacing: 10) {
            GeometryReader { g in
                let w = g.size.width / CGFloat(arr.count)
                ZStack(alignment: .bottomLeading) {
                    ForEach(arr.indices, id: \.self) { id in
                        let p = s.order.firstIndex(of: id) ?? 0
                        let isCmp = s.cmp?.contains(id) ?? false
                        let color: Color = s.sorted.contains(id) ? okGreen : (isCmp ? (s.swapped ? swapRed : mk) : barBlue)
                        VStack {
                            Text("\(arr[id])").font(.title3.weight(.heavy))
                                .foregroundStyle(color == barBlue ? stageFG : Color.black)
                                .padding(.top, 6)
                            Spacer(minLength: 0)
                        }
                        .frame(width: w - 12, height: g.size.height * (0.2 + 0.75 * Double(arr[id]) / maxV))
                        .background(color, in: UnevenRoundedRectangle(topLeadingRadius: 10, bottomLeadingRadius: 4, bottomTrailingRadius: 4, topTrailingRadius: 10))
                        .offset(x: CGFloat(p) * w + 6)
                        .animation(.spring(response: 0.5, dampingFraction: 0.8), value: p)
                    }
                }
                .frame(width: g.size.width, height: g.size.height, alignment: .bottomLeading)
            }
            .frame(height: 190)
            Text(caption(s))
                .font(.subheadline.weight(.bold)).opacity(0.85)
        }
    }

    private func caption(_ s: BubbleState) -> String {
        if s.end { return "Fertig sortiert" }
        if s.cmp == nil { return "Ausgangslage" }
        return s.swapped ? "Links größer: tauschen" : "Reihenfolge passt: nicht tauschen"
    }
}

struct BinAnim: View {
    let arr: [Int]
    let target: Int
    let step: Step
    var body: some View {
        let steps = binSteps(arr, target)
        let s = steps[step.index(steps.count)]
        VStack(alignment: .leading, spacing: 12) {
            (Text("Gesucht: ") + Text("\(target)").foregroundColor(mk).font(.title3.weight(.heavy))).font(.headline)
            HStack(spacing: 5) {
                ForEach(arr.indices, id: \.self) { i in
                    let out = i < s.lo || i > s.hi
                    let mid = i == s.mid
                    VStack(spacing: 2) {
                        Text("\(arr[i])").font(.headline.weight(.heavy))
                        Text("\(i)").font(.caption2).opacity(0.6)
                    }
                    .frame(maxWidth: .infinity).padding(.vertical, 8)
                    .background(mid ? (s.found ? okGreen : mk) : Color.white.opacity(0.1), in: RoundedRectangle(cornerRadius: 10))
                    .foregroundStyle(mid ? Color.black : stageFG)
                    .opacity(out ? 0.18 : 1)
                    .scaleEffect(out ? 0.92 : (mid && s.found ? 1.08 : 1))
                }
            }
            Group {
                if s.found, let m = s.mid { Text("Gefunden an Index \(m)") }
                else if let m = s.mid { Text(midText(m)) }
                else { Text("Ganze Liste, sortiert") }
            }
            .font(.subheadline.weight(.bold)).opacity(0.85)
            .frame(maxWidth: .infinity)
        }
    }

    private func midText(_ m: Int) -> String {
        let dir = arr[m] < target ? "größer, rechts weiter" : "kleiner, links weiter"
        return "Mitte: \(arr[m]), gesucht ist \(dir)"
    }
}

struct JoinAnim: View {
    let left: JoinTable
    let right: JoinTable
    let on: [Int]
    let isLeft: Bool
    let step: Int

    private var li: Int { on.first ?? 0 }
    private var ri: Int { on.count > 1 ? on[1] : 0 }

    /// Zellwert oder "" falls die Zeile zu kurz ist
    private func cell(_ row: [Flex], _ i: Int) -> String { row.indices.contains(i) ? row[i].s : "" }

    private var keys: [String] { uniqueOrdered(left.rows.map { cell($0, li) }) }
    private func tint(_ key: String) -> Color? { keys.firstIndex(of: key).map { groupColors[$0 % 4] } }

    private var leftRows: [[String]] { [left.cols] + left.rows.map { $0.map(\.s) } }
    private var rightRows: [[String]] { [right.cols] + right.rows.map { $0.map(\.s) } }

    private func leftTint(_ i: Int) -> Color? {
        guard step >= 1 else { return nil }
        let k = cell(left.rows[i], li)
        let hasMatch = right.rows.contains { cell($0, ri) == k }
        return hasMatch ? tint(k) : Optional(Color.clear)
    }
    private func rightTint(_ i: Int) -> Color? {
        guard step >= 1 else { return nil }
        return tint(cell(right.rows[i], ri))
    }

    private var resultCols: [String] {
        var c = left.cols
        for (o, e) in right.cols.enumerated() where o != ri { c.append(e) }
        return c
    }
    private var result: [(String, [String])] {
        var out: [(String, [String])] = []
        for lr in left.rows {
            let key = cell(lr, li)
            let base = lr.map(\.s)
            let ms = right.rows.filter { cell($0, ri) == key }
            if ms.isEmpty {
                if isLeft { out.append((key, base + Array(repeating: "NULL", count: max(0, right.cols.count - 1)))) }
                continue
            }
            for m in ms {
                var row = base
                for (o, e) in m.enumerated() where o != ri { row.append(e.s) }
                out.append((key, row))
            }
        }
        return out
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            label(left.name)
            StageTable(rows: leftRows, rowTint: { i in leftTint(i) }, small: true)
                .opacity(1)
            label(right.name)
            StageTable(rows: rightRows, rowTint: { i in rightTint(i) }, small: true)
            if step >= 2 {
                label(isLeft ? "Ergebnis LEFT JOIN" : "Ergebnis INNER JOIN")
                resultTable(result)
                    .transition(.move(edge: .bottom).combined(with: .opacity))
            }
        }
    }

    private func resultTable(_ res: [(String, [String])]) -> StageTable {
        let rows: [[String]] = [resultCols] + res.map { $0.1 }
        let tintFor: (Int) -> Color? = { i in
            guard let t = tint(res[i].0) else { return nil }
            return res[i].1.contains("NULL") ? Color.white.opacity(0.04) : t
        }
        return StageTable(rows: rows, rowTint: tintFor, small: true)
    }
    private func label(_ s: String) -> some View {
        Text(s.uppercased()).font(.caption2.weight(.heavy)).tracking(1).opacity(0.6)
    }
}

struct TraceAnim: View {
    let code: String
    let vars: [String]
    let rows: [[Flex]]
    let upTo: Int
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            CodeBlock(code: code, range: nil)
            StageTable(rows: tableRows, upTo: max(upTo, 0))
        }
    }

    private var tableRows: [[String]] {
        var out: [[String]] = [["#"] + vars]
        for (i, r) in rows.enumerated() {
            out.append([String(i)] + r.map(\.s))
        }
        return out
    }
}

struct StackAnim: View {
    let calls: [String]
    let returns: [String]
    let step: Step
    var body: some View {
        let n = calls.count
        let k = stepCount(n)
        let pushed = min(k, n)
        let resolved = max(0, k - n)
        VStack(alignment: .leading, spacing: 6) {
            Text("AUFRUFSTAPEL").font(.caption2.weight(.heavy)).tracking(1).opacity(0.6)
            ForEach((0..<pushed).reversed(), id: \.self) { i in
                let isRes = i >= n - resolved
                let top = (k <= n && i == pushed - 1) || (k > n && i == n - resolved)
                HStack {
                    Text(calls[i])
                    Spacer()
                    if isRes { Text("= \(ret(i))").fontWeight(.heavy).foregroundStyle(okGreen) }
                }
                .font(.system(.subheadline, design: .monospaced))
                .padding(10)
                .background(frameBG(isRes: isRes, top: top), in: RoundedRectangle(cornerRadius: 10))
                .overlay(alignment: .leading) { if top { Rectangle().fill(mk).frame(width: 3) } }
                .transition(.move(edge: .top).combined(with: .opacity))
            }
            Text(caption(k: k, n: n, pushed: pushed, resolved: resolved))
                .font(.subheadline.weight(.bold)).opacity(0.85).frame(maxWidth: .infinity)
        }
    }

    private func stepCount(_ n: Int) -> Int {
        if case .n(let i) = step { return max(0, i) }
        return 2 * n
    }
    private func ret(_ i: Int) -> String { returns.indices.contains(i) ? returns[i] : "" }
    private func frameBG(isRes: Bool, top: Bool) -> Color {
        if isRes { return okGreen.opacity(0.2) }
        return top ? mk.opacity(0.16) : Color(red: 0.49, green: 0.58, blue: 1).opacity(0.18)
    }
    private func caption(k: Int, n: Int, pushed: Int, resolved: Int) -> String {
        if k == 0 { return "" }
        if k <= n { return "Aufruf \(pushed): Problem wird kleiner" }
        return resolved < n ? "Rückgabe wandert nach unten" : "Ergebnis: \(ret(0))"
    }
}

struct GroupAnim: View {
    let cols: [String]
    let rows: [[Flex]]
    let fn: String
    let step: Int
    var body: some View {
        let keys = uniqueOrdered(rows.map { key($0) })
        Group {
            if step == 0 {
                StageTable(rows: [cols] + rows.map { $0.map(\.s) })
            } else if step == 1 {
                VStack(spacing: 8) {
                    ForEach(keys.indices, id: \.self) { gi in
                        HStack(spacing: 8) {
                            Text(keys[gi]).font(.subheadline.weight(.heavy)).frame(minWidth: 70, alignment: .leading)
                            ForEach(Array(members(keys[gi]).enumerated()), id: \.offset) { _, r in
                                Text(value(r)).font(.system(.caption, design: .monospaced))
                                    .padding(.horizontal, 8).padding(.vertical, 3)
                                    .background(.white.opacity(0.12), in: RoundedRectangle(cornerRadius: 6))
                            }
                            Spacer(minLength: 0)
                        }
                        .padding(10)
                        .background(groupColors[gi % 4], in: RoundedRectangle(cornerRadius: 12))
                    }
                }
            } else {
                StageTable(rows: resultRows(keys), rowTint: { groupColors[$0 % 4] })
            }
        }
    }

    private func key(_ r: [Flex]) -> String { r.first?.s ?? "" }
    private func value(_ r: [Flex]) -> String { r.count > 1 ? r[1].s : "" }
    private func members(_ k: String) -> [[Flex]] { rows.filter { key($0) == k } }

    private func aggregate(_ k: String) -> String {
        let vals: [Double] = members(k).map { $0.count > 1 ? $0[1].number : 0 }
        let v: Double
        switch fn {
        case "COUNT": v = Double(vals.count)
        case "AVG": v = vals.reduce(0, +) / Double(max(1, vals.count))
        case "MAX": v = vals.max() ?? 0
        case "MIN": v = vals.min() ?? 0
        default: v = vals.reduce(0, +)
        }
        return v == v.rounded() ? String(Int(v)) : String(format: "%.2f", v)
    }

    private func resultRows(_ keys: [String]) -> [[String]] {
        let head: [String] = [cols[0], "\(fn)(\(cols[1]))"]
        return [head] + keys.map { [$0, aggregate($0)] }
    }
}

/// Eindeutige Werte in Reihenfolge des ersten Auftretens
func uniqueOrdered(_ xs: [String]) -> [String] {
    var seen = Set<String>()
    return xs.filter { seen.insert($0).inserted }
}
