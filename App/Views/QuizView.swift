import SwiftUI

struct QuizRunner<EndContent: View>: View {
    @Environment(AppStore.self) private var store
    let items: [Question]
    var timer: Double? = nil
    var showLesson = false
    var onEnd: (Int, Int) -> Void
    @ViewBuilder var endContent: () -> EndContent

    @State private var idx = 0
    @State private var right = 0
    @State private var answered = false
    @State private var chosen: Int? = nil
    @State private var wasRight = false
    @State private var timedOut = false
    @State private var input = ""
    @State private var order: [Int] = []
    @State private var startTime = Date()
    @State private var finished = false
    @State private var wrongCount = 0
    @FocusState private var inputFocused: Bool
    private let tick = Timer.publish(every: 0.2, on: .main, in: .common).autoconnect()

    var body: some View {
        Group {
            if finished { resultView } else if idx < items.count { questionView(items[idx]) }
        }
        .onAppear { prepare() }
        .onReceive(tick) { _ in
            guard let t = timer, !answered, !finished else { return }
            if Date().timeIntervalSince(startTime) >= t { timedOut = true; answer(false, chosen: nil) }
        }
        .sensoryFeedback(trigger: answered) { _, new in
            guard new else { return nil }
            return wasRight ? .success : .error
        }
    }

    private func prepare() {
        guard idx < items.count else { return }
        order = Array(0..<(items[idx].o?.count ?? 0)).shuffled()
        startTime = Date()
        answered = false; chosen = nil; input = ""; timedOut = false
    }

    @ViewBuilder
    private func questionView(_ q: Question) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text("FRAGE \(idx + 1) / \(items.count)")
                    .font(.caption.weight(.bold)).tracking(1).foregroundStyle(.secondary).monospacedDigit()
                Spacer()
                if showLesson, let l = Content.shared.lesson(q.lessonID) { AreaTag(area: l.area) }
            }
            if let t = timer {
                TimelineView(.periodic(from: startTime, by: 0.1)) { ctx in
                    let rem = answered ? 0 : max(0, t - ctx.date.timeIntervalSince(startTime))
                    ProgressView(value: rem, total: t).tint(.marker)
                }
            }
            QuestionText(text: q.q)

            if q.isInput {
                HStack {
                    TextField("Antwort eintippen", text: $input)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .keyboardType(.numbersAndPunctuation)
                        .focused($inputFocused)
                        .submitLabel(.done)
                        .onSubmit(submitInput)
                        .disabled(answered)
                        .padding(14)
                        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))
                    if !answered {
                        Button("Prüfen", action: submitInput)
                            .buttonStyle(.borderedProminent).controlSize(.large)
                            .disabled(input.trimmingCharacters(in: .whitespaces).isEmpty)
                    }
                }
            } else if let opts = q.o {
                VStack(spacing: 8) {
                    ForEach(order, id: \.self) { k in
                        Button { answer(k == q.correct, chosen: k) } label: {
                            HStack {
                                Text(opts[k]).font(.body.weight(.semibold)).multilineTextAlignment(.leading)
                                Spacer(minLength: 6)
                                if answered && k == q.correct { Image(systemName: "checkmark.circle.fill").foregroundStyle(.green) }
                                else if answered && k == chosen { Image(systemName: "xmark.circle.fill").foregroundStyle(.red) }
                            }
                            .padding(14)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(optionBG(k, q), in: RoundedRectangle(cornerRadius: 12))
                            .overlay(RoundedRectangle(cornerRadius: 12).stroke(optionStroke(k, q), lineWidth: 2))
                            .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                        .disabled(answered)
                    }
                }
            }

            if answered {
                VStack(alignment: .leading, spacing: 6) {
                    Text(wasRight ? "Richtig" : (timedOut ? "Zeit abgelaufen" : "Nicht ganz"))
                        .font(.headline).foregroundStyle(wasRight ? .green : .red)
                    if !wasRight {
                        Text("Richtig ist: **\(q.correctText)**")
                    }
                    Text(q.e).font(.subheadline)
                }
                .padding(14)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background((wasRight ? Color.green : Color.red).opacity(0.12), in: RoundedRectangle(cornerRadius: 12))

                Button(action: next) {
                    Text(idx + 1 < items.count ? "Nächste Frage" : "Auswertung").frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent).controlSize(.large)
            }
        }
        .padding(16)
        .background(Color(.systemBackground).opacity(0.0001))
    }

    private func optionBG(_ k: Int, _ q: Question) -> Color {
        guard answered else { return Color(.secondarySystemGroupedBackground) }
        if k == q.correct { return Color.green.opacity(0.15) }
        if k == chosen { return Color.red.opacity(0.15) }
        return Color(.secondarySystemGroupedBackground)
    }
    private func optionStroke(_ k: Int, _ q: Question) -> Color {
        guard answered else { return Color.secondary.opacity(0.2) }
        if k == q.correct { return .green }
        if k == chosen { return .red }
        return Color.secondary.opacity(0.2)
    }

    private func submitInput() {
        guard !answered, let acc = items[idx].accept else { return }
        let v = normalizeAnswer(input)
        guard !v.isEmpty else { return }
        inputFocused = false
        answer(acc.contains { normalizeAnswer($0) == v }, chosen: nil)
    }

    private func answer(_ ok: Bool, chosen k: Int?) {
        guard !answered else { return }
        chosen = k
        wasRight = ok
        let key = items[idx].key
        if ok { right += 1; store.markRight(key) } else { wrongCount += 1; store.markWrong(key) }
        withAnimation(.easeOut(duration: 0.2)) { answered = true }
    }

    private func next() {
        if idx + 1 >= items.count {
            let pct = Int((Double(right) / Double(max(1, items.count)) * 100).rounded())
            withAnimation { finished = true }
            onEnd(pct, right)
        } else {
            idx += 1
            prepare()
        }
    }

    private var resultView: some View {
        let pct = Int((Double(right) / Double(max(1, items.count)) * 100).rounded())
        let pass = pct >= 50
        return VStack(spacing: 12) {
            Text("ERGEBNIS").font(.caption.weight(.bold)).tracking(1).foregroundStyle(.secondary)
            Gauge(value: Double(pct), in: 0...100) {
                EmptyView()
            } currentValueLabel: {
                Text("\(pct) %").font(.title2.weight(.heavy)).monospacedDigit()
            }
            .gaugeStyle(.accessoryCircularCapacity)
            .tint(pass ? .green : .red)
            .scaleEffect(1.6)
            .padding(.vertical, 22)
            Text("\(right) von \(items.count) richtig").font(.headline)
            Text(pass ? "Bestehens-Niveau erreicht" : "Unter 50 %, nochmal ran")
                .font(.subheadline.weight(.bold))
                .padding(.horizontal, 10).padding(.vertical, 4)
                .background((pass ? Color.green : Color.red).opacity(0.15), in: Capsule())
                .foregroundStyle(pass ? .green : .red)
            if wrongCount > 0 {
                Text("Falsche Antworten liegen jetzt unter Wiederholen.").font(.caption).foregroundStyle(.secondary)
            }
            endContent()
        }
        .padding(20)
        .frame(maxWidth: .infinity)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 18))
    }
}

