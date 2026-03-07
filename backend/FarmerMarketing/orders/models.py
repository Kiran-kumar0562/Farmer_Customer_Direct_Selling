from django.db import models
from FarmerApp.models import Farmers
from CustomerApp.models import Customers
from products.models import Product


class Order(models.Model):

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('delivered', 'Delivered'),
    )

    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)
    farmer = models.ForeignKey(Farmers, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    quantity = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id}"
