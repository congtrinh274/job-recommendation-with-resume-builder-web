from pathlib import Path

# Lấy thư mục gốc của dự án
ROOT_DIR = Path(__file__).resolve().parent

DATA_DIR = ROOT_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)  

JOBS_FILE = DATA_DIR / "jobs" / "jobs.csv"
EXTRACTED_CV_FILE = DATA_DIR / "candidate-cv" / "extracted_cv_data.csv"