struct QuestionText: View {
    let text: String
    private var isCode: Bool {
        text.contains("\n") && ["=", ";", "(", "für", "solange", "SELECT"].contains { text.contains($0) }
    }
    var body: some View {
        if isCode {
            let parts = text.components(separatedBy: "\n\n")
            VStack(alignment: .leading, spacing: 10) {
                ScrollView(.horizontal, showsIndicators: false) {
                    Text(parts.count > 1 ? parts.dropLast().joined(separator: "\n\n") : text)
                        .font(.system(.callout, design: .monospaced))
                        .fixedSize(horizontal: true, vertical: false)
                        .padding(12)
                }
                .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 10))
                if parts.count > 1 { Text(parts.last!).font(.title3.weight(.bold)) }
            }
        } else {
            Text(text).font(.title3.weight(.bold)).fixedSize(horizontal: false, vertical: true)
        }
    }
}

struct QuizStep: View {
    @Environment(AppStore.self) private var store
    let lesson: Lesson
    let onWrite: () -> Void
    @State private var items: [Question] = []
    @State private var run = 0

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if !store.progress(lesson.id).clip {
                Label("Tipp: Erst den Clip ansehen. Das Quiz fragt genau den ab.", systemImage: "lightbulb")
                    .font(.subheadline).foregroundStyle(.secondary)
            }
            if !items.isEmpty {
                QuizRunner(items: items, onEnd: { pct, right in
                    store.update(lesson.id) { $0.quizBest = max($0.quizBest, pct) }
                    store.gain(right * 10)
                }) {
                    VStack(spacing: 8) {
                        Button(action: onWrite) { Text("Weiter zum Schreiben").frame(maxWidth: .infinity) }
                            .buttonStyle(.borderedProminent).controlSize(.large)
                        Button { items = lesson.quiz.shuffled(); run += 1 } label: { Text("Quiz nochmal").frame(maxWidth: .infinity) }
                            .buttonStyle(.bordered).controlSize(.large)
                    }
                    .padding(.top, 8)
                }
                .id(run)
                .background(Color(.secondarySystemGroupedBackground).opacity(0.0001))
            }
        }
        .onAppear { if items.isEmpty { items = lesson.quiz.shuffled() } }
    }
}

struct RunView: View {
    @Environment(AppStore.self) private var store
    @Environment(\.dismiss) private var dismiss
    let title: String
    let items: [Question]
    var timer: Double? = nil
    var showLesson = true
    var xpEach = 5

    var body: some View {
        ScrollView {
            QuizRunner(items: items, timer: timer, showLesson: showLesson, onEnd: { _, right in
                store.gain(right * xpEach)
            }) {
                Button { dismiss() } label: { Text("Fertig").frame(maxWidth: .infinity) }
                    .buttonStyle(.borderedProminent).controlSize(.large).padding(.top, 8)
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle(title)
        .navigationBarTitleDisplayMode(.inline)
    }
}
