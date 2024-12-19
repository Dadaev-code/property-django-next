import { Metadata } from "next";
import PropertyDetailPage from "@/components/custom/PropertyDetail";

export const metadata: Metadata = {
  title: "Properties | Real Estate",
  description: "View this property",
};

interface PageProps {
  params: {
    id: string;
  };
}
export default function Page({ params }: PageProps) {
  console.log("id", params.id);
  return <PropertyDetailPage id={params.id} />;
}
