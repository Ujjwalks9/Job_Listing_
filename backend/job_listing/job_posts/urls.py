from django.urls import path
from .views import JobView

urlpatterns = [
    path('job_posts/', JobView.as_view(), name = 'job_list')
]