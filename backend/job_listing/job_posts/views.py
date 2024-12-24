from django.shortcuts import render
from django.db.models import F
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from .models import Job_info
from .serializers import Job_Serializer

# Create your views here.
class JobView(APIView):
    def get(self,request):
        jobs = Job_info.objects.all().order_by(F('posted_at').desc(nulls_last=True)) 

        #Handling Pagination:
        paginator = PageNumberPagination()
        paginator.page_size = 15
        paginated_jobs = paginator.paginate_queryset(jobs,request)


        serializer = Job_Serializer(paginated_jobs, many=True)
        return paginator.get_paginated_response({'status': 'success', "jobs":serializer.data})  

    def post(self,request):
        serializer = Job_Serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"status": "failure", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

