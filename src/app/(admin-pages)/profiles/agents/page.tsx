"use client";
import BasicTable from "@/components/ui/table/BasicTable";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AGENT_PROFILE_COLUMNS } from "@/components/columns/profiles";
import { getProfileDetailsByRole } from "@/lib/api/services/profiles/general";

function Page() {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["profiles", "agent"],
    queryFn: async () => (await getProfileDetailsByRole("agent")).data,
  });

  return (
    <>
      <BasicTable columns={AGENT_PROFILE_COLUMNS} data={agents} loading={isLoading} />
    </>
  );
}

export default Page;
