from django.urls import path
from . import views

urlpatterns = [

    # Place Order
    path('create/', views.place_order, name='place_order'),
    # View All Orders
    path('', views.order_list, name='order_list'),
    # Customer Orders
    path('customer/', views.customer_orders, name='customer_orders'),
    # Farmer Orders
    path('farmer/', views.farmer_orders, name='farmer_orders'),
    # Update Order Status
    path('update/<int:id>/', views.update_order_status, name='update_order_status'),
    # Cancel Order
    path('delete/<int:id>/', views.cancel_order, name='cancel_order'),

]