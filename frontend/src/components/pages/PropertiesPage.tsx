"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";
import { Plus, Search } from "lucide-react";
import PropertyList from "../custom/PropertyList";
import PropertyForm from "../custom/PropertyForm";
import PropertyFilters, { FilterValues } from "../custom/PropertyFilters";
import { propertyApi } from "@/services/api";

const PropertyListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyList, setPropertyList] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterValues>({
    minPrice: "",
    maxPrice: "",
    propertyTypes: [],
    minBedrooms: "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertyApi.getAll();
        setPropertyList(response.data);
      } catch (err) {
        setError("Failed to fetch properties");
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return propertyList.filter((property) => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        property.address.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower);

      // Price range filter
      const matchesMinPrice =
        !filters.minPrice || property.price >= parseInt(filters.minPrice);
      const matchesMaxPrice =
        !filters.maxPrice || property.price <= parseInt(filters.maxPrice);

      // Property type filter
      const matchesType =
        filters.propertyTypes.length === 0 ||
        filters.propertyTypes.includes(property.property_type);

      // Bedrooms filter
      const matchesBedrooms =
        !filters.minBedrooms ||
        property.bedrooms >= parseInt(filters.minBedrooms);

      return (
        matchesSearch &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesType &&
        matchesBedrooms
      );
    });
  }, [propertyList, searchQuery, filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />

      <main className="flex-1">
        <div className="p-4 md:p-6">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="hidden md:flex items-center gap-2"
            >
              <Plus size={20} />
              Add Property
            </Button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg">
                <PropertyForm
                  hideForm={() => setShowForm(false)}
                  onSuccess={() => setShowForm(false)}
                />
              </div>
            </div>
          )}

          <PropertyList
            propertyList={filteredProperties}
            loading={loading}
            error={error}
          />
        </div>
      </main>

      <Button
        className="fixed right-4 bottom-4 md:hidden rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
        onClick={() => setShowForm(true)}
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default PropertyListPage;
