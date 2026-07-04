"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "../../ui/modal";
import Label from "@/components/form/input/Label";
import Input from "@/components/form/input/InputField";
import ToggleButton from "@/components/form/ToggleButton";
import { createVendorType } from "@/lib/api/services/configrations/vendortype";
import { toast } from "@/components/ui/toast";
import Button from "@/components/ui/button/Button";

const vendorTypeSchema = yup.object({
  name: yup.string().trim().required("Vendor type name is required"),
  commission_percentage: yup
    .number()
    .typeError("Commission must be a number")
    .required("Commission is required")
    .min(0, "Commission must be at least 0")
    .max(100, "Commission cannot exceed 100"),
  status: yup.boolean().required(),
});

type VendorTypeFormData = yup.InferType<typeof vendorTypeSchema>;

interface AddVendorTypeModalProps {
  onSuccess?: () => void;
}

export default function AddVendorTypeModal({ onSuccess }: AddVendorTypeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<VendorTypeFormData>({
    resolver: yupResolver(vendorTypeSchema),
    defaultValues: {
      name: "",
      commission_percentage: undefined,
      status: true,
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const { mutateAsync: createVendorTypeMutation, isPending: isSubmitting } = useMutation({
    mutationFn: createVendorType,
    onSuccess: (res) => {
      toast.success(
        (res.data as { message: string }).message || "Vendor type created successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["vendor-types"] });
      onSuccess?.();
      handleClose();
    },
    onError: (error) => {
      toast.error((error as any).data.message);
    },
  });

  const onSubmit = async (data: VendorTypeFormData) => {
    try {
      await createVendorTypeMutation({
        name: data.name,
        commission_percentage: data.commission_percentage,
        status: data.status,
      });
    } catch {
      // handled by mutation's onError
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add Vendor Type</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="min-w-md p-6">
          <h2 className="text-lg font-medium mb-4">Add Vendor Type</h2>
          <p className="text-sm text-gray-500 mb-4">Add a new vendor type to the configuration</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Vendor Type Name</Label>
              <Input
                type="text"
                placeholder="Enter vendor type name"
                error={!!errors.name}
                hint={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Commision %</Label>
                <Input
                  type="number"
                  placeholder="Enter commision %"
                  min="0"
                  max="100"
                  step={0.01}
                  error={!!errors.commission_percentage}
                  hint={errors.commission_percentage?.message}
                  {...register("commission_percentage", { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <ToggleButton
                      label={value ? "Active" : "Inactive"}
                      labelClassName="w-[50px]"
                      checked={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
            >
              {isSubmitting ? "Adding..." : "Add Vendor Type"}
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
