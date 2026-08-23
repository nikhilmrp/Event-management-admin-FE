"use client";

import { EVENT_COLUMNS } from "@/components/columns/events";
import BasicTable from "@/components/ui/table/BasicTable";
import { AgentEvent, getEventsByStatus } from "@/lib/api/services/events/general";
import { useQuery } from "@tanstack/react-query";

const PENDING_STATUSES = ["draft", "vendor_selected"];

export default function Page() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", "pending"],
    queryFn: async () => (await getEventsByStatus(PENDING_STATUSES)).data,
  });

  return (
    <BasicTable
      data={events}
      columns={EVENT_COLUMNS}
      loading={isLoading}
      getRowId={(row: AgentEvent) => row.event.id}
    />
  );
}
