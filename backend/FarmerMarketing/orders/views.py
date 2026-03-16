from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Order
from .serializers import OrderSerializer
from products.models import Product


# Place Order (Customer)
@api_view(['POST'])
def place_order(request):

    product_id = request.data.get("product")
    quantity = request.data.get("quantity")

    try:
        product = Product.objects.get(id=product_id)

        serializer = OrderSerializer(
            data={
                "product": product.id,
                "quantity": quantity
            },
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})


# View All Orders
@api_view(['GET'])
def order_list(request):

    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


# Customer Order History
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def customer_orders(request):

    user = request.user

    if user.role != "customer":
        return Response(
            {"error": "Only customers can view their orders"},
            status=status.HTTP_403_FORBIDDEN
        )

    orders = Order.objects.filter(customer=user)
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


# Farmer Orders (Orders for farmer products)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def farmer_orders(request):

    user = request.user

    if user.role != "farmer":
        return Response(
            {"error": "Only farmers can view these orders"},
            status=status.HTTP_403_FORBIDDEN
        )

    orders = Order.objects.filter(product__farmer=user)
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


# Update Order Status (Farmer)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_status(request, id):

    try:
        order = Order.objects.get(id=id)

        if request.user != order.product.farmer:
            return Response(
                {"error": "You can only update your product orders"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = OrderSerializer(order, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# Cancel Order
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cancel_order(request, id):

    try:
        order = Order.objects.get(id=id)

        if request.user != order.customer:
            return Response(
                {"error": "You can only cancel your own orders"},
                status=status.HTTP_403_FORBIDDEN
            )

        order.delete()

        return Response({"message": "Order cancelled successfully"})

    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )