"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { EyeIcon } from "@/icons";

interface PaymentReceiptsModalProps {
  urls: string[];
}

export default function PaymentReceiptsModal({ urls }: PaymentReceiptsModalProps) {
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-full max-w-lg m-4">
        <div className="p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Payment Receipts
          </h2>
          {urls.length ? (
            <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
              {urls.map((url, idx) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Payment receipt ${idx + 1}`}
                    className="w-full rounded-lg border border-gray-200 object-contain dark:border-white/[0.05]"
                  />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No payment receipts uploaded
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
