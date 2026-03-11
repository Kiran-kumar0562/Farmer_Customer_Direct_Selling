from django.urls import path
from .views import (view_products,product_detail,place_order,customer_orders)

urlpatterns = [

    # View all products
    path('products/', view_products, name='view_products'),

    # View single product
    path('products/<int:id>/', product_detail, name='product_detail'),

    # Place order
    path('place-order/', place_order, name='place_order'),

    # View customer orders
    path('orders/<int:id>/', customer_orders, name='customer_orders'),

]