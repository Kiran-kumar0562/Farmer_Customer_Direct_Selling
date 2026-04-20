# accounts/urls.py
from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # login
    TokenRefreshView      # refresh token
)
from . import views

urlpatterns = [
    # Registration endpoint
    path('register/', views.RegisterView.as_view(), name='register'),

    # JWT login endpoint
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # JWT refresh token endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Get current logged-in user info
    path('me/', views.UserDetailView.as_view(), name='user_detail'),

    path('login/', views.LoginView.as_view()), 

    path('profile/', views.ProfileView.as_view()),
    # Optional: logout endpoint (handled via frontend token delete)
    path('logout/', views.LogoutView.as_view(), name='logout'),
]