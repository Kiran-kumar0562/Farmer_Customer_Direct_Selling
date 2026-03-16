from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Product
from .serializers import ProductSerializer
from accounts.models import User


# Add Product (Farmer Only)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_product(request):

    user = request.user

    if user.role != "farmer":
        return Response(
            {"error": "Only farmers can add products"},
            status=status.HTTP_403_FORBIDDEN
        )

    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(farmer=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View All Products
@api_view(['GET'])
def product_list(request):

    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


# View Single Product
@api_view(['GET'])
def product_detail(request, id):

    try:
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# Update Product (Farmer Only)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request, id):

    try:
        product = Product.objects.get(id=id)

        if request.user != product.farmer:
            return Response(
                {"error": "You can only update your own products"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ProductSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# Delete Product (Farmer Only)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, id):

    try:
        product = Product.objects.get(id=id)

        if request.user != product.farmer:
            return Response(
                {"error": "You can only delete your own products"},
                status=status.HTTP_403_FORBIDDEN
            )

        product.delete()

        return Response({"message": "Product deleted successfully"})

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# Farmer Product List
@api_view(['GET'])
def farmer_products(request, farmer_id):

    products = Product.objects.filter(farmer_id=farmer_id)

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)