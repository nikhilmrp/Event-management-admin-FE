"use client";
import AddVendorTypeModal from "@/components/modals/configrations/AddVendorTypeModal";
import BasicTable from "@/components/ui/table/BasicTable";
import React, { useEffect, useState } from "react";
import { VENDOR_TYPE_COLUMNS } from "@/components/columns/configrations";
import { getVendorAllTypes, VendorType } from "@/lib/api/services/configrations/vendortype";

export default function Page() {
  const [vendorTypes, setVendorTypes] = useState<VendorType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVendorTypes = async () => {
    setIsLoading(true);
    const response = await getVendorAllTypes();
    setVendorTypes(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVendorTypes();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddVendorTypeModal onSuccess={fetchVendorTypes} />
      </div>
      <BasicTable columns={VENDOR_TYPE_COLUMNS} data={vendorTypes} loading={isLoading} />
    </div>
  );
}
