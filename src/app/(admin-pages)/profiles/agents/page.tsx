"use client";
import BasicTable from "@/components/ui/table/BasicTable";
import { useAuth } from "@/context/AuthContext";
import React from "react";

function page() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <BasicTable />
    </>
  );
}

export default page;
