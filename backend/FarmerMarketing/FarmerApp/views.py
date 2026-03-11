from django.shortcuts import render 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from products.models import Product
from products.serializers import ProductSerializer
from accounts.models import User


# ADD PRODUCT
@api_view(['POST'])
def add_product(request):

    farmer_id = request.data.get("farmer_id")

    try:
        farmer = User.objects.get(id=farmer_id)

        if farmer.role != "farmer":
            return Response({"error": "Only farmers can add products"})

        data = request.data
        data["farmer"] = farmer.id

        serializer = ProductSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except User.DoesNotExist:
        return Response({"error": "Farmer not found"})


# VIEW FARMER PRODUCTS
@api_view(['GET'])
def farmer_products(request, farmer_id):

    products = Product.objects.filter(farmer_id=farmer_id)
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


# UPDATE PRODUCT
@api_view(['PUT'])
def update_product(request, product_id):

    try:
        product = Product.objects.get(id=product_id)

        serializer = ProductSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})


# DELETE PRODUCT
@api_view(['DELETE'])
def delete_product(request, product_id):

    try:
        product = Product.objects.get(id=product_id)
        product.delete()

        return Response({"message": "Product deleted"})

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})