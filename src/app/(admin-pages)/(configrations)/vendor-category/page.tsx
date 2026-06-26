"use client";
import { VENDOR_CATEGORY_COLUMNS } from "@/components/columns/configrations";
import AddVendorCategoryModal from "@/components/modals/configrations/AddVendorCategoryModal";
import BasicTable from "@/components/ui/table/BasicTable";
import {
  getAllVendorCategories,
  VendorCategory,
} from "@/lib/api/services/configrations/vendorCategries";
import { useEffect, useState } from "react";

export default function Page() {
  const [vendorCategories, setVendorCategories] = useState<VendorCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchVendorCategories = async () => {
    setIsLoading(true);
    const res = await getAllVendorCategories();
    setVendorCategories(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVendorCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddVendorCategoryModal onSuccess={fetchVendorCategories} />
      </div>

      <BasicTable data={vendorCategories} columns={VENDOR_CATEGORY_COLUMNS} loading={isLoading} />
    </div>
  );
}
