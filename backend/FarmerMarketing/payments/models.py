from django.db import models

class Payments(models.Model):
    order_id = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20)

    def __str__(self):
        return str(self.order_id)