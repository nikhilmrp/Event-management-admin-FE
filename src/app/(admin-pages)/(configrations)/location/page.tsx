"use client";
import { LOCATION_COLUMNS } from "@/components/columns/configrations";
import AddLocationModal from "@/components/modals/configrations/AddLocationModal";
import BasicTable from "@/components/ui/table/BasicTable";
import { getAllLocations, Location } from "@/lib/api/services/configrations/location";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocations = async () => {
    setIsLoading(true);
    const response = await getAllLocations();
    setLocations(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddLocationModal onSuccess={fetchLocations} />
      </div>
      <BasicTable data={locations} columns={LOCATION_COLUMNS} loading={isLoading} />
    </div>
  );
}
