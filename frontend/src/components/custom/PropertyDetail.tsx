"use client";

import React, { useEffect, useState } from "react";
import { Property } from "@/types/property";
import { propertyApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Bed,
  Bath,
  Edit,
  ArrowLeft,
  Home,
  Calendar,
  Loader2,
  Trash,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

import { useRouter } from "next/navigation";
import PropertyForm from "./PropertyForm";

interface PropertyDetailPageProps {
  id: string;
}

export default function PropertyDetailPage({ id }: PropertyDetailPageProps) {
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteProperty = async () => {
    try {
      const response = await propertyApi.delete(parseInt(id));
      router.push("/");
    } catch (err) {
      setError("Failed to delete property");
      console.error("Error deleting property:", err);
    } finally {
      setConfirmDelete(false);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyApi.getSingle(parseInt(id));
        setProperty(response.data);
      } catch (err) {
        setError("Failed to fetch property details");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-6 text-center text-red-500">
          {error || "Property not found"}
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Properties
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Images Section */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={property.images || "/api/placeholder/800/600"}
                alt={property.address}
                className="object-cover w-full h-full"
              />
            </div>
          </Card>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{property.address}</h1>
                <p className="text-2xl font-bold text-blue-600">
                  £{property.price.toLocaleString()}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2"
              >
                <Edit size={16} />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Bed className="text-gray-500" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="text-gray-500" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="text-gray-500" />
                <span>{property.property_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-gray-500" />
                <span>
                  Added {formatDistanceToNow(new Date(property.created_at))} ago
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div className="w-full border-t mt-4 pt-4 text-sm text-gray-500 inline-flex justify-between items-center">
              <div>
                <p>Listed on {format(new Date(property.created_at), "PPP")}</p>
                <p>
                  Last updated {format(new Date(property.updated_at), "PPP")}
                </p>
              </div>

              <Trash onClick={() => setConfirmDelete(true)} />
            </div>
          </Card>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg">
            <PropertyForm
              initialData={property}
              hideForm={() => setShowForm(false)}
              onSuccess={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg">
            <h2>Are you sure you want to delete this property?</h2>
            <Button onClick={deleteProperty}>Yes</Button>
            <Button onClick={() => setConfirmDelete(false)}>No</Button>
          </div>
        </div>
      )}
    </div>
  );
}
