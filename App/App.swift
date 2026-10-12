import SwiftUI
import AVFoundation

@main
struct AP2CrashkursApp: App {
    @State private var store = AppStore()

    init() {
        // Sprachausgabe auch bei Stummschalter hörbar
        try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(store)
                .tint(.cobalt)
        }
    }
}

extension Color {
    static let cobalt = Color("Cobalt")
    static let marker = Color(red: 1.0, green: 0.88, blue: 0.30)
    static let ink = Color("Ink")
    static func area(_ a: Area) -> Color {
        switch a {
        case .GA1: return Color(red: 0.48, green: 0.25, blue: 0.82)
        case .GA2: return .cobalt
        case .WISO: return Color(red: 0.75, green: 0.36, blue: 0.10)
        }
    }
}

struct AreaTag: View {
    let area: Area
    var body: some View {
        Text(area.title)
            .font(.caption2.weight(.bold))
            .padding(.horizontal, 7).padding(.vertical, 3)
            .background(Color.area(area), in: RoundedRectangle(cornerRadius: 5))
            .foregroundStyle(.white)
    }
}

struct PrioTag: View {
    let lesson: Lesson
    var body: some View {
        Text(lesson.prioLabel)
            .font(.caption.weight(.bold))
            .foregroundStyle(lesson.prio == 1 ? .red : .secondary)
    }
}

struct Pips: View {
    let done: [Bool]
    var body: some View {
        HStack(spacing: 3) {
            ForEach(Array(done.enumerated()), id: \.offset) { _, d in
                Capsule().fill(d ? Color.green : Color.secondary.opacity(0.25)).frame(width: 18, height: 5)
            }
        }
        .accessibilityLabel("\(done.filter { $0 }.count) von 3 Schritten erledigt")
    }
}

struct RootView: View {
    @Environment(AppStore.self) private var store
    @Environment(\.scenePhase) private var phase
    @State private var tab = 0

    var body: some View {
        TabView(selection: $tab) {
            HomeView(tab: $tab)
                .tabItem { Label("Heute", systemImage: "house") }.tag(0)
            TopicsView()
                .tabItem { Label("Themen", systemImage: "list.bullet.rectangle") }.tag(1)
            ReviewView()
                .tabItem { Label("Wiederholen", systemImage: "arrow.counterclockwise") }.tag(2)
                .badge(store.dueKeys.count)
            ExamView()
                .tabItem { Label("Prüfung", systemImage: "timer") }.tag(3)
        }
        .onChange(of: phase) { _, p in if p != .active { store.flush() } }
    }
}
