from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from accounts.models import User


#  Add Product (Farmer)
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


#  View All Products
@api_view(['GET'])
def product_list(request):

    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


#  View Single Product
@api_view(['GET'])
def product_detail(request, id):

    try:
        product = Product.objects.get(id=id)

        serializer = ProductSerializer(product)

        return Response(serializer.data)

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})


#  Update Product
@api_view(['PUT'])
def update_product(request, id):

    try:
        product = Product.objects.get(id=id)

        serializer = ProductSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})


#  Delete Product
@api_view(['DELETE'])
def delete_product(request, id):

    try:
        product = Product.objects.get(id=id)

        product.delete()

        return Response({"message": "Product deleted successfully"})

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})


#  Farmer Products List
@api_view(['GET'])
def farmer_products(request, farmer_id):

    products = Product.objects.filter(farmer_id=farmer_id)

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)