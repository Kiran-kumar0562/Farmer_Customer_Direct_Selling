from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer
from accounts.models import User
from products.models import Product


#  Place Order (Customer)
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

        data = request.data
        data["customer"] = customer.id
        data["product"] = product.id

        serializer = OrderSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except User.DoesNotExist:
        return Response({"error": "Customer not found"})

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})


# View All Orders (Admin)
@api_view(['GET'])
def order_list(request):

    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


#  Customer Order History
@api_view(['GET'])
def customer_orders(request, customer_id):

    orders = Order.objects.filter(customer_id=customer_id)

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


#  Farmer Orders (Orders for Farmer Products)
@api_view(['GET'])
def farmer_orders(request, farmer_id):

    orders = Order.objects.filter(product__farmer_id=farmer_id)

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


#  Update Order Status
@api_view(['PUT'])
def update_order_status(request, id):

    try:
        order = Order.objects.get(id=id)

        serializer = OrderSerializer(order, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except Order.DoesNotExist:
        return Response({"error": "Order not found"})


#  Cancel Order
@api_view(['DELETE'])
def cancel_order(request, id):

    try:
        order = Order.objects.get(id=id)

        order.delete()

        return Response({"message": "Order cancelled successfully"})

    except Order.DoesNotExist:
        return Response({"error": "Order not found"})