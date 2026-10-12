import SwiftUI

struct WriteStep: View {
    let lesson: Lesson

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Label {
                Text("**Schreiben wie in der Prüfung.** In GA1 und GA2 gibt es nur offene Aufgaben. Tippe deine Lösung, die App prüft die Kernpunkte und zeigt dir die Musterlösung.")
            } icon: {
                Image(systemName: "pencil.and.list.clipboard").foregroundStyle(Color.cobalt)
            }
            .font(.subheadline)
            .padding(12)
            .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))

            ForEach(Array(lesson.write.enumerated()), id: \.offset) { i, t in
                WriteTaskCard(lesson: lesson, index: i, task: t)
            }

            if let i = Content.shared.order.firstIndex(of: lesson.id), i + 1 < Content.shared.order.count,
               let next = Content.shared.lesson(Content.shared.order[i + 1]) {
                NavigationLink(value: LessonRoute(id: next.id, step: 0)) {
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text("Nächste Lektion").font(.caption).foregroundStyle(.secondary)
                            Text(next.title).font(.headline).foregroundStyle(.primary)
                        }
                        Spacer()
                        Image(systemName: "chevron.right").foregroundStyle(.secondary)
                    }
                    .padding(14)
                    .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))
                }
            }
        }
    }
}

struct WriteTaskCard: View {
    @Environment(AppStore.self) private var store
    let lesson: Lesson
    let index: Int
    let task: WriteTask

    @State private var text = ""
    @State private var hits: [Bool]? = nil
    @State private var loaded = false
    @State private var checkTrigger = 0
    @FocusState private var focused: Bool

    private var key: String { "\(lesson.id):w\(index)" }
    private var last: Int? { store.progress(lesson.id).write[String(index)] }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("AUFGABE \(index + 1) VON \(lesson.write.count)")
                    .font(.caption.weight(.bold)).tracking(1).foregroundStyle(.secondary)
                Spacer()
                if let l = last {
                    Text("zuletzt \(l) %").font(.caption.weight(.bold)).monospacedDigit()
                        .padding(.horizontal, 6).padding(.vertical, 2)
                        .background((l >= 60 ? Color.green : Color.red).opacity(0.15), in: Capsule())
                        .foregroundStyle(l >= 60 ? .green : .red)
                }
            }
            Text(task.task).font(.body.weight(.semibold)).fixedSize(horizontal: false, vertical: true)

            ZStack(alignment: .topLeading) {
                TextEditor(text: $text)
                    .font(task.isCode ? .system(.callout, design: .monospaced) : .body)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .scrollContentBackground(.hidden)
                    .focused($focused)
                    .frame(minHeight: 200)
                    .padding(8)
                if text.isEmpty {
                    Text(task.isCode ? "Hier deine Lösung tippen …" : "Deine Antwort in eigenen Worten …")
                        .foregroundStyle(.tertiary)
                        .font(task.isCode ? .system(.callout, design: .monospaced) : .body)
                        .padding(.horizontal, 13).padding(.vertical, 16)
                        .allowsHitTesting(false)
                }
            }
            .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 12))
            .onChange(of: text) { if loaded { store.setWrite(key, text) } }

            Button(action: check) {
                Label("Prüfen", systemImage: "checkmark.seal").frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent).controlSize(.large)
            .disabled(text.trimmingCharacters(in: .whitespacesAndNewlines).count < 5)

            if let h = hits {
                let pct = Int((Double(h.filter { $0 }.count) / Double(max(1, h.count)) * 100).rounded())
                VStack(alignment: .leading, spacing: 10) {
                    HStack {
                        Text(pct >= 60 ? "Gut, das bringt Punkte" : "Da fehlt noch was").font(.headline)
                        Spacer()
                        Text("\(pct) %").font(.headline.monospacedDigit()).foregroundStyle(pct >= 60 ? .green : .red)
                    }
                    ProgressView(value: Double(pct), total: 100).tint(pct >= 60 ? .green : .red)
                    ForEach(Array(task.keys.enumerated()), id: \.offset) { i, k in
                        Label {
                            Text(k.label).font(.subheadline)
                        } icon: {
                            Image(systemName: h[i] ? "checkmark.circle.fill" : "circle.dashed")
                                .foregroundStyle(h[i] ? .green : .red)
                        }
                    }
                    Text("Die App sucht nach Stichworten. Vergleiche trotzdem mit der Musterlösung, andere Formulierungen können auch richtig sein.")
                        .font(.caption).foregroundStyle(.secondary)

                    Text("MUSTERLÖSUNG").font(.caption.weight(.bold)).tracking(1).foregroundStyle(.secondary)
                    ScrollView(.horizontal, showsIndicators: false) {
                        Text(task.model)
                            .font(.system(.footnote, design: .monospaced))
                            .fixedSize(horizontal: task.isCode, vertical: false)
                            .textSelection(.enabled)
                            .padding(12)
                    }
                    .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 10))
                    if let alt = task.alt { Text(alt).font(.footnote) }
                    Text("**Trick fürs Einprägen:** Lies die Musterlösung einmal, dann leere dein Feld und schreib sie aus dem Kopf nochmal.")
                        .font(.footnote)
                    Button {
                        text = ""; hits = nil; focused = true
                    } label: {
                        Label("Feld leeren und nochmal schreiben", systemImage: "arrow.counterclockwise").frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.bordered).controlSize(.large)
                }
                .transition(.opacity)
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 16))
        .onAppear {
            if !loaded { text = store.writeText(key); loaded = true }
        }
        .sensoryFeedback(.success, trigger: checkTrigger)
    }

    private func check() {
        focused = false
        // iOS ersetzt Anführungszeichen automatisch durch typografische, die SQL-Prüfung braucht gerade
        let t = text
            .replacingOccurrences(of: "\u{2019}", with: "'").replacingOccurrences(of: "\u{2018}", with: "'")
            .replacingOccurrences(of: "\u{201A}", with: "'")
            .replacingOccurrences(of: "\u{201C}", with: "\"").replacingOccurrences(of: "\u{201D}", with: "\"")
            .replacingOccurrences(of: "\u{201E}", with: "\"")
        let h = task.keys.map { $0.matches(t) }
        let pct = Int((Double(h.filter { $0 }.count) / Double(max(1, h.count)) * 100).rounded())
        let first = last == nil
        store.update(lesson.id) { $0.write[String(index)] = pct }
        store.gain(first ? 30 : 10)
        checkTrigger += 1
        withAnimation { hits = h }
    }
}
