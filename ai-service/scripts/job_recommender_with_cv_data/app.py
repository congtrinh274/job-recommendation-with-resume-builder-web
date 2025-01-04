import pandas as pd
import requests
import nltk
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('stopwords')

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
VERB_CODES = {'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'}

def preprocess_data(text):
    if not isinstance(text, str):
        return ""

    text = text.lower()
    temp_sent = []
    words = nltk.word_tokenize(text)
    tags = nltk.pos_tag(words)

    for i, word in enumerate(words):
        if tags[i][1] in VERB_CODES:
            lemmatized = lemmatizer.lemmatize(word, 'v')
        else:
            lemmatized = lemmatizer.lemmatize(word)
        if lemmatized not in stop_words and lemmatized.isalpha():
            temp_sent.append(lemmatized)

    final_sent = ' '.join(temp_sent)
    final_sent = final_sent.replace("n't", " not")
    final_sent = final_sent.replace("'m", " am")
    final_sent = final_sent.replace("'s", " is")
    final_sent = final_sent.replace("'re", " are")
    final_sent = final_sent.replace("'ll", " will")
    final_sent = final_sent.replace("'ve", " have")
    final_sent = final_sent.replace("'d", " would")

    return final_sent


def fetch_jobs_from_api(api_url):
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        jobs = response.json()
        return jobs
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from API: {e}")
        return []

def prepare_cv_description(cv_data):
    skills = ", ".join([skill['name'] for skill in cv_data.get('skills', [])])
    experiences = ". ".join([
        f"{exp['title']} tại {exp['companyName']} từ {exp['startDate']} đến {exp.get('endDate', 'hiện tại')}. {exp['workSummery']}"
        for exp in cv_data.get('experience', [])
    ])
    education = ". ".join([
        f"{edu['degree']} ngành {edu['major']} tại {edu['universityName']} từ {edu['startDate']} đến {edu['endDate']}. {edu['description']}"
        for edu in cv_data.get('education', [])
    ])
    summary = cv_data.get('summery', '')
    
    description = f"Kỹ năng: {skills}. Kinh nghiệm: {experiences}. Giáo dục: {education}. Tóm tắt: {summary}"
    return description

def clean_html(html_content):
    if not isinstance(html_content, str):
        return ""
    soup = BeautifulSoup(html_content, "html.parser")
    return soup.get_text(separator=" ").strip()

def prepare_job_description(job_data):
    description = job_data.get('description', '')
    requirements = job_data.get('requirements', '')
    skills = job_data.get('skills', '')

    description_clean = clean_html(description)
    requirements_clean = clean_html(requirements)
    skills_clean = clean_html(skills)

    combined_description = f"Kỹ năng: {skills_clean}. Yêu cầu công việc: {requirements_clean}. Mô tả: {description_clean}."
    return combined_description


def recommend_jobs_with_cv_data(cv_data):
    cv_data = pd.DataFrame([{
        "Link": None,
        "Description": prepare_cv_description(cv_data)
    }])

    job_api_urls =  "http://localhost:5000/api/jobs"
    job_data_list = []
    job_data_list.extend(fetch_jobs_from_api(job_api_urls))

    job_data = pd.DataFrame(job_data_list)
    job_data['Description'] = job_data.apply(lambda row: prepare_job_description(row), axis=1)
    job_data.to_csv('job_data_list.csv', index=False, encoding='utf-8')

    merged_df = pd.concat([job_data, cv_data], ignore_index=True)

    merged_df["Desc proc"] = merged_df["Description"].apply(preprocess_data)
    final_data = merged_df[["Link", "Desc proc"]]
    merged_df.to_csv('final_data.csv', index=False, encoding='utf-8')

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(final_data['Desc proc'])
    cosine_sim = cosine_similarity(tfidf_matrix)

    candidate_index = final_data.index[-1]
    similar_jobs = list(enumerate(cosine_sim[candidate_index]))
    sorted_similar_jobs = sorted(similar_jobs, key=lambda x: x[1], reverse=True)

    candidate_index = final_data.index[-1]
    similar_jobs = list(enumerate(cosine_sim[candidate_index]))

    sorted_similar_jobs = sorted(similar_jobs, key=lambda x: x[1], reverse=True)

    recommended_jobs = []
    for job in sorted_similar_jobs[1:11]:
        print(job)
        job_index = job[0]
        recommended_jobs.append({
            "id": merged_df.iloc[job_index].get("_id", "N/A"),
            "recruiterId": merged_df.iloc[job_index].get("recruiterId", "N/A"),
            "title": merged_df.iloc[job_index].get("title", "N/A"),
            "level": merged_df.iloc[job_index].get("level", "N/A"),
            "description": merged_df.iloc[job_index].get("description", "N/A"),
            "requirements": merged_df.iloc[job_index].get("requirements", "N/A"),
            "skills": merged_df.iloc[job_index].get("skills", "N/A"),
            "location": merged_df.iloc[job_index]["location"],
            "salary": merged_df.iloc[job_index].get("salary", "N/A"),
            "expiredDate": merged_df.iloc[job_index].get("expiredDate", "N/A"),
        })

    return recommended_jobs


