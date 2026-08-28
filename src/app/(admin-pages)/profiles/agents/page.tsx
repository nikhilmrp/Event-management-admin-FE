"use client";
import BasicTable from "@/components/ui/table/BasicTable";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AGENT_PROFILE_COLUMNS } from "@/components/columns/profiles";
import { getProfileDetailsByRole, ProfileRole } from "@/lib/api/services/profiles/general";
import Tabs, { TabItem } from "@/components/ui/tabs/Tabs";
import InputField from "@/components/form/input/InputField";

type AgentApprovalStatus = "pending" | "approved";

const AGENT_STATUS_TABS: TabItem[] = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
];

function Page() {
  const [activeTab, setActiveTab] = useState<AgentApprovalStatus>("pending");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["profiles", "agent", activeTab, debouncedSearch],
    queryFn: async () =>
      (await getProfileDetailsByRole(ProfileRole.AGENT, activeTab === "approved", debouncedSearch))
        .data,
  });

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Tabs
          tabs={AGENT_STATUS_TABS}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as AgentApprovalStatus)}
        />
        <div className="w-full max-w-xs">
          <InputField
            placeholder="Search"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <BasicTable columns={AGENT_PROFILE_COLUMNS} data={agents} loading={false} />
    </>
  );
}

export default Page;
