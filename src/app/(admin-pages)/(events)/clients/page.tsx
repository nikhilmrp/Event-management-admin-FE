"use client";

import { CLIENT_COLUMNS } from "@/components/columns/clients";
import BasicTable from "@/components/ui/table/BasicTable";
import { getAllClients } from "@/lib/api/services/clients/general";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => (await getAllClients()).data,
  });

  return <BasicTable data={clients} columns={CLIENT_COLUMNS} loading={isLoading} />;
}
