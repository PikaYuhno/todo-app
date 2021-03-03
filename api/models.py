from django.db import models
import datetime

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=32, null=False)
    done = models.BooleanField(default=False)
    notes = models.TextField(max_length=255, default='')
    priority = models.CharField(max_length=6, default='none')
    dueto = models.DateField(default=datetime.date.today)


