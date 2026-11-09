"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { EyeIcon } from "@/icons";
import { AgentEventAgent } from "@/lib/api/services/events/general";

interface AgentDetailsModalProps {
  agent: AgentEventAgent;
}

function DetailItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value || "-"}</p>
    </div>
  );
}

export default function AgentDetailsModal({ agent }: AgentDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
      >
        <EyeIcon className="size-5" />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-full max-w-md m-4">
        <div className="p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Agent Details
          </h2>
          <div className="grid grid-cols-1 gap-y-4">
            <DetailItem label="Name" value={agent?.name} />
            <DetailItem label="Email" value={agent?.email} />
            <DetailItem label="Phone" value={agent?.phone} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
