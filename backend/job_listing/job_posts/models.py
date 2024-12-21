
from django.db import models

class Job_info(models.Model):
    job_id = models.CharField(max_length=255, help_text="Unique ID of the job", default='default_job_id')
    guid = models.CharField(max_length=255, blank=True, null=True, help_text="GUID for the job")
    summary = models.TextField(blank=True, help_text="Short summary of the job")
    job_title = models.CharField(max_length=255, help_text="Title of the job")
    company = models.CharField(max_length=255, help_text="Name of the company")
    location = models.CharField(max_length=255, help_text="Job location")
    location_type = models.JSONField(
        default=list,
        help_text="List of location types (e.g., ['remote', 'on-site'])"
    )
    salary = models.CharField(max_length=255, blank=True, help_text="Salary information")
    company_logo_url = models.URLField(blank=True, help_text="URL to the company logo")
    company_page_url = models.URLField(blank=True, help_text="URL to the company's page")
    # details_url = models.TextField(help_text="URL to the job details page")
    employment_type = models.CharField(max_length=255, help_text="Type of employment (e.g., Full-time, Contract)")
    posted_at = models.DateTimeField(blank=True, null=True, help_text="Date when the job was posted")
    updated_at = models.DateTimeField(blank=True, null=True, help_text="Date when the job was last updated")
    is_remote = models.BooleanField(default=False, help_text="Indicates if the job is remote")
    willing_to_sponsor = models.BooleanField(default=False, help_text="Indicates if the company is willing to sponsor")
    easy_apply = models.BooleanField(default=False, help_text="Indicates if the job has an easy apply option")
    metadata = models.JSONField(default=dict, help_text="Additional metadata for the job")

    def __str__(self):
        return self.job_title
