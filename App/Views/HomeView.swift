import SwiftUI

struct HomeView: View {
    @Environment(AppStore.self) private var store
    @Binding var tab: Int
    @State private var path: [LessonRoute] = {
        if let id = UserDefaults.standard.string(forKey: "shotLesson") {
            return [LessonRoute(id: id, step: UserDefaults.standard.integer(forKey: "shotStep"))]
        }
        return []
    }()
    private let goal = 120

    var body: some View {
        NavigationStack(path: $path) {
            List {
                Section {
                    CountdownHero()
                        .listRowInsets(EdgeInsets())
                        .listRowBackground(Color.clear)
                }

                Section {
                    HStack(spacing: 0) {
                        StatCell(value: "\(store.streak)", label: "Tage am Stück", icon: "flame.fill", color: .orange)
                        Divider()
                        StatCell(value: "\(store.state.xp)", label: "XP gesamt", icon: "star.fill", color: .yellow)
                        Divider()
                        StatCell(value: "\(store.dueKeys.count)", label: "Wiederholen", icon: "arrow.counterclockwise", color: .red)
                    }
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text("Tagesziel").font(.subheadline.weight(.semibold))
                            Spacer()
                            Text("\(min(store.todayXP, goal)) / \(goal) XP").font(.subheadline.monospacedDigit()).foregroundStyle(.secondary)
                        }
                        ProgressView(value: Double(min(store.todayXP, goal)), total: Double(goal)).tint(.marker)
                        Text("Eine Lektion komplett bringt rund 120 XP, das sind 25 bis 30 Minuten.")
                            .font(.caption).foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 4)
                }

                Section("Jetzt dran") {
                    if let l = store.nextLesson {
                        let step = store.nextStep(l)
                        NavigationLink(value: LessonRoute(id: l.id, step: step)) {
                            VStack(alignment: .leading, spacing: 6) {
                                HStack { AreaTag(area: l.area); PrioTag(lesson: l) }
                                Text(l.title).font(.title3.weight(.bold))
                                Text(l.why).font(.subheadline).foregroundStyle(.secondary)
                                let s = [("Erklärclip ansehen", "play.circle.fill"), ("Quiz machen", "checklist"), ("Schreibaufgabe lösen", "pencil.line")][step]
                                Label("\(s.0) · ca. \(l.mins) Min", systemImage: s.1)
                                    .font(.subheadline.weight(.semibold)).foregroundStyle(Color.cobalt)
                            }
                            .padding(.vertical, 6)
                        }
                    } else {
                        VStack(alignment: .leading, spacing: 6) {
                            Text("Alle Lektionen erledigt").font(.title3.weight(.bold))
                            Text("Jetzt jeden Tag Wiederholen und Prüfungsmodus.").foregroundStyle(.secondary)
                            Button("Zum Prüfungsmodus") { tab = 3 }.buttonStyle(.borderedProminent)
                        }
                    }
                    if store.dueKeys.count > 0 {
                        Button { tab = 2 } label: {
                            Label("\(store.dueKeys.count) falsche Antworten wiederholen", systemImage: "arrow.counterclockwise")
                        }
                    }
                }

                Section("Stand pro Prüfungsbereich") {
                    ForEach(Area.allCases, id: \.self) { a in
                        VStack(alignment: .leading, spacing: 6) {
                            HStack { AreaTag(area: a); Spacer(); Text("\(store.areaPct(a)) %").font(.subheadline.monospacedDigit()) }
                            ProgressView(value: Double(store.areaPct(a)), total: 100).tint(Color.area(a))
                        }
                        .padding(.vertical, 2)
                    }
                }

                Section {
                    ForEach(store.plan) { item in
                        PlanRow(item: item)
                    }
                } header: {
                    Text("Dein Plan bis 15.11.")
                } footer: {
                    Text(store.paceText + " Der Plan rechnet sich jeden Tag neu. Danach nur noch Wiederholen und Prüfungsmodus.")
                }
            }
            .navigationTitle("Heute")
            .navigationDestination(for: LessonRoute.self) { r in
                LessonView(lessonID: r.id, initialStep: r.step)
            }
        }
    }
}

struct LessonRoute: Hashable { let id: String; let step: Int }

struct PlanRow: View {
    @Environment(AppStore.self) private var store
    let item: AppStore.PlanItem

    private var dateLabel: String {
        guard let d = item.date else { return "erledigt" }
        return Dates.cal.isDateInToday(d) ? "heute" : Dates.short.string(from: d)
    }

    var body: some View {
        let done = item.date == nil
        let isToday = item.date.map { Dates.cal.isDateInToday($0) } ?? false
        NavigationLink(value: LessonRoute(id: item.lesson.id, step: store.nextStep(item.lesson))) {
            HStack(spacing: 12) {
                Text(dateLabel)
                    .font(.caption.monospacedDigit().weight(isToday ? .heavy : .semibold))
                    .foregroundStyle(isToday ? Color.primary : Color.secondary)
                    .frame(minWidth: 64, alignment: .leading)
                Text(item.lesson.title)
                    .font(.subheadline)
                    .strikethrough(done)
                    .foregroundStyle(done ? Color.secondary : Color.primary)
                Spacer(minLength: 4)
                if done {
                    Image(systemName: "checkmark.circle.fill").foregroundStyle(.green)
                } else {
                    Text("\(store.lessonPct(item.lesson)) %").font(.caption.monospacedDigit()).foregroundStyle(.secondary)
                }
            }
        }
    }
}

struct CountdownHero: View {
    @ScaledMetric(relativeTo: .largeTitle) private var heroSize = 72.0
    var body: some View {
        HStack(alignment: .bottom, spacing: 14) {
            VStack(alignment: .leading, spacing: -4) {
                Text("\(Dates.daysLeft)")
                    .font(.system(size: heroSize, weight: .black, design: .rounded))
                    .monospacedDigit()
                Text("Tage").font(.headline)
            }
            VStack(alignment: .leading, spacing: 4) {
                Text("bis zur schriftlichen AP2").font(.headline)
                Text("Mi, 25.11.2026 · GA1, GA2 und WiSo an einem Vormittag")
                    .font(.subheadline).opacity(0.75)
            }
            .padding(.bottom, 6)
        }
        .foregroundStyle(.white)
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 20, style: .continuous).fill(Color.ink)
        )
        .overlay(RoundedRectangle(cornerRadius: 20, style: .continuous).strokeBorder(.separator))
        .overlay(alignment: .topTrailing) {
            Circle().fill(Color.marker).frame(width: 14, height: 14).padding(16)
        }
        .accessibilityElement(children: .combine)
    }
}

struct StatCell: View {
    let value: String, label: String, icon: String, color: Color
    var body: some View {
        VStack(spacing: 2) {
            Image(systemName: icon).foregroundStyle(color).font(.caption)
            Text(value).font(.title2.weight(.bold)).monospacedDigit().contentTransition(.numericText())
            Text(label).font(.caption2).foregroundStyle(.secondary).lineLimit(1).minimumScaleFactor(0.8)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 4)
    }
}
