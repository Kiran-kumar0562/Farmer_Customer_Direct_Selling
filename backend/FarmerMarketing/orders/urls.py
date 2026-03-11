from django.urls import path
from .views import ( place_order,order_list,customer_orders,
    farmer_orders,update_order_status,cancel_order)

urlpatterns = [

    path('place/', place_order),
    path('', order_list),
    path('customer/<int:customer_id>/', customer_orders),
    path('farmer/<int:farmer_id>/', farmer_orders),
    path('update/<int:id>/', update_order_status),
    path('cancel/<int:id>/', cancel_order),

]