import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export interface FilterValues {
  minPrice: string;
  maxPrice: string;
  propertyTypes: string[];
  minBedrooms: string;
}

interface PropertyFiltersProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

const PropertyFilters = ({ filters, onFilterChange }: PropertyFiltersProps) => {
  const handleInputChange = (name: keyof FilterValues, value: string) => {
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...filters.propertyTypes, type]
      : filters.propertyTypes.filter((t) => t !== type);

    onFilterChange({
      ...filters,
      propertyTypes: updatedTypes,
    });
  };

  return (
    <aside className="w-64 bg-white p-4 shadow-sm hidden md:block">
      <h2 className="font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleInputChange("minPrice", e.target.value)}
              className="w-full"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleInputChange("maxPrice", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={filters.propertyTypes.includes("to let")}
                onCheckedChange={(checked) =>
                  handlePropertyTypeChange("to let", checked as boolean)
                }
              />
              <span>To Let</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={filters.propertyTypes.includes("to buy")}
                onCheckedChange={(checked) =>
                  handlePropertyTypeChange("to buy", checked as boolean)
                }
              />
              <span>To Buy</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <Input
            type="number"
            min="1"
            placeholder="Minimum bedrooms"
            value={filters.minBedrooms}
            onChange={(e) => handleInputChange("minBedrooms", e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </aside>
  );
};

export default PropertyFilters;
