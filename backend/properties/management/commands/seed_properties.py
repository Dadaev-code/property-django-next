from django.core.management.base import BaseCommand
from properties.models import Property
from django.utils import timezone
from random import randint, choice, uniform
import datetime


class Command(BaseCommand):
    help = "Seeds the database with 20 sample properties"

    def handle(self, *args, **options):
        # Clear existing properties
        Property.objects.all().delete()

        # Sample data
        streets = [
            "Oak Street",
            "Maple Avenue",
            "Cedar Lane",
            "Pine Road",
            "Elm Drive",
            "Willow Way",
            "Birch Boulevard",
            "Sycamore Street",
            "Spruce Avenue",
            "Ash Lane",
        ]

        cities = [
            "London",
            "Manchester",
            "Birmingham",
            "Leeds",
            "Liverpool",
            "Bristol",
            "Sheffield",
            "Newcastle",
            "Nottingham",
            "Southampton",
        ]

        postcodes = [
            "SW1A 1AA",
            "M1 1AA",
            "B1 1AA",
            "LS1 1AA",
            "L1 1AA",
            "BS1 1AA",
            "S1 1AA",
            "NE1 1AA",
            "NG1 1AA",
            "SO1 1AA",
        ]

        descriptions = [
            """Stunning {bed_count} bedroom property in a prime location. Featuring a modern kitchen with integrated appliances, spacious living room with plenty of natural light, and a beautifully landscaped garden. Perfect for families or professionals.""",
            """Charming {bed_count} bedroom home with character features throughout. Recently renovated to a high standard while maintaining its period charm. Benefits from a large kitchen-diner, separate utility room, and off-street parking.""",
            """Modern {bed_count} bedroom property in a sought-after area. Open-plan living space perfect for entertaining, high-spec kitchen, and contemporary bathrooms. Close to local amenities and transport links.""",
            """Spacious {bed_count} bedroom property offering excellent value. Well-maintained throughout with a fitted kitchen, comfortable living room, and good-sized bedrooms. Ideal for first-time buyers or investors.""",
            """Luxurious {bed_count} bedroom residence with exceptional finish throughout. Designer kitchen, premium appliances, and high-end fixtures. Master bedroom with en-suite and walk-in wardrobe. Must be viewed to be appreciated.""",
        ]

        # Create 20 properties
        for i in range(20):
            bed_count = randint(1, 5)
            bath_count = max(1, bed_count - randint(0, 2))

            # Generate address
            house_number = randint(1, 200)
            street = choice(streets)
            city = choice(cities)
            postcode = choice(postcodes)
            address = f"{house_number} {street}, {city}, {postcode}"

            # Generate description
            description = choice(descriptions).format(bed_count=bed_count)

            # Calculate price based on bedrooms and random factor
            base_price = 200000 + (bed_count * 75000)
            price = int(base_price * uniform(0.8, 1.2))

            # Create property
            property = Property.objects.create(
                address=address,
                description=description,
                price=price,
                bedrooms=bed_count,
                bathrooms=bath_count,
                property_type=choice(["to let", "to buy"]),
                created_at=timezone.now() - datetime.timedelta(days=randint(1, 90)),
                updated_at=timezone.now() - datetime.timedelta(days=randint(0, 30)),
            )

            self.stdout.write(
                self.style.SUCCESS(f"Created property: {property.address}")
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded 20 properties"))
