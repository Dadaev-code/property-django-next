from django.db import models


class Property(models.Model):
    class PropertyTypes(models.TextChoices):
        TO_LET = "to let"
        TO_BUY = "to buy"

    address = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    images = models.ImageField(upload_to="properties/%Y/%m/%d/")
    property_type = models.CharField(
        max_length=10, choices=PropertyTypes.choices, default=PropertyTypes.TO_LET
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.address} - {self.property_type}"
