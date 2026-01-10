import BasicTable from "@/components/ui/table/BasicTable";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs/tabs";
import React from "react";

function page() {
    return (
        <div>
            <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                    <BasicTable />
                </TabsContent>
                <TabsContent value="confirmed">
                    <BasicTable />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default page;
