from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    # Automatically assign logged-in user
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Customer
        fields = ['id','user','phone','location']