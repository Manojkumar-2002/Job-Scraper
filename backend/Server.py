from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS
import traceback

app = Flask(__name__)
CORS(app)

@app.route('/find_jobs', methods=['GET'])
def find_jobs():
    skill = request.args.get('skill')
    
    # Perform web scraping to fetch job results
    try:
        job_results = fetch_job_results(skill)
        return jsonify(job_results)
    except Exception as e:
        traceback.print_exc()  # Print traceback to console for debugging
        return jsonify({"error": str(e)}), 500  # Return error message with status code 500

def fetch_job_results(skill):
    job_results = []

    try:
        # Perform web scraping on the TimesJobs website
        url = f"https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&txtKeywords={skill}&txtLocation="
        response = requests.get(url, timeout=10)  # Timeout set to 10 seconds
        response.raise_for_status()  # Raise HTTPError for bad responses

        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all job listings on the page
        job_listings = soup.find_all('li', class_="clearfix job-bx wht-shd-bx")

        # Loop through each job listing and extract relevant information
        for job in job_listings:
            job_data = {
                "job_name": job.header.h2.a.text.strip(),
                "company_name": job.find('h3', class_="joblist-comp-name").text.strip(),
                "skills": job.find('span', class_='srp-skills').text.strip(),
                "location": job.ul.find_all('li')[1].span.text.strip(),
                "posted_date": job.find('span', class_="sim-posted").span.text.strip(),
                "more_info_link": job.header.h2.a['href']
            }
            job_results.append(job_data)

    except requests.exceptions.RequestException as e:
        # Handle network errors, timeouts, etc.
        traceback.print_exc()  # Print traceback to console for debugging
        raise RuntimeError(f"Error fetching job results: {e}")

    except Exception as ex:
        # Handle any other unexpected errors
        traceback.print_exc()  # Print traceback to console for debugging
        raise RuntimeError(f"Unexpected error: {ex}")

    return job_results

if __name__ == '__main__':
    app.run(debug=True)
