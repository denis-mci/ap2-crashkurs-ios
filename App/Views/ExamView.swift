import SwiftUI

struct RunRoute: Hashable {
    let title: String
    let keys: [String]
    let timer: Double?
    let showLesson: Bool
}

struct ReviewView: View {
    @Environment(AppStore.self) private var store

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Text("Jede falsche Antwort landet hier. Beantwortest du sie richtig, kommt sie nach 1, 3 und 6 Tagen wieder. Nach dreimal richtig ist sie raus.")
                        .font(.subheadline).foregroundStyle(.secondary)
                }
                Section {
                    let due = store.dueKeys
                    if due.isEmpty {
                        ContentUnavailableView {
                            Label("Heute nichts fällig", systemImage: "checkmark.seal")
                        } description: {
                            Text(store.reviewTotal > 0
                                 ? "\(store.reviewTotal) Fragen kommen in den nächsten Tagen wieder."
                                 : "Falsche Antworten aus Quiz und Prüfungsmodus landen automatisch hier.")
                        }
                    } else {
                        NavigationLink(value: RunRoute(title: "Wiederholen", keys: Array(due.shuffled().prefix(20)), timer: nil, showLesson: true)) {
                            HStack {
                                Image(systemName: "arrow.counterclockwise.circle.fill").font(.largeTitle).foregroundStyle(.red)
                                VStack(alignment: .leading) {
                                    Text("\(due.count) Fragen fällig").font(.headline).monospacedDigit()
                                    Text("Jetzt wiederholen").font(.subheadline).foregroundStyle(.secondary)
                                }
                            }
                            .padding(.vertical, 6)
                        }
                    }
                }
                let weak = Content.shared.ordered.filter { let b = store.progress($0.id).quizBest; return b >= 0 && b < 60 }
                if !weak.isEmpty {
                    Section("Lektionen unter 60 %") {
                        ForEach(weak) { l in
                            NavigationLink(value: LessonRoute(id: l.id, step: 1)) {
                                HStack {
                                    Text(l.title)
                                    Spacer()
                                    Text("\(store.progress(l.id).quizBest) %").monospacedDigit().foregroundStyle(.red)
                                }
                            }
                        }
                    }
                }
            }
            .navigationTitle("Wiederholen")
            .navigationDestination(for: RunRoute.self) { r in
                RunView(title: r.title, items: r.keys.compactMap { Content.shared.question($0) }, timer: r.timer, showLesson: r.showLesson)
            }
            .navigationDestination(for: LessonRoute.self) { r in
                LessonView(lessonID: r.id, initialStep: r.step)
            }
        }
    }
}

struct ExamView: View {
    @State private var ap1 = 60.0
    @State private var proj = 70.0
    @State private var ga1 = 45.0
    @State private var ga2 = 45.0
    @State private var wiso = 55.0

    private func keys(_ areas: [Area]?, _ n: Int) -> [String] {
        Array(Content.shared.allQuestions(areas).shuffled().prefix(n)).map { $0.key }
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    NavigationLink(value: RunRoute(title: "Blitzrunde", keys: keys(nil, 10), timer: 20, showLesson: true)) {
                        ModeRow(title: "Blitzrunde", sub: "10 Fragen quer durch alles, 20 s pro Frage", icon: "bolt.fill", color: .yellow)
                    }
                    NavigationLink(value: RunRoute(title: "WiSo-Simulation", keys: keys([.WISO], 25), timer: 60, showLesson: false)) {
                        ModeRow(title: "WiSo-Simulation", sub: "25 Fragen, 60 s pro Frage. Die echte WiSo hat nur Ankreuzfragen.", icon: "building.columns.fill", color: Color.area(.WISO))
                    }
                    NavigationLink(value: RunRoute(title: "GA-Mix", keys: keys([.GA1, .GA2], 15), timer: 45, showLesson: true)) {
                        ModeRow(title: "GA-Mix", sub: "15 Fragen aus GA1 und GA2, 45 s pro Frage", icon: "chevron.left.forwardslash.chevron.right", color: .cobalt)
                    }
                } header: { Text("Mit Zeitdruck") }

