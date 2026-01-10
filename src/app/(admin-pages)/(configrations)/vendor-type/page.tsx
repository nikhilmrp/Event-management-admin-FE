import { Button } from "@/components/ui/button";
import BasicTable from "@/components/ui/table/BasicTable";
import React from "react";

function page() {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button>Add Vendor</Button>
      </div>
      <BasicTable />
    </div>
  );
}

export default page;
