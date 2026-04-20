from django.urls import path
from .views import *

urlpatterns = [
    path('', ProductListView.as_view()),
    path('<int:id>/', ProductDetailView.as_view()),
    path('add/', AddProductView.as_view()),
    path('update/<int:id>/', UpdateProductView.as_view()),
    path('delete/<int:id>/', DeleteProductView.as_view()),
    path('farmer/<int:farmer_id>/', FarmerProductsView.as_view()),
]