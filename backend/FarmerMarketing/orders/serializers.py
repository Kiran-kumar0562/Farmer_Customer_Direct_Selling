from rest_framework import serializers
from .models import Order
from products.serializers import ProductSerializer

class OrderSerializer(serializers.ModelSerializer):
    # Automatically assign the customer who is logged in
    customer = serializers.HiddenField(default=serializers.CurrentUserDefault())

    # Optional: include product details inside order response
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = Order
        fields = ['id','customer','product','product_details','quantity','order_date','status']