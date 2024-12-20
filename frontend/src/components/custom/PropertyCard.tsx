import { Card, CardHeader, CardContent } from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { Property } from "@/types/property";
import Link from "next/link";

type PropertyCardProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link href={`/properties/${property.id}`}>
      <Card
        key={property.id}
        className="overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="relative aspect-video">
          <img
            src={property.images || "/api/placeholder/house.png"}
            alt={property.address}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-4 py-2">
            £{property.price.toLocaleString()}
          </div>
        </div>
        <CardHeader className="pb-2">
          <h2 className="text-xl font-semibold">{property.address}</h2>
          <p className="text-sm text-gray-500">
            {property.bedrooms} beds • {property.bathrooms} baths •{" "}
            {property.property_type}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-2">{property.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            Added {formatDistanceToNow(new Date(property.created_at))} ago
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
