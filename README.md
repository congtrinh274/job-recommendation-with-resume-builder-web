# JOB RECOMMENDER WITH RESUME BUIDER WEB
### 1. Clone repository
```bash
git clone https://github.com/congtrinh274/job-recommendation-with-resume-builder-web.git job-cv-ai
cd job-cv-ai
```
### 2. Cài đặt module Back-end
```bash
cd back-end
npm install
mkdir uploads
echo. > .env (thêm các biến: MONGO_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, CLIENT_URL, APP_BASE_URL, PORT, JWT_SECRET_KEY, JWT_TOKEN_LIFE)
npm start
```
### 2. Cài đặt module Front-end
```bash
cd front-end
npm install
npm run dev 
```
