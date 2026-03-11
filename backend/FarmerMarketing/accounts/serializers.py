from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer for reading user info"""

    class Meta:
        model = User
        fields = ['id','username','email','role','phone','location','farm_name']

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""

    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','email','password','role','phone','location','farm_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role'],
            phone=validated_data['phone'],
            location=validated_data['location'],
            farm_name=validated_data.get('farm_name')
        )
        return user