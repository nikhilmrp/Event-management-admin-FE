"use client";
import BasicTable from "@/components/ui/table/BasicTable";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AGENT_PROFILE_COLUMNS } from "@/components/columns/profiles";
import { getProfileDetailsByRole, ProfileRole } from "@/lib/api/services/profiles/general";
import Tabs, { TabItem } from "@/components/ui/tabs/Tabs";

type AgentApprovalStatus = "pending" | "approved";

const AGENT_STATUS_TABS: TabItem[] = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
];

function Page() {
  const [activeTab, setActiveTab] = useState<AgentApprovalStatus>("pending");

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["profiles", "agent", activeTab],
    queryFn: async () =>
      (await getProfileDetailsByRole(ProfileRole.AGENT, activeTab === "approved")).data,
  });

  return (
    <>
      <Tabs
        tabs={AGENT_STATUS_TABS}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as AgentApprovalStatus)}
        className="mb-4"
      />
      <BasicTable columns={AGENT_PROFILE_COLUMNS} data={agents} loading={isLoading} />
    </>
  );
}

export default Page;
