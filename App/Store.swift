import Foundation
import Observation

struct LessonProgress: Codable {
    var clip = false
    var quizBest = -1
    var write: [String: Int] = [:]
}

struct ReviewItem: Codable {
    var box: Int
    var due: Date
}

struct AppState: Codable {
    var xp = 0
    var days: [String: Int] = [:]
    var lessons: [String: LessonProgress] = [:]
    var review: [String: ReviewItem] = [:]
    var writes: [String: String] = [:]
    var sound = true
    var rate: Double = 1.0
    var planStart: String?
    var cases: [String: CaseProgress]?
}

struct CaseProgress: Codable {
    var ans: [String: String] = [:]
    var crit: [String: [Bool]] = [:]
    var shown: Set<String> = []
    var left: Double? = nil
}

enum Dates {
    static let berlin = TimeZone(identifier: "Europe/Berlin")!
    static var cal: Calendar { var c = Calendar(identifier: .gregorian); c.timeZone = berlin; return c }
    static let exam: Date = cal.date(from: DateComponents(year: 2026, month: 11, day: 25, hour: 8))!
    static let planEnd: Date = cal.date(from: DateComponents(year: 2026, month: 11, day: 15, hour: 12))!
    private static let keyFmt: DateFormatter = {
        let f = DateFormatter(); f.calendar = Calendar(identifier: .gregorian)
        f.locale = Locale(identifier: "en_US_POSIX"); f.timeZone = berlin; f.dateFormat = "yyyy-MM-dd"; return f
    }()
    static func key(_ d: Date = Date()) -> String { keyFmt.string(from: d) }
    static func parse(_ s: String) -> Date? { keyFmt.date(from: s) }
    static let short: DateFormatter = {
        let f = DateFormatter(); f.locale = Locale(identifier: "de_DE"); f.timeZone = berlin; f.dateFormat = "EE dd.MM."; return f
    }()
    static var daysLeft: Int {
        max(0, Int(ceil(exam.timeIntervalSinceNow / 86400)))
    }
}

@Observable
final class AppStore {
    var state: AppState
    private let url: URL
    @ObservationIgnored private var saveWork: DispatchWorkItem?

    init() {
        let dir = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        url = dir.appendingPathComponent("progress.json")
        if let data = try? Data(contentsOf: url), let s = try? JSONDecoder().decode(AppState.self, from: data) {
            state = s
        } else {
            state = AppState()
        }
        if UserDefaults.standard.bool(forKey: "demo") { state = AppStore.demoState() }
        if state.planStart == nil { state.planStart = Dates.key(); save() }
    }

    func save() {
        saveWork?.cancel()
        let snapshot = state
        let target = url
        let work = DispatchWorkItem {
            if let data = try? JSONEncoder().encode(snapshot) { try? data.write(to: target, options: .atomic) }
        }
        saveWork = work
        DispatchQueue.global(qos: .utility).asyncAfter(deadline: .now() + 0.4, execute: work)
    }

    /// Beispiel-Fortschritt, nur für automatische Screenshots (Startargument -demo YES)
    static func demoState() -> AppState {
        var s = AppState()
        s.planStart = Dates.key(Date().addingTimeInterval(-4 * 86400))
        s.xp = 340
        for d in 0..<3 { s.days[Dates.key(Date().addingTimeInterval(Double(-d) * 86400))] = d == 0 ? 85 : 120 }
        s.lessons["pseudo1"] = LessonProgress(clip: true, quizBest: 88, write: ["0": 86, "1": 100])
        s.lessons["sql1"] = LessonProgress(clip: true, quizBest: 75, write: [:])
        s.lessons["ausbildung"] = LessonProgress(clip: true, quizBest: 40, write: [:])
        for k in ["sql1:3", "sql1:4", "ausbildung:1", "ausbildung:4"] { s.review[k] = ReviewItem(box: 1, due: Date().addingTimeInterval(-60)) }
        return s
    }

    func flush() {
        saveWork?.cancel(); saveWork = nil
        if let data = try? JSONEncoder().encode(state) { try? data.write(to: url, options: .atomic) }
    }

    // MARK: progress
    func progress(_ id: String) -> LessonProgress { state.lessons[id] ?? LessonProgress() }
    func update(_ id: String, _ f: (inout LessonProgress) -> Void) {
        var p = progress(id); f(&p); state.lessons[id] = p; save()
    }

    func gain(_ n: Int) {
        state.xp += n
        let k = Dates.key()
        state.days[k, default: 0] += n
        save()
    }

    var todayXP: Int { state.days[Dates.key()] ?? 0 }

    var streak: Int {
        var n = 0
        var d = Date()
        if state.days[Dates.key(d)] == nil { d = d.addingTimeInterval(-86400) }
        while state.days[Dates.key(d)] != nil { n += 1; d = d.addingTimeInterval(-86400) }
        return n
    }

    func stepsDone(_ l: Lesson) -> [Bool] {
        let p = progress(l.id)
        return [p.clip, p.quizBest >= 0, p.write.count >= l.write.count]
    }

