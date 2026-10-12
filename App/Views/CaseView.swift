import SwiftUI

struct CaseView: View {
    @Environment(AppStore.self) private var store
    let exam: ExamCase

    @State private var running = false
    @State private var left: Double = 0
    @State private var confirmReset = false
    private let tick = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    private var score: (points: Int, checked: Bool) { store.caseScore(exam) }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                card {
                    Text("AUSGANGSSITUATION").font(.caption.weight(.bold)).tracking(1).foregroundStyle(.secondary)
                    Text(exam.scenario).fixedSize(horizontal: false, vertical: true)
                }
                if let mats = exam.material, !mats.isEmpty {
                    card {
                        Text("MATERIAL ZUM FALL").font(.caption.weight(.bold)).tracking(1).foregroundStyle(.secondary)
                        ForEach(mats.indices, id: \.self) { i in MaterialBlock(m: mats[i]) }
                    }
                }
                ForEach(exam.tasks, id: \.nr) { t in
                    card {
                        HStack(alignment: .firstTextBaseline) {
                            Text(t.title).font(.title3.weight(.bold))
                            Spacer()
                            Text("\(t.points) P").font(.subheadline.weight(.bold)).monospacedDigit()
                                .padding(.horizontal, 8).padding(.vertical, 3)
                                .background(Color.marker, in: Capsule()).foregroundStyle(.black)
                        }
                        if let intro = t.intro { Text(intro).foregroundStyle(.secondary) }
                        ForEach(t.sub, id: \.id) { s in
                            Divider()
                            CaseSubView(caseID: exam.id, key: "\(t.nr)\(s.id)", sub: s)
                        }
                    }
                }
                card {
                    VStack(spacing: 8) {
                        Text("DEIN ERGEBNIS").font(.caption.weight(.bold)).tracking(1).foregroundStyle(.secondary)
                        Text("\(score.points)").font(.system(size: 54, weight: .heavy, design: .rounded)).monospacedDigit()
                            .contentTransition(.numericText())
                        Text("von 100 Punkten · Note \(ihkGrade(score.points))").font(.headline)
                        Text("Zählt nur für aufgedeckte Teilaufgaben. Ab 50 Punkten ist der Bereich bestanden.")
                            .font(.caption).foregroundStyle(.secondary).multilineTextAlignment(.center)
                        Button(role: .destructive) { confirmReset = true } label: {
                            Text("Fall zurücksetzen").frame(maxWidth: .infinity)
                        }
                        .buttonStyle(.bordered).controlSize(.large)
                    }
                    .frame(maxWidth: .infinity)
                }
            }
            .padding()
        }
        .scrollDismissesKeyboard(.interactively)
        .background(Color(.systemGroupedBackground))
        .safeAreaInset(edge: .top) { timerBar }
        .navigationTitle(exam.title)
        .navigationBarTitleDisplayMode(.inline)
        .onAppear { left = store.caseProgress(exam.id).left ?? Double(exam.minutes * 60) }
        .onDisappear { running = false; persistTime() }
        .onReceive(tick) { _ in
            guard running else { return }
            left = max(0, left - 1)
            if left == 0 { running = false; persistTime() }
            if Int(left) % 15 == 0 { persistTime() }
        }
        .confirmationDialog("Fall zurücksetzen?", isPresented: $confirmReset, titleVisibility: .visible) {
            Button("Alle Antworten löschen", role: .destructive) {
                store.updateCase(exam.id) { $0 = CaseProgress() }
                left = Double(exam.minutes * 60); running = false
            }
        }
    }

    private var timerBar: some View {
        HStack {
            AreaTag(area: exam.area)
            Spacer()
            Text(left <= 0 ? "Zeit um" : timeText(left))
                .font(.title3.weight(.heavy)).monospacedDigit()
                .foregroundStyle(left < 600 ? Color.red : Color.primary)
            Spacer()
            Button {
                running.toggle()
                if !running { persistTime() }
            } label: {
                Label(running ? "Pause" : (left == Double(exam.minutes * 60) ? "Start" : "Weiter"),
                      systemImage: running ? "pause.fill" : "play.fill")
            }
            .buttonStyle(.borderedProminent)
            .disabled(left <= 0)
        }
        .padding(.horizontal).padding(.vertical, 8)
        .background(.bar)
    }

    private func timeText(_ s: Double) -> String {
        let r = Int(s)
        return String(format: "%d:%02d", r / 60, r % 60)
    }

    private func persistTime() {
        let l = left
        store.updateCase(exam.id) { $0.left = l }
    }

    @ViewBuilder
    private func card<C: View>(@ViewBuilder _ content: () -> C) -> some View {
        VStack(alignment: .leading, spacing: 12, content: content)
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 16))
    }
}

