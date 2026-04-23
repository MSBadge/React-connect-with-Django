from django.urls import path, include
from rest_framework import routers
from school.views import StudentView

router = routers.DefaultRouter()
router.register(r'student',StudentView)

urlpatterns = [
    path('',include(router.urls))
]