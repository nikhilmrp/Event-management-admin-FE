"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../ui/button";
import { Modal } from "../../ui/modal";
import Label from "@/components/form/input/Label";
import Input from "@/components/form/input/InputField";
import ToggleButton from "@/components/form/ToggleButton";
import { toast } from "@/components/ui/toast";
import { createLocation } from "@/lib/api/services/configrations/location";

const locationSchema = yup.object({
  name: yup.string().trim().required("Location name is required"),
  status: yup.boolean().required(),
});

type LocationFormData = yup.InferType<typeof locationSchema>;

interface AddLocationModalProps {
  onSuccess?: () => void;
}

export default function AddLocationModal({ onSuccess }: AddLocationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LocationFormData>({
    resolver: yupResolver(locationSchema),
    defaultValues: {
      name: "",
      status: true,
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data: LocationFormData) => {
    try {
      const res = await createLocation({
        name: data.name,
        status: data.status,
      });
      toast.success((res.data as { message: string }).message || "Location created successfully");
      onSuccess?.();
      handleClose();
    } catch (error) {
      toast.error((error as any).data.message);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add Location</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="min-w-md p-6">
          <h2 className="text-lg font-medium mb-4">Add Location</h2>
          <p className="text-sm text-gray-500 mb-4">Add a new location to the configuration</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Location Name</Label>
              <Input
                type="text"
                placeholder="Enter location name"
                error={!!errors.name}
                hint={errors.name?.message}
                {...register("name")}
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
              {isSubmitting ? "Adding..." : "Add Location"}
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
