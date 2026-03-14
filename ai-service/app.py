from flask import Flask, request, jsonify
import os
import sys
from flask_cors import CORS
import pandas as pd
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
sys.path.append('scripts')

from paths import ROOT_DIR, EXTRACTED_CV_FILE, JOBS_FILE

from cv_analyzer.app import extract_cv_data_to_csv
from job_recommender_with_uploadCV.app import recommend_jobs_with_upload_cv
from job_recommender_with_cv_data.app import recommend_jobs_with_cv_data


app = Flask(__name__)
CORS(app)


DEFAULT_MODEL_PATH = ROOT_DIR / "models/cv-parser/model-best"
DEFAULT_OUTPUT_CSV_PATH = ROOT_DIR / "data/candidate-cv/extracted_cv_data.csv"

@app.route('/get_jobs_wucv', methods=['POST'])
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

        recommended_jobs = recommend_jobs_with_upload_cv(EXTRACTED_CV_FILE)

        recommended_jobs = pd.DataFrame(recommended_jobs).fillna("").to_dict(orient="records")

        return jsonify({
            "recommended_jobs": recommended_jobs
        }), 200
    else:
        return jsonify({"error": "Invalid file type. Only PDF is allowed."}), 400

@app.route('/get-jobs-wcvdata', methods=['POST'])
def get_jobs_wcvdata(): 
    cv_data = request.json
    if not cv_data:
        return jsonify({"error": "No CV data provided"}), 400
    
    recommended_jobs = recommend_jobs_with_cv_data(cv_data)

    return jsonify({
        "recommended_jobs": recommended_jobs
    }), 200



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