                Section {
                    SliderRow(title: "AP1 (Februar)", weight: "20 %", value: $ap1)
                    SliderRow(title: "Projekt (Doku + Präsentation)", weight: "50 %", value: $proj)
                    SliderRow(title: "GA1 Planen", weight: "10 %", value: $ga1)
                    SliderRow(title: "GA2 Algorithmen", weight: "10 %", value: $ga2)
                    SliderRow(title: "WiSo", weight: "10 %", value: $wiso)
                    CalcResult(ap1: ap1, proj: proj, ga1: ga1, ga2: ga2, wiso: wiso)
                } header: {
                    Text("Bestehens-Rechner")
                } footer: {
                    Text("Beispielwerte, schieb sie auf deine eigenen. Liegt ein Bereich zwischen 30 und 49, kannst du dort eine 15-minütige mündliche Ergänzungsprüfung beantragen, wenn sie über das Bestehen entscheidet. Regeln nach § 16 und § 17 FIAusbV, Rundung durch die IHK kann leicht abweichen.")
                }

                Section {
                    LabeledContent("08:00 bis 09:30", value: "GA1 Planen")
                    LabeledContent("10:00 bis 11:30", value: "GA2 Algorithmen")
                    LabeledContent("11:45 bis 12:45", value: "WiSo")
                    ForEach(["Einladung und Personalausweis", "Nicht programmierbarer Taschenrechner", "Mehrere Kulis, Lineal", "Belegsatz liegt bei: SQL-Syntax und UML dort nachschauen", "Erst alles überfliegen, mit dem Leichtesten anfangen", "Nie etwas leer lassen, Teilpunkte gibt es fast überall"], id: \.self) { s in
                        Label(s, systemImage: "square").font(.subheadline)
                    }
                } header: {
                    Text("Prüfungstag")
                } footer: {
                    Text("Typischer Ablauf, die genauen Zeiten stehen in deiner Einladung der IHK.")
                }
            }
            .navigationTitle("Prüfung")
            .navigationDestination(for: RunRoute.self) { r in
                RunView(title: r.title, items: r.keys.compactMap { Content.shared.question($0) }, timer: r.timer, showLesson: r.showLesson)
            }
        }
    }
}

struct ModeRow: View {
    let title: String, sub: String, icon: String, color: Color
    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: icon)
                .font(.title3).foregroundStyle(.white)
                .frame(width: 40, height: 40)
                .background(color, in: RoundedRectangle(cornerRadius: 10))
            VStack(alignment: .leading, spacing: 2) {
                Text(title).font(.headline)
                Text(sub).font(.caption).foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 4)
    }
}

struct SliderRow: View {
    let title: String, weight: String
    @Binding var value: Double
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(title).font(.subheadline)
                Text("· \(weight)").font(.caption).foregroundStyle(.secondary)
                Spacer()
                Text("\(Int(value))").font(.headline.monospacedDigit())
            }
            Slider(value: $value, in: 0...100, step: 1)
        }
    }
}

struct Rule: Identifiable { let name: String; let ok: Bool; let value: String; var id: String { name } }

struct CalcResult: View {
    let ap1, proj, ga1, ga2, wiso: Double
    var body: some View {
        let total = 0.2 * ap1 + 0.5 * proj + 0.1 * (ga1 + ga2 + wiso)
        let t2 = (0.5 * proj + 0.1 * ga1 + 0.1 * ga2 + 0.1 * wiso) / 0.8
        let parts = [proj, ga1, ga2, wiso]
        let over50 = parts.filter { $0 >= 50 }.count
        let rules: [Rule] = [
            Rule(name: "Gesamt mindestens 50", ok: total >= 49.5, value: String(format: "%.1f", total)),
            Rule(name: "Teil 2 mindestens 50", ok: t2 >= 49.5, value: String(format: "%.1f", t2)),
            Rule(name: "3 von 4 Bereichen in Teil 2 ab 50", ok: over50 >= 3, value: "\(over50) von 4"),
            Rule(name: "Kein Bereich in Teil 2 unter 30", ok: parts.allSatisfy { $0 >= 30 }, value: "min. \(Int(parts.min() ?? 0))")
        ]
        let ok = rules.allSatisfy { $0.ok }
        VStack(alignment: .leading, spacing: 8) {
            Label(ok ? "Bestanden" : "Nicht bestanden", systemImage: ok ? "checkmark.seal.fill" : "xmark.octagon.fill")
                .font(.title2.weight(.heavy))
                .foregroundStyle(ok ? .green : .red)
            ForEach(rules) { r in
                HStack {
                    Image(systemName: r.ok ? "checkmark.circle.fill" : "xmark.circle.fill").foregroundStyle(r.ok ? .green : .red)
                    Text(r.name).font(.subheadline)
                    Spacer()
                    Text(r.value).font(.caption.monospacedDigit()).foregroundStyle(.secondary)
                }
            }
        }
        .padding(.vertical, 6)
        .animation(.default, value: ok)
    }
}
