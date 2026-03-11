from django.db import models
from django.conf import settings
from products.models import Product


class Order(models.Model):
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    status = models.CharField(max_length=20,choices=[('pending','Pending'),('completed','Completed')],
                               default="Pending")
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)