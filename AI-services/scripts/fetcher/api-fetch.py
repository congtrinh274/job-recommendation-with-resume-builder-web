import requests # type: ignore
import csv
import json

def fetch_job_data(api_config, csv_file='D:\Workspace\job-cv-ai\AI-services\data\jobs\job_listings.csv'):
    with open(csv_file, "a", newline='', encoding="utf-8") as file:
        writer = csv.writer(file)
        
        if file.tell() == 0:
            writer.writerow(["Job Title", "Company", "Salary", "Location", "Expire Date", "Link", "Description"])

        for config in api_config:
            app_id = config['app_id']
            api_key = config['api_key']
            country = config['country']
            category = config['category']
            url = config['url'].format(country=country, app_id=app_id, api_key=api_key, category=category)

            response = requests.get(url)

            if response.status_code == 200:
                data = response.json()

                for job in data["results"]:
                    job_title = job.get("title", "No title")
                    company = job.get("company", {}).get("display_name", "No company")
                    salary = job.get("salary_min", "No information")
                    location = job.get("location", {}).get("display_name", "No location")
                    expire_date = job.get("expire_date", "No information")
                    link = job.get("redirect_url", "No information")
                    description = job.get("description", "No description")

                    writer.writerow([job_title, company, salary, location, expire_date, link, description])
                print(f"Data from {config['name']} has been appended to {csv_file}")
            else:
                print(f"Failed to retrieve data from {config['name']}: {response.status_code}")

if __name__ == "__main__":
    with open('D:\Workspace\job-cv-ai\AI-services\config.json') as config_file:
        config = json.load(config_file)

    api_config = [
        {
            "name": "Adzuna",
            "app_id": config['app_id'],
            "api_key": config['api_key'],
            "country": "us",
            "category": "it-jobs",
            "url": "https://api.adzuna.com/v1/api/jobs/{country}/search/1?app_id={app_id}&app_key={api_key}&category={category}&results_per_page=10&content-type=application/json"
        },
        
    ]

    fetch_job_data(api_config)
