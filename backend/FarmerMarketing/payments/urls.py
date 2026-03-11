from django.urls import path
from .views import (make_payment,payment_list,payment_detail,customer_payments,
    farmer_payments,update_payment_status)

urlpatterns = [

    path('pay/', make_payment),
    path('', payment_list),
    path('<int:id>/', payment_detail),
    path('customer/<int:customer_id>/', customer_payments),
    path('farmer/<int:farmer_id>/', farmer_payments),
    path('update/<int:id>/', update_payment_status),

]