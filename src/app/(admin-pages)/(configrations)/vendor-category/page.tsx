"use client";
import { VENDOR_CATEGORY_COLUMNS } from "@/components/columns/configrations";
import AddVendorCategoryModal from "@/components/modals/configrations/AddVendorCategoryModal";
import BasicTable from "@/components/ui/table/BasicTable";
import { getAllVendorCategories } from "@/lib/api/services/configrations/vendorCategries";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: vendorCategories = [], isLoading } = useQuery({
    queryKey: ["vendor-categories"],
    queryFn: async () => (await getAllVendorCategories()).data,
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddVendorCategoryModal />
      </div>

      <BasicTable data={vendorCategories} columns={VENDOR_CATEGORY_COLUMNS} loading={isLoading} />
    </div>
  );
}
