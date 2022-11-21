from django.urls import path
from . import views

urlpatterns = [
    path('', views.boilerplate, name='boilerplate'),
    path('boilerplate/script.js', views.boilerplate_script, name='boilerplate/script.js'),
    path('boilerplate/style.css', views.boilerplate_style, name='boilerplate/style.css'),
    path('login/', views.login, name='login'),
    path('login/script.js', views.login_script, name='login/script.js'),
    path('login/style.css', views.login_style, name='login/style.js'),
]