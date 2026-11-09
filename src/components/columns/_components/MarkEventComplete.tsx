"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { toast } from "@/components/ui/toast";
import { completeEvent } from "@/lib/api/services/events/general";

interface MarkEventCompleteProps {
  eventId: number;
  eventName: string;
}

export default function MarkEventComplete({ eventId, eventName }: MarkEventCompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: markComplete, isPending } = useMutation({
    mutationFn: () => completeEvent(eventId),
    onSuccess: (res) => {
      toast.success(res.message || "Event marked as complete");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error((error as any).data?.message || "Failed to mark event as complete");
    },
  });

  return (
    <>
      <Button className="w-[150px]" size="sm" onClick={() => setIsOpen(true)}>
        Mark as Complete
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => !isPending && setIsOpen(false)}
        className="w-full max-w-md m-4"
        closeButtonSize="sm"
      >
        <div className="p-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">
            Mark as Complete
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Mark &apos;{eventName}&apos; as complete? It will move to the Fully Paid list.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" disabled={isPending} onClick={() => markComplete()}>
              {isPending ? "Completing..." : "Mark as Complete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
