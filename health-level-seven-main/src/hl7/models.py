from django.db import models


class CSVData(models.Model):
    column1 = models.CharField(max_length=100)
    column2 = models.CharField(max_length=100)
    column3 = models.CharField(max_length=100)
