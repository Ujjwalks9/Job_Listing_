from rest_framework import serializers
from .models import Job_info

class Job_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Job_info
        fields = '__all__'

    