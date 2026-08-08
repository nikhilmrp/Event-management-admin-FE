"use client";
import BasicTable from "@/components/ui/table/BasicTable";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { VENDOR_PROFILE_COLUMNS } from "@/components/columns/profiles";
import { getProfileDetailsByRole, ProfileRole } from "@/lib/api/services/profiles/general";
import Tabs, { TabItem } from "@/components/ui/tabs/Tabs";

type VendorApprovalStatus = "pending" | "approved";

const VENDOR_STATUS_TABS: TabItem[] = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
];

function Page() {
  const [activeTab, setActiveTab] = useState<VendorApprovalStatus>("pending");

  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ["profiles", "vendor", activeTab],
    queryFn: async () =>
      (await getProfileDetailsByRole(ProfileRole.VENDOR, activeTab === "approved")).data,
  });

  return (
    <>
      <Tabs
        tabs={VENDOR_STATUS_TABS}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as VendorApprovalStatus)}
        className="mb-4"
      />
      <BasicTable columns={VENDOR_PROFILE_COLUMNS} data={vendors} loading={isLoading} />
    </>
  );
}

export default Page;