    func isDone(_ l: Lesson) -> Bool { stepsDone(l).allSatisfy { $0 } }

    func lessonPct(_ l: Lesson) -> Int {
        let p = progress(l.id)
        var v = 0.0
        if p.clip { v += 30 }
        if p.quizBest >= 0 { v += 40 * max(0.25, Double(p.quizBest) / 100) }
        v += 30 * min(1, Double(p.write.count) / Double(max(1, l.write.count)))
        return Int(v.rounded())
    }

    func areaPct(_ a: Area) -> Int {
        let ls = Content.shared.lessons(in: a)
        guard !ls.isEmpty else { return 0 }
        return ls.map { lessonPct($0) }.reduce(0, +) / ls.count
    }

    var nextLesson: Lesson? { Content.shared.ordered.first { !isDone($0) } }

    func nextStep(_ l: Lesson) -> Int {
        let d = stepsDone(l)
        if !d[0] { return 0 }
        if !d[1] { return 1 }
        if !d[2] { return 2 }
        return 0
    }

    struct PlanItem: Identifiable { let lesson: Lesson; let date: Date?; var id: String { lesson.id } }

    /// Rechnet jeden Tag neu: offene Lektionen ab heute gleichmäßig bis 15.11. verteilt, erledigte ohne Datum
    var plan: [PlanItem] {
        let cal = Dates.cal
        let today = cal.date(bySettingHour: 12, minute: 0, second: 0, of: Date()) ?? Date()
        let end = max(Dates.planEnd, today)
        let days = max(1, (cal.dateComponents([.day], from: cal.startOfDay(for: today), to: cal.startOfDay(for: end)).day ?? 0) + 1)
        let ls = Content.shared.ordered
        let open = ls.filter { !isDone($0) }
        var dates: [String: Date] = [:]
        for (i, l) in open.enumerated() {
            dates[l.id] = cal.date(byAdding: .day, value: i * days / max(1, open.count), to: today)
        }
        let items = ls.map { PlanItem(lesson: $0, date: dates[$0.id]) }
        return items.sorted { ($0.date ?? .distantPast) < ($1.date ?? .distantPast) }
    }

    var planDays: Int {
        let cal = Dates.cal
        let end = max(Dates.planEnd, Date())
        return max(1, (cal.dateComponents([.day], from: cal.startOfDay(for: Date()), to: cal.startOfDay(for: end)).day ?? 0) + 1)
    }

    var paceText: String {
        let open = Content.shared.ordered.filter { !isDone($0) }.count
        guard open > 0 else { return "Alle Lektionen erledigt." }
        let d = planDays
        if open >= d { return "\(open) Lektionen offen, \(d) Tage bis 15.11.: etwa \(Int((Double(open) / Double(d)).rounded(.up))) pro Tag." }
        let every = d / open
        return "\(open) Lektionen offen, \(d) Tage bis 15.11.: " + (every <= 1 ? "etwa eine pro Tag." : "eine alle \(every) Tage.")
    }

    // MARK: review (Leitner)
    var dueKeys: [String] {
        let now = Date()
        return state.review.filter { $0.value.due <= now && Content.shared.question($0.key) != nil }.map { $0.key }
    }
    var reviewTotal: Int { state.review.keys.filter { Content.shared.question($0) != nil }.count }

    func markWrong(_ key: String) { state.review[key] = ReviewItem(box: 1, due: Date()); save() }
    func markRight(_ key: String) {
        guard let r = state.review[key] else { return }
        let box = r.box + 1
        if box > 3 { state.review.removeValue(forKey: key) }
        else {
            let days: [Double] = [0, 1, 3, 6]
            state.review[key] = ReviewItem(box: box, due: Date().addingTimeInterval(days[box] * 86400))
        }
        save()
    }

    func caseProgress(_ id: String) -> CaseProgress { state.cases?[id] ?? CaseProgress() }
    func updateCase(_ id: String, _ f: (inout CaseProgress) -> Void) {
        var c = caseProgress(id); f(&c)
        if state.cases == nil { state.cases = [:] }
        state.cases?[id] = c; save()
    }
    func caseScore(_ c: ExamCase) -> (points: Int, checked: Bool) {
        let p = caseProgress(c.id)
        var pts = 0
        for t in c.tasks { for s in t.sub {
            let k = "\(t.nr)\(s.id)"
            let cr = p.crit[k] ?? []
            for (i, x) in s.criteria.enumerated() where i < cr.count && cr[i] { pts += x.points }
        } }
        return (pts, !p.shown.isEmpty)
    }

    func writeText(_ key: String) -> String { state.writes[key] ?? "" }
    func setWrite(_ key: String, _ text: String) { state.writes[key] = text; save() }
}

func normalizeAnswer(_ s: String) -> String {
    var t = s.lowercased().filter { !$0.isWhitespace && $0 != "€" && $0 != "%" }
    if t.hasSuffix(".") { t.removeLast() }
    return t
}
