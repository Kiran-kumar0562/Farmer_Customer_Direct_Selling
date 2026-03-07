from django.db import models
from FarmerApp.models import Farmers

class Product(models.Model):

    farmer = models.ForeignKey(Farmers, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()

    category = models.CharField(max_length=50)
    image = models.ImageField(upload_to='products/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
