"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

export default function AddVendorModal() {
    const [vendorName, setVendorName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ vendorName, phone });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Vendor</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Vendor</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Vendor Type"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                    />

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Status"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Button type="submit">Save</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
