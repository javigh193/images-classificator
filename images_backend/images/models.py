from django.db import models


class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField()
