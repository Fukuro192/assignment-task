from django.urls import path
from . import views

urlpatterns = [
    path('', views.boilerplate, name='boilerplate')
]