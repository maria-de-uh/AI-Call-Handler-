# AI-Call-Handler

# AI Call Analyzer

An AI-powered call analysis system built using React, Flask, OpenAI Whisper, and Transformer-based NLP models.

The application can:

* Transcribe audio/video call recordings
* Generate AI summaries
* Detect emotional tone
* Detect spam/scam-related conversations
* Analyze suspicious keywords
* Support audio and MP4 video files

---

# Features

## Audio & Video Transcription

Uses OpenAI Whisper to transcribe:

* MP3
* WAV
* M4A
* MP4
* MPEG
* WEBM

---

## AI Summary Generation

Uses Transformer-based summarization to generate concise summaries of conversations.

---

## Emotion Detection

Uses a Transformer emotion classification model to detect:

* Joy
* Anger
* Fear
* Sadness
* Neutral
* Surprise
* Disgust

---

## Spam / Scam Detection

Analyzes transcripts for:

* Banking fraud phrases
* OTP scams
* Phishing attempts
* Urgency manipulation
* Financial scams
* Aggressive marketing language

Includes:

* Risk Level Detection
* Spam Score
* Detected Suspicious Keywords

---

# Tech Stack

## Frontend

* React
* Axios
* CSS3

## Backend

* Flask
* Flask-CORS
* OpenAI Whisper
* Hugging Face Transformers
* PyTorch

## AI Models

### Speech Recognition

* Whisper Base Model

### Summarization

* T5 Small

### Emotion Detection

* j-hartmann/emotion-english-distilroberta-base

---

# Project Structure

```bash
project/
│
├── backend/
│   ├── app.py
│   ├── spam_keywords.py
│   └── uploads/
│
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   │
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
cd project
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Create virtual environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install flask flask-cors transformers torch
pip install git+https://github.com/openai/whisper.git
```

---

# Install FFmpeg

Whisper requires FFmpeg for audio/video processing.

## Windows

Download:

[https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)

Add the FFmpeg `bin` folder to PATH.

Verify installation:

```bash
ffmpeg -version
```

---

# Run Backend

```bash
python app.py
```

Backend runs on:

```bash
http://127.0.0.1:5000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
npm install axios
```

---

# Run Frontend

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# API Endpoint

## Upload Recording

### Endpoint

```bash
POST /upload
```

### Supported File Types

* MP3
* WAV
* M4A
* MP4
* WEBM

---

# Example API Response

```json
{
  "transcript": "Hello sir your account verification is pending...",

  "summary": "The caller requested urgent account verification.",

  "emotion_analysis": {
    "emotion": "fear",
    "confidence": 96.2
  },

  "spam_analysis": {
    "is_spam": true,
    "risk_level": "HIGH",
    "spam_score": 5,
    "detected_keywords": [
      "otp",
      "verify account",
      "urgent action"
    ]
  }
}
```

---

# UI Features

* Modern glassmorphism dashboard
* Parallel analysis cards
* Responsive layout
* Scrollable transcript viewer
* Pastel dark theme
* Olive green + dark blue palette
* Real-time analysis feedback

---

# Future Improvements

Potential upgrades:

* Real-time microphone transcription
* Speaker diarization
* Live sentiment timeline
* Toxicity detection
* Multi-language support
* PDF report generation
* AI chatbot integration
* Admin dashboard
* Database storage
* Authentication system
* Cloud deployment

---

# Learning Outcomes

This project demonstrates:

* Full-stack AI application development
* Speech-to-text processing
* NLP model integration
* REST API development
* React frontend development
* AI-based fraud detection
* Multimedia processing
* Real-world AI workflow integration

---

# Author

Maria Deepti

---

# License

This project is for educational and learning purposes.
