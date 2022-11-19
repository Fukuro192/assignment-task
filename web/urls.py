from django.urls import path
from . import views

urlpatterns = [
    path('', views.boilerplate, name='boilerplate'),
    path('script.js', views.script, name='script.js'),
    path('style.css', views.style, name='style.css'),
]