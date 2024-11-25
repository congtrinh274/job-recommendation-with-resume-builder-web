from flask import Flask, request, jsonify
import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
sys.path.append('scripts')

from cv_analyzer.app import extract_cv_data_to_csv
from job_recommender.app import recommend_jobs


app = Flask(__name__)

DEFAULT_MODEL_PATH = "D:/Workspace/job-cv-ai/AI-services/models/cv-parser/model-best"
DEFAULT_OUTPUT_CSV_PATH = "D:/Workspace/job-cv-ai/AI-services/data/candidate-cv/extracted_cv_data.csv"

@app.route('/upload_cv', methods=['POST'])
def upload_cv():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.pdf'):
        pdf_path = os.path.join("uploads", file.filename)
        file.save(pdf_path)

        extract_cv_data_to_csv(pdf_path, DEFAULT_MODEL_PATH, DEFAULT_OUTPUT_CSV_PATH)

        recommended_jobs = recommend_jobs("D:\Workspace\job-cv-ai\AI-services\data\candidate-cv\extracted_cv_data.csv", "D:\Workspace\job-cv-ai\AI-services\data\jobs\job_listings.csv")

        return jsonify({
            "recommended_jobs": recommended_jobs
        }), 200
    else:
        return jsonify({"error": "Invalid file type. Only PDF is allowed."}), 400


if __name__ == '__main__':
    app.run(debug=True)
