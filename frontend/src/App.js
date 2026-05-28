import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [file, setFile] = useState(null);

  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");

  const [emotion, setEmotion] = useState("");
  const [confidence, setConfidence] = useState("");

  const [spamData, setSpamData] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTranscript(response.data.transcript);
      setSummary(response.data.summary);

      setEmotion(response.data.emotion_analysis.emotion);
      setConfidence(response.data.emotion_analysis.confidence);

      setSpamData(response.data.spam_analysis);

    } catch (error) {

      console.error(error);
      alert("Upload failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="app">

      <div className="main-container">

        <div className="top-section">

          <div>
            <h1>AI Analyzer</h1>
            <p className="subtitle">
              Whisper • Emotion AI • Spam Detection
            </p>
          </div>

          <div className="upload-box">

            <input
              type="file"
              accept="audio/*,video/*"
              onChange={handleFileChange}
            />

            <button onClick={handleUpload}>
              Analyze Recording
            </button>

          </div>

        </div>

        {loading && (
          <div className="loading-card">
            Processing audio and generating analysis...
          </div>
        )}

        <div className="analysis-grid">

          <div className="card emotion-card">
            <h2>Emotion Analysis</h2>

            {emotion ? (
              <>
                <div className="emotion-text">
                  {emotion}
                </div>

                <p>
                  Confidence: {confidence}%
                </p>
              </>
            ) : (
              <p>No analysis yet</p>
            )}
          </div>

          <div className="card spam-card">
            <h2>Spam Detection</h2>

            {spamData ? (
              <>
                <p>
                  <strong>Spam:</strong>
                  {spamData.is_spam ? " YES" : " NO"}
                </p>

                <p>
                  <strong>Risk Level:</strong>
                  {spamData.risk_level}
                </p>

                <p>
                  <strong>Spam Score:</strong>
                  {spamData.spam_score}
                </p>

                <div className="keyword-box">
                  {spamData.detected_keywords.length > 0 ? (
                    spamData.detected_keywords.map((word, index) => (
                      <span className="keyword" key={index}>
                        {word}
                      </span>
                    ))
                  ) : (
                    <p>No suspicious keywords</p>
                  )}
                </div>
              </>
            ) : (
              <p>No spam analysis yet</p>
            )}
          </div>

        </div>

        <div className="bottom-grid">

          <div className="card summary-card">
            <h2>AI Summary</h2>

            <div className="scroll-box">
              {summary || "Summary will appear here..."}
            </div>
          </div>

          <div className="card transcript-card">
            <h2>Transcript</h2>

            <div className="scroll-box">
              {transcript || "Transcript will appear here..."}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
