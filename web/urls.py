from django.urls import path
from . import views

urlpatterns = [
    path('', views.boilerplate, name='boilerplate'),
    path('script.js', views.script, name='script.js'),
    path('style.css', views.style, name='style.css'),
    path('login/', views.login, name='login'),
    path('login/script.js', views.login_script, name='login/script.js'),
    path('login/style.css', views.login_style, name='login/style.js'),
]