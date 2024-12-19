export interface Property {
  id: number;
  address: string;
  description: string;
  price: number;
  bathrooms: number;
  bedrooms: number;
  property_type: "to let" | "to buy";
  images: string;
  created_at: string;
  updated_at: string;
}

export type NewProperty = Omit<Property, 'id' |   'created_at' |
'updated_at'>