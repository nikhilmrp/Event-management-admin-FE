"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "@/components/ui/modal";
import Badge from "@/components/ui/badge/Badge";
import { EyeIcon } from "@/icons";
import {
  getProfileDetailsById,
  ProfileRole,
  VendorProfileDetails,
} from "@/lib/api/services/profiles/general";

interface ProfileAprovalModalProps {
  profileId: number | string;
  role: ProfileRole;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">{title}</h3>
      {children}
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value || "-"}</p>
    </div>
  );
}

export default function ProfileViewModal({ profileId, role }: ProfileAprovalModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["profiles", role, profileId],
    queryFn: async () => (await getProfileDetailsById(profileId, role)).data,
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      console.log(data);
    }
  }, [isOpen, data]);

  const vendorData = role === ProfileRole.VENDOR ? (data as VendorProfileDetails) : undefined;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
      >
        <EyeIcon className="size-5" />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-full max-w-2xl m-4">
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Profile Aproval
          </h2>

          {isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>}

          {data && (
            <div className="space-y-6">
              {vendorData ? (
                <>
                  <Section title="Business Details">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                      <DetailItem label="Business Name" value={vendorData.business_name} />
                      <DetailItem label="Vendor Type" value={vendorData.vendor_type?.name} />
                      <DetailItem label="Mobile" value={vendorData.phone_number} />
                      <DetailItem label="Email" value={vendorData.email} />
                      <DetailItem label="Address" value={vendorData.address} />
                      <DetailItem label="Description" value={vendorData.description} />
                    </div>

                    {vendorData.vendor_categories?.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-1.5 text-xs text-gray-500 dark:text-gray-400">
                          Categories
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {vendorData.vendor_categories.map((category) => (
                            <Badge key={category.id} color="primary" size="sm">
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {vendorData.service_locations?.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-1.5 text-xs text-gray-500 dark:text-gray-400">
                          Service Locations
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {vendorData.service_locations.map((location) => (
                            <Badge key={location.id} color="info" size="sm">
                              {location.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Section>

                  <Section title="Pricing Details">
                    {vendorData.pricing_details?.length > 0 ? (
                      <div className="divide-y divide-gray-100 rounded-lg border border-gray-200 dark:divide-white/[0.05] dark:border-white/[0.05]">
                        {vendorData.pricing_details.map((pricing) => (
                          <div
                            key={pricing.id}
                            className="flex items-center justify-between px-4 py-2.5 text-sm"
                          >
                            <span className="capitalize text-gray-500 dark:text-gray-400">
                              {pricing.pricing_type.replace(/_/g, " ")}
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white/90">
                              ₹{pricing.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No pricing details added
                      </p>
                    )}
                  </Section>

                  <Section title="Work Gallery">
                    {vendorData.work_gallery?.length > 0 ? (
                      <div className="grid grid-cols-3 gap-3">
                        {vendorData.work_gallery.map((image) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={image.id}
                            src={image.image_url}
                            alt="Work sample"
                            className="h-24 w-full rounded-lg border border-gray-200 object-cover dark:border-white/[0.05]"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No images uploaded</p>
                    )}
                  </Section>
                </>
              ) : (
                <Section title="Personal Information">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    <DetailItem label="Address" value={data.address} />
                  </div>

                  {data.service_locations?.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-1.5 text-xs text-gray-500 dark:text-gray-400">
                        Service Locations
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {data.service_locations.map((location) => (
                          <Badge key={location.id} color="info" size="sm">
                            {location.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Section>
              )}

              <Section title="Bank Details">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <DetailItem label="Bank Name" value={data.bank_details?.bank_name} />
                  <DetailItem
                    label="Account Holder"
                    value={data.bank_details?.account_holder_name}
                  />
                  <DetailItem label="Account Number" value={data.bank_details?.account_number} />
                  <DetailItem label="IFSC Code" value={data.bank_details?.ifsc_code} />
                  <DetailItem label="Branch" value={data.bank_details?.branch_name} />
                  <DetailItem label="UPI ID" value={data.bank_details?.upi_id} />
                  <DetailItem label="Contact Number" value={data.bank_details?.contact_number} />
                </div>
              </Section>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
