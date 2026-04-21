from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from rest_framework.generics import ListAPIView
from .serializers import OrderSerializer
import json
from django.db import transaction

class PlaceOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    @transaction.atomic
    def post(self, request):

        cart_items = request.data.get("cart", [])

        if not cart_items:
            return Response({"error": "Cart is empty"}, status=400)
        
        total_amount = 0
        order = Order.objects.create(user=request.user)

        for item in cart_items:

            # convert string item → dictionary if needed
            if isinstance(item, str):
                item = json.loads(item)

            product_id = item.get("id") or item.get("product") or item.get("product_id")
            quantity = item.get("quantity", 1)
            price=float(item.get("price",0))

            if not product_id:
                return Response(
                    {"error": "Product ID missing"},
                    status=400
                )
            
             # subtotal calculation
            subtotal = price * quantity

            total_amount += subtotal


            
            OrderItem.objects.create(
                order= order,
                product_id= product_id,
                quantity= quantity,
                price = price
            )

            # save total into Order table
            order.total_amount = total_amount

            order.save()

        return Response({"message": "Order placed successfully",
                         "total_amount":total_amount })
    

class OrderHistoryView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)