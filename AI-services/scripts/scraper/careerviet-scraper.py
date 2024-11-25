import requests # type: ignore
from bs4 import BeautifulSoup # type: ignore
import csv
import os

def scrape_jobs(base_urls, num_pages_to_scrape=2, output_filename='D:\Workspace\job-cv-ai\AI-services\data\jobs\job_listings.csv'):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    jobs = []

    for base_url in base_urls:
        # Lặp qua các trang từ 1 đến num_pages_to_scrape
        for page in range(1, num_pages_to_scrape + 1):
            response = requests.get(base_url.format(page), headers=headers)

            if response.status_code != 200:
                print(f"Không thể truy cập trang web {base_url}, mã trạng thái: {response.status_code}")
                break

            soup = BeautifulSoup(response.content, 'html.parser')

            job_listings = soup.find_all('div', class_='job-item')

            if not job_listings:
                print(f"Không còn công việc nào để lấy từ {base_url}.")
                break

            for job in job_listings:
                title = job.find('div', class_='title').text.strip() if job.find('div', class_='title') else 'Không có tiêu đề'
                company = job.find('a', class_='company-name').text.strip() if job.find('a', class_='company-name') else 'Không có công ty'
                salary = job.find('div', class_='salary').text.strip() if job.find('div', class_='salary') else 'Không có lương'
                location = job.find('div', class_='location').text.strip() if job.find('div', class_='location') else 'Không có địa điểm'
                expireDate = job.find('div', class_='expire-date').text.strip() if job.find('div', class_='expire-date') else 'Không có thời hạn'
                
                job_link = job.find('a', class_='job_link')['href'] if job.find('a', class_='job_link') else None
                
                if job_link:
                    detail_response = requests.get(job_link, headers=headers)
                    if detail_response.status_code == 200:
                        detail_soup = BeautifulSoup(detail_response.content, 'html.parser')
                        
                        detail_rows = detail_soup.find_all('div', class_='detail-row')
                        filtered_rows = []

                        for div in detail_rows:
                            h2_tag = div.find(['h3', 'h2'])
                            if h2_tag and 'Yêu Cầu Công Việc' in h2_tag.text:
                                filtered_rows.append(div)

                        project_description = []
                        
                        for row in filtered_rows:
                            items = row.find_all('li')
                            for item in items:
                                project_description.append(item.text.strip())

                        project_description = '; '.join(project_description) if project_description else 'Không có mô tả'

                    else:
                        project_description = 'Không thể truy cập mô tả'

                else:
                    project_description = 'Không có link chi tiết'

                jobs.append([title, company, salary, location, expireDate, job_link, project_description])

    os.makedirs(os.path.dirname(output_filename), exist_ok=True)

    with open(output_filename, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Title', 'Company', 'Salary', 'Location', 'ExpireDate', 'Link', 'ProjectDescription'])
        writer.writerows(jobs)

    print("Dữ liệu công việc đã được lưu thành công vào file CSV.")

base_urls = [
    'https://careerviet.vn/viec-lam/cntt-phan-mem-c1-vi.html?page={}',
]
scrape_jobs(base_urls, num_pages_to_scrape=2)
