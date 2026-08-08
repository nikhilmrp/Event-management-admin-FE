"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/button/Button";
import { toast } from "@/components/ui/toast";
import { approveUserProfile } from "@/lib/api/services/profiles/general";

interface ProfileApprovalProps {
  userId: number;
  isApproved?: boolean;
}

export default function ProfileApproval({ userId, isApproved }: ProfileApprovalProps) {
  const queryClient = useQueryClient();

  const { mutate: approveProfile, isPending } = useMutation({
    mutationFn: () => approveUserProfile(userId),
    onSuccess: (res) => {
      toast.success(res.message || "Profile approved successfully");
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      toast.error((error as any).data?.message || "Failed to approve profile");
    },
  });

  if (isApproved) {
    return (
      <Button size="sm" variant="outline" disabled>
        Approved
      </Button>
    );
  }

  return (
    <Button size="sm" disabled={isPending} onClick={() => approveProfile()}>
      {isPending ? "Approving..." : "Approve"}
    </Button>
  );
}
