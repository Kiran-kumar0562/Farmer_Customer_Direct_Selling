from django.urls import path
from .views import (add_product,product_list,product_detail,update_product,
                    delete_product,farmer_products)

urlpatterns = [

    path('add/', add_product),
    path('', product_list),
    path('<int:id>/', product_detail),
    path('update/<int:id>/', update_product),
    path('delete/<int:id>/', delete_product),
    path('farmer/<int:farmer_id>/', farmer_products),

]