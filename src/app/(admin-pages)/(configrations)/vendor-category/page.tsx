import AddVendorModal from "@/components/ui/modal/AddVendorModal";
import BasicTable from "@/components/ui/table/BasicTable";

export default function Page() {
    return (
        <div>
            <div className="flex justify-end mb-4">
                <AddVendorModal />
            </div>

            <BasicTable />
        </div>
    );
}
