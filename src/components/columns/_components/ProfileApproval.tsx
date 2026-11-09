"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { toast } from "@/components/ui/toast";
import { approveUserProfile } from "@/lib/api/services/profiles/general";
import ProfileSuspend from "./ProfileSuspend";

interface ProfileApprovalProps {
  userId: number;
  name: string;
  isApproved?: boolean;
}

export default function ProfileApproval({ userId, name, isApproved }: ProfileApprovalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: approveProfile, isPending } = useMutation({
    mutationFn: () => approveUserProfile(userId),
    onSuccess: (res) => {
      toast.success(res.message || "Profile approved successfully");
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error((error as any).data?.message || "Failed to approve profile");
    },
  });

  if (isApproved) {
    return <ProfileSuspend userId={userId} name={name} />;
  }

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        Approve
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => !isPending && setIsOpen(false)}
        className="w-full max-w-md m-4"
        closeButtonSize="sm"
      >
        <div className="p-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">
            Approve Profile
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Approve &apos;{name}&apos;? They will get access to the platform.
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
            <Button size="sm" disabled={isPending} onClick={() => approveProfile()}>
              {isPending ? "Approving..." : "Approve"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
