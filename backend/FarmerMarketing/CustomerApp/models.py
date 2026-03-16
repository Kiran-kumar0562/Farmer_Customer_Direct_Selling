from django.db import models
from django.conf import settings
class Customers(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True,blank=True)
    phone = models.CharField(max_length=15)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)

    def __str__(self):
        return self.user.username