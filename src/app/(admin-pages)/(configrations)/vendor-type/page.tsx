"use client";
import AddVendorTypeModal from "@/components/modals/configrations/AddVendorTypeModal";
import BasicTable from "@/components/ui/table/BasicTable";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { VENDOR_TYPE_COLUMNS } from "@/components/columns/configrations";
import { getVendorAllTypes } from "@/lib/api/services/configrations/vendortype";

export default function Page() {
  const { data: vendorTypes = [], isLoading } = useQuery({
    queryKey: ["vendor-types"],
    queryFn: async () => (await getVendorAllTypes()).data,
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddVendorTypeModal />
      </div>
      <BasicTable columns={VENDOR_TYPE_COLUMNS} data={vendorTypes} loading={isLoading} />
    </div>
  );
}
