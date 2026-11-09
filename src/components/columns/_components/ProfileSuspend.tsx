"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { toast } from "@/components/ui/toast";
import { suspendUser } from "@/lib/api/services/profiles/general";

interface ProfileSuspendProps {
  userId: number;
  name: string;
}

export default function ProfileSuspend({ userId, name }: ProfileSuspendProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: suspendProfile, isPending } = useMutation({
    mutationFn: () => suspendUser(userId),
    onSuccess: (res) => {
      toast.success(res.message || "Profile suspended successfully");
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error((error as any).data?.message || "Failed to suspend profile");
    },
  });

  return (
    <>
      <Button size="sm" variant="error" onClick={() => setIsOpen(true)}>
        Suspend
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => !isPending && setIsOpen(false)}
        className="w-full max-w-md m-4"
        closeButtonSize="sm"
      >
        <div className="p-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">
            Suspend Profile
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Suspend &apos;{name}&apos;? They will lose access until approved again.
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
            <Button
              size="sm"
              variant="error"
              disabled={isPending}
              onClick={() => suspendProfile()}
            >
              {isPending ? "Suspending..." : "Suspend"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
