import scrapy
import requests

class JobScraper(scrapy.Spider):
    name = 'jobscraper'
    start_urls = [
        'https://job-search-api.svc.dhigroupinc.com/v1/dice/jobs/search'
    ]

    def start_requests(self):
        headers = {
            'x-api-key': '1YAt0R9wBg4WfsF9VB2778F5CHLAPMVW3WAZcKd8',
        }
        params = {
            'q': 'Software',
            'countryCode2': 'US',
            'radius': '30',
            'radiusUnit': 'mi',
            'page': '1',
            'pageSize': '20',
            'facets': 'employmentType|postedDate|workFromHomeAvailability|workplaceTypes|employerType|easyApply|isRemote|willingToSponsor',
            'filters.workplaceTypes': 'Remote',
            'filters.employmentType': 'CONTRACTS',
            'filters.postedDate': 'ONE',
            'currencyCode': 'USD',
            'fields': 'id|jobId|guid|summary|title|postedDate|modifiedDate|jobLocation.displayName|detailsPageUrl|salary|clientBrandId|companyPageUrl|companyLogoUrl|companyLogoUrlOptimized|positionId|companyName|employmentType|isHighlighted|score|easyApply|employerType|workFromHomeAvailability|workplaceTypes|isRemote|debug|jobMetadata|willingToSponsor',
            'culture': 'en',
            'recommendations': 'true',
            'interactionId': '0',
            'fj': 'true',
            'includeRemote': 'true',
        }

        
        yield scrapy.Request(
            url=self.start_urls[0],
            method='GET',
            headers=headers,
            cb_kwargs={'params': params, 'current_page': 1},
            callback=self.parse,
        )

    def parse(self, response, params, current_page):
        
        if response.status != 200:
            self.log(f"Error fetching page {current_page}: {response.status}")
            return

        
        data = response.json()
        jobs = data.get('data', [])
        total_pages = data.get('meta', {}).get('totalPages', 1)

       
        for job in jobs:
            job_data = {
                'job_id': job.get('id', ''),
                'guid': job.get('guid', ''),
                'summary': job.get('summary', ''),
                'job_title': job.get('title', ''),
                'company': job.get('companyName', ''),
                'location': job.get('jobLocation', {}).get('displayName', ''),
                'location_type': job.get('workplaceTypes', []),
                'salary': job.get('salary', ''),
                'company_logo_url': job.get('companyLogoUrl', ''),
                'company_page_url': job.get('companyPageUrl', ''),
                'details_url': job.get('detailsPageUrl', ''),
                'employment_type': job.get('employmentType', ''),
                'posted_at': job.get('postedDate', ''),
                'updated_at': job.get('modifiedDate', ''),
                'is_remote': job.get('isRemote', False),
                'willing_to_sponsor': job.get('willingToSponsor', False),
                'easy_apply': job.get('easyApply', False),
                'metadata': job.get('jobMetadata', {}),
}

            
            try:
                print(job_data)
                post_response = requests.post(
                    'http://localhost:8000/api/job_posts/',
                    json=job_data
                )
                if post_response.status_code == 201:
                    self.log(f"Successfully posted: {job_data['job_title']}")
                else:
                    self.log(f"Failed to post: {post_response.status_code}, Data: {job_data}")
            except Exception as e:
                self.log(f"Error posting job: {e}")

        #Handling Pagination
        if current_page < total_pages:
            next_page = current_page + 1
            params['page'] = str(next_page)
            yield scrapy.Request(
                url=self.start_urls[0],
                method='GET',
                headers={'x-api-key': '1YAt0R9wBg4WfsF9VB2778F5CHLAPMVW3WAZcKd8'},
                cb_kwargs={'params': params, 'current_page': next_page},
                callback=self.parse,
            )
