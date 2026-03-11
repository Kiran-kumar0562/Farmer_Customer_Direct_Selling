from django.urls import path
from .views import add_product, farmer_products, update_product, delete_product

urlpatterns = [
    path("add-product/", add_product),
    path("farmer-products/<int:farmer_id>/", farmer_products),
    path("update-product/<int:product_id>/", update_product),
    path("delete-product/<int:product_id>/", delete_product),
]