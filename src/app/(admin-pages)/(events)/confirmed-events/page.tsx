"use client";

import { EVENT_COLUMNS } from "@/components/columns/events";
import BasicTable from "@/components/ui/table/BasicTable";
import { AgentEvent, getEventsByStatus } from "@/lib/api/services/events/general";
import { useQuery } from "@tanstack/react-query";

const CONFIRMED_STATUSES = ["confirmed"];

export default function Page() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", "confirmed"],
    queryFn: async () => (await getEventsByStatus(CONFIRMED_STATUSES)).data,
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
