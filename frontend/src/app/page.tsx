import PropertyListPage from "@/components/pages/PropertiesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties | Real Estate",
  description: "Browse our selection of properties available for sale and rent",
};

export default function Page() {
  return <PropertyListPage />;
}