struct CaseSubView: View {
    @Environment(AppStore.self) private var store
    let caseID: String
    let key: String
    let sub: CaseSub

    @State private var text = ""
    @State private var loaded = false
    @State private var drawMode = true
    @FocusState private var focused: Bool

    private var progress: CaseProgress { store.caseProgress(caseID) }
    private var shown: Bool { progress.shown.contains(key) }
    private var isCode: Bool { sub.kind == "code" }
    private var isDiagram: Bool { sub.kind == "diagram" }

    private var reached: Int {
        let cr = progress.crit[key] ?? []
        return sub.criteria.enumerated().reduce(0) { acc, e in acc + ((e.offset < cr.count && cr[e.offset]) ? e.element.points : 0) }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text("\(sub.id))").font(.headline)
                Spacer()
                Text("\(sub.points) Punkte").font(.caption.weight(.bold)).monospacedDigit().foregroundStyle(.secondary)
            }
            Text(sub.q).font(.body.weight(.semibold)).fixedSize(horizontal: false, vertical: true)
            if let m = sub.material { MaterialBlock(m: m) }

            if isDiagram {
                Picker("Modus", selection: $drawMode) {
                    Text("Zeichnen").tag(true)
                    Text("Text").tag(false)
                }
                .pickerStyle(.segmented)
            }
            if isDiagram && drawMode {
                SketchView(key: "case:\(caseID):\(key)")
            } else {
            ZStack(alignment: .topLeading) {
                TextEditor(text: $text)
                    .font(isCode ? .system(.callout, design: .monospaced) : .body)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .scrollContentBackground(.hidden)
                    .focused($focused)
                    .frame(minHeight: isCode ? 220 : 130)
                    .padding(8)
                if text.isEmpty {
                    Text("Deine Lösung …").foregroundStyle(.tertiary)
                        .padding(.horizontal, 13).padding(.vertical, 16)
                        .allowsHitTesting(false)
                }
            }
            .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 12))
            .onChange(of: text) { if loaded { let t = text; store.updateCase(caseID) { $0.ans[key] = t } } }
            }

            if shown {
                Text("MUSTERLÖSUNG").font(.caption.weight(.bold)).tracking(1).foregroundStyle(.secondary)
                if sub.diagram != nil {
                    DiagramImage(id: "\(caseID)_\(key)", crowFoot: sub.q.contains("ERM") || sub.q.contains("ER-Modell") || sub.q.contains("Entity"))
                }
                ScrollView(.horizontal, showsIndicators: false) {
                    Text(sub.model)
                        .font(.system(.footnote, design: .monospaced))
                        .fixedSize(horizontal: isCode, vertical: false)
                        .textSelection(.enabled)
                        .padding(12)
                }
                .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 10))
                Text("BEWERTUNG: HAKE EHRLICH AB, WAS DU HATTEST").font(.caption.weight(.bold)).tracking(1).foregroundStyle(.secondary)
                ForEach(sub.criteria.indices, id: \.self) { i in
                    let on = isOn(i)
                    Button {
                        toggle(i)
                    } label: {
                        HStack(alignment: .top, spacing: 10) {
                            Image(systemName: on ? "checkmark.square.fill" : "square")
                                .font(.title3).foregroundStyle(on ? Color.green : Color.secondary)
                            Text(sub.criteria[i].text).font(.subheadline).multilineTextAlignment(.leading)
                                .foregroundStyle(.primary)
                            Spacer(minLength: 4)
                            Text("\(sub.criteria[i].points) P").font(.subheadline.weight(.bold)).monospacedDigit()
                                .foregroundStyle(.primary)
                        }
                        .padding(10)
                        .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 10))
                    }
                    .buttonStyle(PressStyle())
                    .accessibilityValue(on ? "abgehakt" : "nicht abgehakt")
                }
                Text("Erreicht: \(reached) von \(sub.points)").font(.subheadline.weight(.semibold)).monospacedDigit()
            } else {
                Button {
                    focused = false
                    let t = text
                    store.updateCase(caseID) { $0.ans[key] = t; $0.shown.insert(key) }
                } label: {
                    Label("Musterlösung und Bewertung zeigen", systemImage: "eye").frame(maxWidth: .infinity)
                }
                .buttonStyle(.bordered).controlSize(.large)
            }
        }
        .onAppear { if !loaded { text = progress.ans[key] ?? ""; loaded = true } }
        .sensoryFeedback(.selection, trigger: reached)
    }

    private func isOn(_ i: Int) -> Bool {
        let cr = progress.crit[key] ?? []
        return i < cr.count && cr[i]
    }

    private func toggle(_ i: Int) {
        let n = sub.criteria.count
        store.updateCase(caseID) { p in
            var cr = p.crit[key] ?? []
            if cr.count < n { cr += Array(repeating: false, count: n - cr.count) }
            cr[i].toggle()
            p.crit[key] = cr
        }
    }
}

