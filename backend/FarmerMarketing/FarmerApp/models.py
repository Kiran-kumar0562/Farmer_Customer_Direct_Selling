from django.db import models
from accounts.models import User
from django.conf import settings

class Farmer(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    farm_name = models.CharField(max_length=200, blank=True, null=True)
    location = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.farm_name