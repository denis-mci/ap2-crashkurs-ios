import SwiftUI

struct TopicsView: View {
    @Environment(AppStore.self) private var store

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Text("Sortiert nach Prüfungsrelevanz. **Muss** heißt: kam in fast jeder Prüfung dran. Die drei Balken sind Clip, Quiz und Schreiben.")
                        .font(.subheadline).foregroundStyle(.secondary)
                }
                ForEach(Area.allCases, id: \.self) { a in
                    Section {
                        ForEach(Content.shared.lessons(in: a)) { l in
                            NavigationLink(value: LessonRoute(id: l.id, step: store.nextStep(l))) {
                                LessonRow(lesson: l)
                            }
                        }
                    } header: {
                        HStack { Text(a.title); Spacer(); Text("\(store.areaPct(a)) %").monospacedDigit() }
                    }
                }
            }
            .navigationTitle("Themen")
            .navigationDestination(for: LessonRoute.self) { r in
                LessonView(lessonID: r.id, initialStep: r.step)
            }
        }
    }
}

struct LessonRow: View {
    @Environment(AppStore.self) private var store
    let lesson: Lesson
    var body: some View {
        let p = store.progress(lesson.id)
        VStack(alignment: .leading, spacing: 6) {
            HStack(alignment: .firstTextBaseline) {
                Text(lesson.title).font(.body.weight(.semibold))
                Spacer(minLength: 8)
                Pips(done: store.stepsDone(lesson))
            }
            HStack(spacing: 8) {
                PrioTag(lesson: lesson)
                Text("· \(lesson.mins) Min").font(.caption).foregroundStyle(.secondary)
                if p.quizBest >= 0 {
                    Text("Quiz \(p.quizBest) %")
                        .font(.caption.weight(.bold)).monospacedDigit()
                        .padding(.horizontal, 6).padding(.vertical, 2)
                        .background((p.quizBest >= 50 ? Color.green : Color.red).opacity(0.15), in: Capsule())
                        .foregroundStyle(p.quizBest >= 50 ? Color.green : Color.red)
                }
            }
        }
        .padding(.vertical, 4)
    }
}

struct LessonView: View {
    @Environment(AppStore.self) private var store
    let lessonID: String
    @State private var step: Int

    init(lessonID: String, initialStep: Int) {
        self.lessonID = lessonID
        _step = State(initialValue: initialStep)
    }

    var body: some View {
        if let l = Content.shared.lesson(lessonID) {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    HStack { AreaTag(area: l.area); PrioTag(lesson: l) }
                    Picker("Schritt", selection: $step) {
                        let d = store.stepsDone(l)
                        Text((d[0] ? "✓ " : "") + "Clip").tag(0)
                        Text((d[1] ? "✓ " : "") + "Quiz").tag(1)
                        Text((d[2] ? "✓ " : "") + "Schreiben").tag(2)
                    }
                    .pickerStyle(.segmented)

                    switch step {
                    case 0:
                        ClipStep(lesson: l) { withAnimation { step = 1 } }
                    case 1:
                        QuizStep(lesson: l) { withAnimation { step = 2 } }
                    default:
                        WriteStep(lesson: l)
                    }
                }
                .padding()
            }
            .scrollDismissesKeyboard(.interactively)
            .background(Color(.systemGroupedBackground))
            .navigationTitle(l.title)
            .navigationBarTitleDisplayMode(.inline)
        } else {
            Text("Lektion nicht gefunden")
        }
    }
}
