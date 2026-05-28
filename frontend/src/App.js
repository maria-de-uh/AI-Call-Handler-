
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [file, setFile] = useState(null);

  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");

  const [emotion, setEmotion] = useState("");
  const [confidence, setConfidence] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please upload an audio file");
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

    } catch (error) {

      console.error(error);
      alert("Error uploading file");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="app">

      <div className="container">

        <h1>AI Voice Analyzer</h1>

        <p className="subtitle">
          Whisper + NLP Emotion Detection
        </p>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />

        <button onClick={handleUpload}>
          Analyze Audio
        </button>

        {loading && (
          <div className="loading">
            Processing Audio...
          </div>
        )}

        {emotion && (
          <div className="card emotion-card">
            <h2>Detected Emotion</h2>

            <p className="emotion">
              {emotion.toUpperCase()}
            </p>

            <p>
              Confidence: {confidence}%
            </p>
          </div>
        )}
        {transcript && (
          <div className="card">
            <h2>Transcript</h2>
            <p>{transcript}</p>
          </div>
        )}

        {summary && (
          <div className="card">
            <h2>Summary</h2>
            <p>{summary}</p>
          </div>
        )}

        

      </div>

    </div>
  );
}

export default App;
