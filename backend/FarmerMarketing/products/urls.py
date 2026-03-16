from django.urls import path
from . import views

urlpatterns = [
    
    path('', views.product_list),
    path('add/', views.add_product),
    path('<int:id>/', views.product_detail),
    path('update/<int:id>/', views.update_product),
    path('delete/<int:id>/', views.delete_product),
    path('farmer/<int:farmer_id>/', views.farmer_products),

]