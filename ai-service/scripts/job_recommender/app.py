import pandas as pd
import nltk
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

    finalsent = ' '.join(temp_sent) 
    finalsent = finalsent.replace("n't", " not") 
    finalsent = finalsent.replace("'m", " am") 
    finalsent = finalsent.replace("'s", " is") 
    finalsent = finalsent.replace("'re", " are") 
    finalsent = finalsent.replace("'ll", " will") 
    finalsent = finalsent.replace("'ve", " have") 
    finalsent = finalsent.replace("'d", " would") 
    
    return finalsent 


def recommend_jobs(cv_file, job_file):
    job_data = pd.read_csv(job_file)
    cv_data = pd.read_csv(cv_file)
    
    cv_data = cv_data.rename(columns={"Name": "Link", "Skills": "Description"})
    merged_df = pd.concat([job_data, cv_data], ignore_index=True)

    merged_df["Desc proc"] = merged_df["Description"].apply(preprocess_data)
    final_data = merged_df[["Link", "Desc proc"]]

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(final_data['Desc proc'])
    cosine_sim = cosine_similarity(tfidf_matrix)
    print(cosine_sim)

    candidate_index = final_data.index[-1]
    similar_jobs = list(enumerate(cosine_sim[candidate_index]))

    sorted_similar_jobs = sorted(similar_jobs, key=lambda x: x[1], reverse=True)

    recommended_jobs = []
    for job in sorted_similar_jobs[1:6]:
        job_index = job[0]
        recommended_jobs.append({
            "Title": merged_df.iloc[job_index].get("Title", "N/A"),
            "Company": merged_df.iloc[job_index].get("Company", "N/A"),
            "Salary": merged_df.iloc[job_index].get("Salary", "N/A"),
            "Location": merged_df.iloc[job_index].get("Location", "N/A"),
            "ExpireDate": merged_df.iloc[job_index].get("ExpireDate", "N/A"),
            "Link": merged_df.iloc[job_index]["Link"]
        })
    
    return recommended_jobs  
