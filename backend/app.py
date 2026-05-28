from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import os

from transformers import pipeline

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -----------------------------
# LOAD MODELS
# -----------------------------

print("Loading Whisper model...")
model = whisper.load_model("base")
print("Whisper model loaded!")

print("Loading summarizer...")
summarizer = pipeline(
    "summarization",
    model="t5-small"
)
print("Summarizer loaded!")

print("Loading emotion classifier...")
emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=1
)
print("Emotion classifier loaded!")

# -----------------------------
# ROUTE
# -----------------------------

@app.route("/upload", methods=["POST"])
def upload_file():

    try:

        print("Request received")

        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]

        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        filepath = os.path.join(UPLOAD_FOLDER, file.filename)

        file.save(filepath)

        # -----------------------------
        # TRANSCRIPTION
        # -----------------------------

        print("Transcribing audio...")

        result = model.transcribe(filepath)

        transcript = result["text"]

        print("Transcription completed!")

        # -----------------------------
        # SUMMARIZATION
        # -----------------------------

        print("Generating summary...")

        summary_result = summarizer(
            "summarize: " + transcript,
            max_length=80,
            min_length=20,
            do_sample=False
        )

        summary = summary_result[0]["summary_text"]

        # -----------------------------
        # EMOTION ANALYSIS
        # -----------------------------

        print("Analyzing emotion...")

        # limit text length for model stability
        emotion_result = emotion_classifier(transcript[:512])

        emotion = emotion_result[0][0]["label"]
        confidence = round(emotion_result[0][0]["score"] * 100, 2)

        # -----------------------------
        # CLEANUP
        # -----------------------------

        if os.path.exists(filepath):
            os.remove(filepath)

        # -----------------------------
        # RESPONSE
        # -----------------------------

        return jsonify({
            "transcript": transcript,
            "summary": summary,
            "emotion_analysis": {
                "emotion": emotion,
                "confidence": confidence
            }
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


# -----------------------------
# MAIN
# -----------------------------

if __name__ == "__main__":
    app.run(debug=True)