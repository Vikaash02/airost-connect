from flask import Flask, request, jsonify
from flask_cors import CORS
from recommendation_engine import ProgramRecommender

app = Flask(__name__)
CORS(app)  # Ensures that the frontend can communicate with the backend

recommender = ProgramRecommender()

@app.route('/add_program', methods=['POST'])
def add_program():
    """
    Endpoint to add a new program to the recommendation system
    """
    program_data = request.json
    recommender.add_program(program_data)
    return jsonify({"status": "success", "message": "Program added"}), 200

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    """
    Endpoint to get program recommendations based on user categories
    """
    user_categories = request.json.get('categories', [])
    recommendations = recommender.generate_recommendations(user_categories)
    return jsonify(recommendations), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
