from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from products.models import Product
from orders.models import Order
from accounts.models import User
from products.serializers import ProductSerializer
from orders.serializers import OrderSerializer

@api_view(['GET'])
def view_products(request):

    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, id):

    try:
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)

        return Response(serializer.data)

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})
    
@api_view(['POST'])
def place_order(request):

    customer_id = request.data.get("customer_id")
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity")

    try:
        customer = User.objects.get(id=customer_id)

        if customer.role != "customer":
            return Response({"error": "Only customers can place orders"})

        product = Product.objects.get(id=product_id)

        order = Order.objects.create(
            customer=customer,
            product=product,
            quantity=quantity
        )

        serializer = OrderSerializer(order)

        return Response(serializer.data)

    except User.DoesNotExist:
        return Response({"error": "Customer not found"})
    
@api_view(['GET'])
def customer_orders(request, id):

    try:
        customer = User.objects.get(id=id)

        orders = Order.objects.filter(customer=customer)

        serializer = OrderSerializer(orders, many=True)

        return Response(serializer.data)

    except User.DoesNotExist:
        return Response({"error": "Customer not found"})