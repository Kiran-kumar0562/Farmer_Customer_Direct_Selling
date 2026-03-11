from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer
from orders.models import Order
from accounts.models import User


#  Make Payment
@api_view(['POST'])
def make_payment(request):

    order_id = request.data.get("order_id")
    customer_id = request.data.get("customer_id")
    amount = request.data.get("amount")

    try:
        order = Order.objects.get(id=order_id)
        customer = User.objects.get(id=customer_id)

        if customer.role != "customer":
            return Response({"error": "Only customers can make payments"})

        data = request.data
        data["order"] = order.id
        data["customer"] = customer.id

        serializer = PaymentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except Order.DoesNotExist:
        return Response({"error": "Order not found"})

    except User.DoesNotExist:
        return Response({"error": "Customer not found"})


#  View All Payments
@api_view(['GET'])
def payment_list(request):

    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True)

    return Response(serializer.data)


#  View Single Payment
@api_view(['GET'])
def payment_detail(request, id):

    try:
        payment = Payment.objects.get(id=id)
        serializer = PaymentSerializer(payment)

        return Response(serializer.data)

    except Payment.DoesNotExist:
        return Response({"error": "Payment not found"})


#  Customer Payments
@api_view(['GET'])
def customer_payments(request, customer_id):

    payments = Payment.objects.filter(customer_id=customer_id)
    serializer = PaymentSerializer(payments, many=True)

    return Response(serializer.data)


#  Farmer Payments
@api_view(['GET'])
def farmer_payments(request, farmer_id):

    payments = Payment.objects.filter(order__product__farmer_id=farmer_id)
    serializer = PaymentSerializer(payments, many=True)

    return Response(serializer.data)


#  Update Payment Status
@api_view(['PUT'])
def update_payment_status(request, id):

    try:
        payment = Payment.objects.get(id=id)

        serializer = PaymentSerializer(payment, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    except Payment.DoesNotExist:
        return Response({"error": "Payment not found"})