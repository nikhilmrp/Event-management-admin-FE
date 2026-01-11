import { Button } from "@/components/ui/button";
import AddVendorModal from "@/components/ui/modal/AddVendorModal";
import BasicTable from "@/components/ui/table/BasicTable";
import React from "react";

function page() {
    return (
        <div>
            <div className="flex justify-end mb-4">
                <AddVendorModal />
            </div>
            <BasicTable />
        </div>
    );
}

export default page;
