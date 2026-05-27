import Vision
import CoreImage
import Foundation

let args = CommandLine.arguments
guard args.count > 1 else {
    print("Usage: swift ocr_page.swift <image_path>")
    exit(1)
}

let imagePath = args[1]
let url = URL(fileURLWithPath: imagePath)
guard let ciImage = CIImage(contentsOf: url) else {
    print("ERROR: Could not load image")
    exit(1)
}

let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.usesLanguageCorrection = true

let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])
do {
    try handler.perform([request])
} catch {
    print("ERROR: \(error)")
    exit(1)
}

guard let observations = request.results else {
    print("No results")
    exit(0)
}

for obs in observations {
    if let top = obs.topCandidates(1).first {
        print(top.string)
    }
}
