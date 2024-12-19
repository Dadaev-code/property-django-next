"use client";

import { Property } from "@/types/property";

import PropertyCard from "./PropertyCard";

type PropertyListProps = {
  propertyList: Property[];
  loading: boolean;
  error: string | null;
};

const PropertyList = ({ propertyList, loading, error }: PropertyListProps) => {
  const propertyNum = propertyList.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Properties ({propertyNum})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {propertyList.map((property, index) => (
          <PropertyCard property={property} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
