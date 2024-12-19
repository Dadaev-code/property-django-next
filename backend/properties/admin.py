from django.contrib import admin
from .models import Property


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "address",
        "price",
        "bedrooms",
        "property_type",
        "created_at",
    )
    list_filter = (
        "price",
        "bedrooms",
        "bathrooms",
        "property_type",
    )
    search_fields = ("address",)
    readonly_fields = (
        "created_at",
        "updated_at",
    )
    ordering = ("-created_at",)
