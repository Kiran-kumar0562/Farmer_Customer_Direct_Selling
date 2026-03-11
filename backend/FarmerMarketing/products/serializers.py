from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    # Automatically assign the farmer who is logged in
    farmer = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Product
        fields = ['id','farmer','product_name','price','quantity','description','created_at']