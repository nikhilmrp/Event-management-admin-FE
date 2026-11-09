"use client";

import { useState } from "react";
import {
  ADVANCE_PAID_EVENT_COLUMNS,
  FULLY_PAID_EVENT_COLUMNS,
} from "@/components/columns/events";
import BasicTable from "@/components/ui/table/BasicTable";
import Tabs, { TabItem } from "@/components/ui/tabs/Tabs";
import { AgentEvent, getEventsByStatus } from "@/lib/api/services/events/general";
import { useQuery } from "@tanstack/react-query";

type ConfirmedTab = "advance_paid" | "fully_paid";

const CONFIRMED_TABS: TabItem[] = [
  { key: "advance_paid", label: "Advance Paid" },
  { key: "fully_paid", label: "Fully Paid" },
];

const TAB_STATUSES: Record<ConfirmedTab, string[]> = {
  advance_paid: ["confirmed"],
  fully_paid: ["completed"],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<ConfirmedTab>("advance_paid");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", activeTab],
    queryFn: async () => (await getEventsByStatus(TAB_STATUSES[activeTab])).data,
  });

  return (
    <>
      <div className="mb-4">
        <Tabs
          tabs={CONFIRMED_TABS}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as ConfirmedTab)}
        />
      </div>
      <BasicTable
        data={events}
        columns={activeTab === "advance_paid" ? ADVANCE_PAID_EVENT_COLUMNS : FULLY_PAID_EVENT_COLUMNS}
        loading={isLoading}
        getRowId={(row: AgentEvent) => row.event.id}
      />
    </>
  );
}