struct MaterialBlock: View {
    let m: CaseMaterial
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            if let t = m.title { Text(t.uppercased()).font(.caption2.weight(.heavy)).tracking(1).foregroundStyle(.secondary) }
            if let code = m.code {
                ScrollView(.horizontal, showsIndicators: false) {
                    Text(code).font(.system(.caption, design: .monospaced))
                        .fixedSize(horizontal: true, vertical: false)
                        .textSelection(.enabled)
                        .padding(10)
                }
                .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 10))
            }
            if let table = m.table, let head = table.first {
                ScrollView(.horizontal, showsIndicators: false) {
                    Grid(alignment: .leading, horizontalSpacing: 12, verticalSpacing: 5) {
                        GridRow {
                            ForEach(head.indices, id: \.self) { c in
                                Text(head[c].s).font(.caption.weight(.bold))
                            }
                        }
                        Divider()
                        ForEach(Array(table.dropFirst().enumerated()), id: \.offset) { _, r in
                            GridRow {
                                ForEach(r.indices, id: \.self) { c in
                                    Text(r[c].s).font(.caption).lineLimit(1)
                                }
                            }
                        }
                    }
                    .padding(10)
                }
                .background(Color(.tertiarySystemFill), in: RoundedRectangle(cornerRadius: 10))
            }
        }
    }
}

struct BelegView: View {
    var body: some View {
        List {
            Section {
                Text("In der Prüfung bekommst du einen bundeseinheitlichen Belegsatz mit SQL-Beiblatt und UML-Notation. Das hier ist eine Übungsversion in derselben Art. Kein Original.")
                    .font(.subheadline).foregroundStyle(.secondary)
            }
            ForEach(ExtraContent.beleg, id: \.title) { b in
                Section(b.title) {
                    ScrollView(.horizontal, showsIndicators: false) {
                        Text(b.code)
                            .font(.system(.caption, design: .monospaced))
                            .fixedSize(horizontal: true, vertical: false)
                            .textSelection(.enabled)
                            .padding(.vertical, 4)
                    }
                }
            }
        }
        .navigationTitle("Belegsatz")
        .navigationBarTitleDisplayMode(.inline)
    }
}
