import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NewProperty, Property } from "@/types/property";
import { propertyApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PropertyFormProps {
  initialData?: Property;
  hideForm: () => void;
  onSuccess?: () => void;
}

const PropertyForm = ({
  initialData,
  hideForm,
  onSuccess,
}: PropertyFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [formData, setFormData] = useState<Partial<NewProperty>>({
    address: initialData?.address || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    bathrooms: initialData?.bathrooms || 1,
    bedrooms: initialData?.bedrooms || 1,
    property_type: initialData?.property_type || "to let",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages(files);

      // Create preview URLs
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "bathrooms" || name === "bedrooms"
          ? Number(value)
          : value,
    }));
  };

  const handlePropertyTypeChange = (value: "to let" | "to buy") => {
    setFormData((prev) => ({
      ...prev,
      property_type: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          data.append(key, String(value));
        }
      });

      // Append images if any
      if (images) {
        Array.from(images).forEach((file) => {
          data.append("images", file);
        });
      }

      if (initialData) {
        await propertyApi.update(initialData.id, data);
      } else {
        await propertyApi.create(data);
      }

      router.refresh();
      onSuccess?.();
    } catch (err) {
      console.error("Error submitting property:", err);
      setError("Failed to save property. Please try again.");
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Property" : "Add New Property"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="min-h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="property_type">Property Type</Label>
              <Select
                value={formData.property_type}
                onValueChange={handlePropertyTypeChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to let">To Let</SelectItem>
                  <SelectItem value="to buy">To Buy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                min="0"
                value={formData.bedrooms}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                min="0"
                value={formData.bathrooms}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Property Images</Label>
            <Input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full aspect-video object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={hideForm}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Update Property" : "Create Property"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
