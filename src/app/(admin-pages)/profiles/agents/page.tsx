import BasicTable from "@/components/ui/table/BasicTable";
import { TabsContent } from "@/components/ui/tabs/tabs";
import React from "react";

function page() {
  return (
    <>
      <TabsContent value={"confirmed"}>
        <BasicTable />
      </TabsContent>
      <TabsContent value={"pending"}>
        <BasicTable />
      </TabsContent>
    </>
  );
}

export default page;
