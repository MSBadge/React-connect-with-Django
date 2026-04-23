from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from school.models import Student
from school.serializers import StudentSerializer


class StudentView(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer