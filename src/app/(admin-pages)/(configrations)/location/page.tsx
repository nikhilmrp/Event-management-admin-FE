"use client";
import { LOCATION_COLUMNS } from "@/components/columns/configrations";
import AddLocationModal from "@/components/modals/configrations/AddLocationModal";
import BasicTable from "@/components/ui/table/BasicTable";
import { getAllLocations } from "@/lib/api/services/configrations/location";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: locations = [], isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => (await getAllLocations()).data,
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddLocationModal />
      </div>
      <BasicTable data={locations} columns={LOCATION_COLUMNS} loading={isLoading} />
    </div>
  );
}
