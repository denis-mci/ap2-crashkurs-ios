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

    struct PlanItem: Identifiable { let lesson: Lesson; let date: Date; var id: String { lesson.id } }

    var plan: [PlanItem] {
        let start = Dates.parse(state.planStart ?? Dates.key()) ?? Date()
        let span = max(1, Dates.planEnd.timeIntervalSince(start) / 86400)
        let ls = Content.shared.ordered
        return ls.enumerated().map { i, l in
            PlanItem(lesson: l, date: start.addingTimeInterval(floor(Double(i) * span / Double(ls.count)) * 86400 + 12 * 3600))
        }
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

    func writeText(_ key: String) -> String { state.writes[key] ?? "" }
    func setWrite(_ key: String, _ text: String) { state.writes[key] = text; save() }
}

func normalizeAnswer(_ s: String) -> String {
    var t = s.lowercased().filter { !$0.isWhitespace && $0 != "€" && $0 != "%" }
    if t.hasSuffix(".") { t.removeLast() }
    return t
}
