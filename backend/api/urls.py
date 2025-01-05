from django.urls import path
from . import views

urlpatterns = [
    path('result/', views.result, name='result'), 
    path('get-questions/', views.get_questions, name='get_questions'), 
]
