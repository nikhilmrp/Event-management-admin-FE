"use client";

import { FormSelect, SelectOption } from "@/components/form/input/SelectField";
import Label from "@/components/form/input/Label";
import ToggleButton from "@/components/form/ToggleButton";
import Button from "@/components/ui/button/Button";
import { Controller, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "@/components/form/input/InputField";
import { getVendorAllTypes } from "@/lib/api/services/configrations/vendortype";
import { createVendorCategory } from "@/lib/api/services/configrations/vendorCategries";
import { toast } from "react-toastify";

const vendorCategorySchema = yup.object({
  name: yup.string().trim().required("Vendor category name is required"),
  vendor_type_id: yup
    .number()
    .nullable()
    .transform((_, originalValue) =>
      originalValue === "" || originalValue == null ? null : Number(originalValue)
    )
    .required("Vendor type is required"),
  status: yup.boolean().required(),
});

type VendorCategoryFormData = {
  name: string;
  vendor_type_id: number | null;
  status: boolean;
};

const AddVendorCategoryModal = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VendorCategoryFormData>({
    resolver: yupResolver(vendorCategorySchema) as Resolver<VendorCategoryFormData>,
    defaultValues: {
      name: "",
      vendor_type_id: null,
      status: true,
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const { mutateAsync: createVendorCategoryMutation, isPending: isSubmitting } = useMutation({
    mutationFn: createVendorCategory,
    onSuccess: (res) => {
      toast.success(
        (res.data as { message: string }).message || "Vendor category created successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["vendor-categories"] });
      onSuccess?.();
      handleClose();
    },
    onError: (error) => {
      toast.error((error as any).data.message);
    },
  });

  const onSubmit = async (data: VendorCategoryFormData) => {
    try {
      await createVendorCategoryMutation({
        name: data.name,
        vendor_type_id: data.vendor_type_id ?? 0,
        status: data.status,
      });
    } catch {
      // handled by mutation's onError
    }
  };

  const { data: vendorTypes = [] } = useQuery({
    queryKey: ["vendor-types"],
    queryFn: async () => {
      const res = await getVendorAllTypes();
      return res.data?.map((vendorType) => ({
        label: vendorType.name,
        value: vendorType.id,
      })) as SelectOption[];
    },
  });

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add Vendor Category</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="min-w-md p-6">
          <h2 className="text-lg font-medium mb-4">Add Vendor Category</h2>
          <p className="text-sm text-gray-500 mb-4">
            Add a new vendor category to the configuration
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Vendor Category Name</Label>
              <Input
                type="text"
                placeholder="Enter vendor category name"
                error={!!errors.name}
                hint={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div>
              <Label>Vendor Type</Label>
              <FormSelect
                name="vendor_type_id"
                control={control}
                placeholder="Select vendor type"
                error={!!errors.vendor_type_id}
                hint={errors.vendor_type_id?.message}
                options={vendorTypes}
              />
            </div>
            <div className="flex items-center justify-start">
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
              {isSubmitting ? "Adding..." : "Add Vendor Category"}
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddVendorCategoryModal;
