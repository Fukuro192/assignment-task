from django.urls import path
from . import views
import rest_framework.authtoken.views as auth_views

urlpatterns = [
    path('register/', views.RegisterUser.as_view()),
    path('login/', auth_views.obtain_auth_token),
]