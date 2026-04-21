from django.urls import path
from .views import PlaceOrderView, OrderHistoryView

urlpatterns = [
    path("place/", PlaceOrderView.as_view()),
    path("history/", OrderHistoryView.as_view()),
]