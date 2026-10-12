import Foundation

struct Visual: Codable, Hashable {
    var code: String?
    var list: [String]?
    var stat: String?
    var sub: String?
    var table: [[String]]?
    var table2: [[String]]?
}

struct ClipScene: Codable, Hashable {
    var h: String
    var say: String
    var v: Visual
}

struct Video: Codable, Hashable {
    var id: String
    var t: String
    var c: String
    var url: URL { URL(string: "https://www.youtube.com/watch?v=\(id)")! }
}

struct Question: Codable, Hashable, Identifiable {
    var key: String
    var q: String
    var o: [String]?
    var correct: Int?
    var accept: [String]?
    var e: String
    var id: String { key }
    var isInput: Bool { accept != nil }
    var lessonID: String { String(key.split(separator: ":").first ?? "") }
    var correctText: String { isInput ? (accept?.first ?? "") : (o?[correct ?? 0] ?? "") }
}

struct KeyRule: Codable, Hashable {
    var label: String
    var pattern: String
    var flags: String

    func matches(_ text: String) -> Bool {
        var opts: NSRegularExpression.Options = []
        if flags.contains("i") { opts.insert(.caseInsensitive) }
        if flags.contains("s") { opts.insert(.dotMatchesLineSeparators) }
        guard let re = try? NSRegularExpression(pattern: pattern, options: opts) else { return false }
        let range = NSRange(text.startIndex..<text.endIndex, in: text)
        return re.firstMatch(in: text, options: [], range: range) != nil
    }
}

struct WriteTask: Codable, Hashable {
    var task: String
    var model: String
    var alt: String?
    var keys: [KeyRule]
    var isCode: Bool {
        model.contains("\n") && ["SELECT", "funktion", "UPDATE", "{", "——"].contains { model.contains($0) }
    }
}

enum Area: String, Codable, CaseIterable {
    case GA2, GA1, WISO
    var title: String {
        switch self {
        case .GA2: return "GA2 Algorithmen"
        case .GA1: return "GA1 Planen"
        case .WISO: return "WiSo"
        }
    }
}

struct Lesson: Codable, Hashable, Identifiable {
    var id: String
    var area: Area
    var prio: Int
    var title: String
    var mins: Int
    var why: String
    var clip: [ClipScene]
    var videos: [Video]
    var quiz: [Question]
    var write: [WriteTask]

    var prioLabel: String { ["", "Muss", "Wichtig", "Bonus"][min(max(prio, 0), 3)] }
}

struct ContentFile: Codable {
    var order: [String]
    var lessons: [Lesson]
    var bank: [Question]?
}

final class Content {
    static let shared = Content()
    let order: [String]
    let lessons: [Lesson]
    let bank: [Question]
    private let byID: [String: Lesson]
    private let byKey: [String: Question]

    private init() {
        let url = Bundle.main.url(forResource: "lessons", withExtension: "json")!
        let data = try! Data(contentsOf: url)
        let file = try! JSONDecoder().decode(ContentFile.self, from: data)
        order = file.order
        lessons = file.lessons
        byID = Dictionary(uniqueKeysWithValues: file.lessons.map { ($0.id, $0) })
        var k: [String: Question] = [:]
        for l in file.lessons { for q in l.quiz { k[q.key] = q } }
        bank = file.bank ?? []
        for q in bank { k[q.key] = q }
        byKey = k
    }

    func lesson(_ id: String) -> Lesson? { byID[id] }
    func question(_ key: String) -> Question? { byKey[key] }
    var ordered: [Lesson] { order.compactMap { byID[$0] } }
    func lessons(in area: Area) -> [Lesson] {
        ordered.filter { $0.area == area }.sorted { $0.prio < $1.prio }
    }
    func allQuestions(_ areas: [Area]? = nil) -> [Question] {
        let fromLessons = lessons.filter { areas == nil || areas!.contains($0.area) }.flatMap { $0.quiz }
        let withBank = areas == nil || areas!.contains(.WISO)
        return fromLessons + (withBank ? bank : [])
    }
}


// MARK: Prüfungsfälle

struct CaseMaterial: Codable, Hashable {
    var title: String?
    var code: String?
    var table: [[Flex]]?
}

struct Criterion: Codable, Hashable {
    var text: String
    var points: Int
}

struct CaseSub: Codable, Hashable {
    var id: String
    var points: Int
    var q: String
    var material: CaseMaterial?
    var kind: String?
    var model: String
    var criteria: [Criterion]
}

struct CaseTask: Codable, Hashable {
    var nr: Int
    var title: String
    var points: Int
    var intro: String?
    var sub: [CaseSub]
}

struct ExamCase: Codable, Hashable, Identifiable {
    var id: String
    var area: Area
    var title: String
    var minutes: Int
    var scenario: String
    var material: [CaseMaterial]?
    var tasks: [CaseTask]
}

struct BelegSection: Codable, Hashable {
    var title: String
    var code: String
}

enum ExtraContent {
    static let cases: [ExamCase] = load("cases") ?? []
    static let beleg: [BelegSection] = load("belegsatz") ?? []
    private static func load<T: Decodable>(_ name: String) -> T? {
        guard let url = Bundle.main.url(forResource: name, withExtension: "json"),
              let data = try? Data(contentsOf: url) else { return nil }
        return try? JSONDecoder().decode(T.self, from: data)
    }
}

func ihkGrade(_ p: Int) -> Int { p >= 92 ? 1 : p >= 81 ? 2 : p >= 67 ? 3 : p >= 50 ? 4 : p >= 30 ? 5 : 6 }
