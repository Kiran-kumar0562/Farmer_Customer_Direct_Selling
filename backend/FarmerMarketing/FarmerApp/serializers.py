from rest_framework import serializers
from .models import Farmer

class FarmerSerializer(serializers.ModelSerializer):
    # Automatically assign logged-in user
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Farmer
        fields = ['id','user','farm_name','phone','location']