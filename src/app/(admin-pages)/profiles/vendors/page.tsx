"use client";
import BasicTable from "@/components/ui/table/BasicTable";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { VENDOR_PROFILE_COLUMNS } from "@/components/columns/profiles";
import { getProfileDetailsByRole, ProfileRole } from "@/lib/api/services/profiles/general";

function Page() {
  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ["profiles", "vendor"],
    queryFn: async () => (await getProfileDetailsByRole(ProfileRole.VENDOR)).data,
  });

  return (
    <>
      <BasicTable
        columns={VENDOR_PROFILE_COLUMNS}
        data={vendors}
        loading={isLoading}
        enableRowSelection
      />
    </>
  );
}

export default Page;
