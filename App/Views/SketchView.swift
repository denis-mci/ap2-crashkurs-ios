import SwiftUI
import PencilKit
import UIKit

/// Speichert Zeichnungen pro Aufgabe als PKDrawing-Daten
enum SketchStore {
    static var dir: URL {
        let d = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0].appendingPathComponent("sketches")
        try? FileManager.default.createDirectory(at: d, withIntermediateDirectories: true)
        return d
    }
    static func url(_ key: String) -> URL {
        let safe = key.replacingOccurrences(of: ":", with: "_").replacingOccurrences(of: "/", with: "_")
        return dir.appendingPathComponent(safe + ".drawing")
    }
    static func load(_ key: String) -> PKDrawing {
        guard let d = try? Data(contentsOf: url(key)), let dr = try? PKDrawing(data: d) else { return PKDrawing() }
        return dr
    }
    static func save(_ drawing: PKDrawing, _ key: String) {
        try? drawing.dataRepresentation().write(to: url(key), options: .atomic)
    }
}

enum SketchTool: String, CaseIterable { case pen = "Stift", thin = "Fein", eraser = "Radierer" }

struct PKCanvas: UIViewRepresentable {
    let key: String
    @Binding var tool: SketchTool
    @Binding var clearToken: Int
    @Binding var undoToken: Int

    func makeCoordinator() -> Coordinator { Coordinator(key: key) }

    func makeUIView(context: Context) -> PKCanvasView {
        let v = PKCanvasView()
        v.drawingPolicy = .anyInput
        v.backgroundColor = .white
        v.isOpaque = true
        v.overrideUserInterfaceStyle = .light
        v.drawing = SketchStore.load(key)
        v.delegate = context.coordinator
        v.tool = PKInkingTool(.pen, color: .black, width: 3)
        v.alwaysBounceVertical = false
        v.isScrollEnabled = false
        return v
    }

    func updateUIView(_ v: PKCanvasView, context: Context) {
        switch tool {
        case .pen: v.tool = PKInkingTool(.pen, color: .black, width: 3)
        case .thin: v.tool = PKInkingTool(.pen, color: .black, width: 1.2)
        case .eraser: v.tool = PKEraserTool(.vector)
        }
        if context.coordinator.lastClear != clearToken {
            context.coordinator.lastClear = clearToken
            v.drawing = PKDrawing()
            SketchStore.save(v.drawing, key)
        }
        if context.coordinator.lastUndo != undoToken {
            context.coordinator.lastUndo = undoToken
            var d = v.drawing
            if !d.strokes.isEmpty { d.strokes.removeLast(); v.drawing = d; SketchStore.save(d, key) }
        }
    }

    final class Coordinator: NSObject, PKCanvasViewDelegate {
        let key: String
        var lastClear = 0
        var lastUndo = 0
        private var work: DispatchWorkItem?
        init(key: String) { self.key = key }
        func canvasViewDrawingDidChange(_ canvasView: PKCanvasView) {
            work?.cancel()
            let d = canvasView.drawing
            let k = key
            let w = DispatchWorkItem { SketchStore.save(d, k) }
            work = w
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.6, execute: w)
        }
    }
}

struct SketchView: View {
    let key: String
    @State private var tool: SketchTool = .pen
    @State private var clearToken = 0
    @State private var undoToken = 0
    @State private var confirmClear = false

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 6) {
                ForEach(SketchTool.allCases, id: \.self) { t in
                    Button(t.rawValue) { tool = t }
                        .font(.subheadline.weight(.semibold))
                        .padding(.horizontal, 12).padding(.vertical, 6)
                        .background(tool == t ? Color.primary : Color(.tertiarySystemFill), in: Capsule())
                        .foregroundStyle(tool == t ? Color(.systemBackground) : Color.primary)
                }
                Spacer()
                Button { undoToken += 1 } label: { Image(systemName: "arrow.uturn.backward") }
                    .accessibilityLabel("Letzten Strich entfernen")
                Button { confirmClear = true } label: { Image(systemName: "trash") }
                    .accessibilityLabel("Zeichnung leeren")
            }
            GeometryReader { g in
                PKCanvas(key: key, tool: $tool, clearToken: $clearToken, undoToken: $undoToken)
                    .frame(width: g.size.width, height: g.size.width * 1.1)
            }
            .aspectRatio(1 / 1.1, contentMode: .fit)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.secondary.opacity(0.3), lineWidth: 2))
            Text("Mit Finger oder Apple Pencil zeichnen. Auf Papier geht es genauso, danach mit der Musterlösung vergleichen.")
                .font(.caption).foregroundStyle(.secondary)
        }
        .confirmationDialog("Zeichnung leeren?", isPresented: $confirmClear, titleVisibility: .visible) {
            Button("Leeren", role: .destructive) { clearToken += 1 }
        }
    }
}

struct DiagramImage: View {
    let id: String
    var crowFoot = false
    @State private var zoom = false

    var body: some View {
        if let img = UIImage(named: id) {
            VStack(alignment: .leading, spacing: 6) {
                Image(uiImage: img)
                    .resizable().scaledToFit()
                    .background(Color.white)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.secondary.opacity(0.3)))
                    .onTapGesture { zoom = true }
                    .accessibilityLabel("Gezeichnete Musterlösung")
                Text("Gezeichnete Musterlösung" + (crowFoot ? " (Krähenfuß-Notation; Chen-Notation ist genauso richtig)" : "") + ". Antippen zum Vergrößern.")
                    .font(.caption).foregroundStyle(.secondary)
            }
            .sheet(isPresented: $zoom) {
                NavigationStack {
                    ScrollView([.horizontal, .vertical]) {
                        Image(uiImage: img).resizable().scaledToFit()
                            .frame(width: max(img.size.width / 1.3, 400))
                            .background(Color.white)
                    }
                    .background(Color.white)
                    .toolbar { ToolbarItem(placement: .confirmationAction) { Button("Fertig") { zoom = false } } }
                    .navigationTitle("Musterlösung")
                    .navigationBarTitleDisplayMode(.inline)
                }
            }
        }
    }
}
