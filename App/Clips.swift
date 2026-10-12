import Foundation

/// String, der in JSON auch als Zahl stehen darf
struct Flex: Codable, Hashable, CustomStringConvertible {
    let s: String
    var description: String { s }
    var number: Double { Double(s.replacingOccurrences(of: ",", with: ".")) ?? 0 }
    init(_ s: String) { self.s = s }
    init(from decoder: Decoder) throws {
        let c = try decoder.singleValueContainer()
        if let i = try? c.decode(Int.self) { s = String(i) }
        else if let d = try? c.decode(Double.self) { s = String(d) }
        else { s = try c.decode(String.self) }
    }
    func encode(to encoder: Encoder) throws { var c = encoder.singleValueContainer(); try c.encode(s) }
}

/// step: Zahl oder "end"
enum Step: Codable, Hashable {
    case n(Int), end
    init(from decoder: Decoder) throws {
        let c = try decoder.singleValueContainer()
        if let i = try? c.decode(Int.self) { self = .n(i) } else { self = .end }
    }
    func encode(to encoder: Encoder) throws {
        var c = encoder.singleValueContainer()
        switch self { case .n(let i): try c.encode(i); case .end: try c.encode("end") }
    }
    func index(_ count: Int) -> Int {
        switch self { case .end: return count - 1; case .n(let i): return max(0, min(count - 1, i)) }
    }
}

struct JoinTable: Codable, Hashable {
    var name: String
    var cols: [String]
    var rows: [[Flex]]
}

struct Visual2: Codable, Hashable {
    var code: String?
    var list: [String]?
    var table: [[String]]?
    var stat: String?
    var sub: String?
    var anim: String?
    var arr: [Int]?
    var target: Int?
    var left: JoinTable?
    var right: JoinTable?
    var on: [Int]?
    var type: String?
    var vars: [String]?
    var rows: [[Flex]]?
    var calls: [String]?
    var returns: [String]?
    var cols: [String]?
    var fn: String?
}

struct Show: Codable, Hashable {
    var lines: [Int]?
    var item: Int?
    var rows: Int?
    var hl: [Int]?
    var step: Step?
}

struct Beat: Codable, Hashable {
    var say: String
    var show: Show?
}

struct Check: Codable, Hashable {
    var q: String
    var o: [String]
    var a: Int
    var e: String
}

struct Scene2: Codable, Hashable {
    var h: String
    var v: Visual2
    var beats: [Beat]
    var check: Check?
}

enum Clips {
    static let all: [String: [Scene2]] = {
        guard let url = Bundle.main.url(forResource: "clips", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let c = try? JSONDecoder().decode([String: [Scene2]].self, from: data) else { return [:] }
        return c
    }()
}

func fnv(_ s: String) -> String {
    var h: UInt32 = 0x811C9DC5
    for u in s.unicodeScalars {
        h ^= u.value
        h = h &* 0x01000193
    }
    return String(format: "%08x", h)
}

// MARK: Simulationen

struct BubbleState { var order: [Int]; var cmp: [Int]?; var swapped: Bool; var sorted: Set<Int>; var end: Bool }

func bubbleSteps(_ arr: [Int]) -> [BubbleState] {
    var items = Array(arr.indices)
    var steps = [BubbleState(order: items, cmp: nil, swapped: false, sorted: [], end: false)]
    var sorted = Set<Int>()
    let n = arr.count
    if n > 1 {
        for i in 0..<(n - 1) {
            for j in 0..<(n - 1 - i) {
                var sw = false
                if arr[items[j]] > arr[items[j + 1]] { items.swapAt(j, j + 1); sw = true }
                steps.append(BubbleState(order: items, cmp: [items[j], items[j + 1]], swapped: sw, sorted: sorted, end: false))
            }
            sorted.insert(items[n - 1 - i])
        }
    }
    steps.append(BubbleState(order: items, cmp: nil, swapped: false, sorted: Set(items), end: true))
    return steps
}

struct BinState { var lo: Int; var hi: Int; var mid: Int?; var found: Bool }

func binSteps(_ arr: [Int], _ t: Int) -> [BinState] {
    var st = [BinState(lo: 0, hi: arr.count - 1, mid: nil, found: false)]
    var lo = 0, hi = arr.count - 1
    while lo <= hi {
        let mid = (lo + hi) / 2
        st.append(BinState(lo: lo, hi: hi, mid: mid, found: false))
        if arr[mid] == t { st.append(BinState(lo: mid, hi: mid, mid: mid, found: true)); break }
        if arr[mid] < t { lo = mid + 1 } else { hi = mid - 1 }
    }
    return st
}
