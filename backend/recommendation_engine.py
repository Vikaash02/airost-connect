# backend/recommendation_engine.py
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class ProgramRecommender:
    def __init__(self):
        self.programs = []
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def add_program(self, program):
        """
        Add a new program to the recommendation system
        
        :param program: Dictionary containing program details
        """
        self.programs.append(program)

    def generate_recommendations(self, user_categories, top_n=5):
        """
        Generate program recommendations based on user categories
        
        :param user_categories: List of user's selected categories
        :param top_n: Number of recommendations to return
        :return: List of recommended programs
        """
        if not self.programs:
            return []

        # Create feature matrix based on program descriptions and categories
        descriptions = [
            f"{p.get('name', '')} {p.get('category', '')} {p.get('notes', '')}" 
            for p in self.programs
        ]
        
        # Convert descriptions to TF-IDF matrix
        tfidf_matrix = self.vectorizer.fit_transform(descriptions)
        
        # Match user categories
        category_matches = [
            p for p in self.programs 
            if p.get('category') in user_categories
        ]
        
        return category_matches[:top_n]
