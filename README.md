# AIROST: Connect - AI-Powered Program Recommendation Platform

## Project Overview

AIROST: Connect is an innovative web application that leverages AI-driven recommendation algorithms to help users discover programs and events tailored to their interests.

### Features

- User Registration and Authentication
- Local Storage-Based Session Management
- Category-Based Interest Selection
- AI-Powered Program Recommendations
- Admin Dashboard for Program Management
- Responsive Design with Tailwind CSS

## Technical Stack

### Frontend
- Vue 3
- Vue Router
- Vuex
- Tailwind CSS

### Backend
- Python
- Flask
- Scikit-learn
- TF-IDF Vectorization
- Cosine Similarity Recommendation Engine

## Setup and Installation

### Frontend Setup
1. Navigate to frontend directory
```bash
cd frontend
npm install
npm run serve
```

### Backend Setup
1. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Run the Flask server
```bash
python app.py
```

## Recommendation Algorithm

The recommendation system uses TF-IDF vectorization and cosine similarity to match user interests with available programs. Key steps include:
- Converting program descriptions to vector representations
- Calculating similarity between user categories and program metadata
- Ranking and returning top matching programs

## Deployment

The application is designed for demonstration purposes with local storage. For production, consider:
- Implementing a proper database
- Adding more robust authentication
- Expanding the recommendation algorithm
- Implementing server-side session management

## Competition Highlights

This implementation demonstrates:
- Comprehensive full-stack development
- AI-driven recommendation mechanism
- Modular and scalable architecture
- User-centric design principles

## License
MIT License
