from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Job_info
from .serializers import Job_Serializer

# Create your views here.
class JobView(APIView):
    def get(self,request):
        jobs = Job_info.objects.all()
        serializer = Job_Serializer(jobs, many=True)
        return Response({'status': 'success', "jobs":serializer.data}, status=200)  

    def post(self,request):
        serializer = Job_Serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"status": "failure", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

