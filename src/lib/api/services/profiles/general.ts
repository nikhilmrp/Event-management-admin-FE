import { networkCall } from "../../config";
import { API_ENDPOINTS } from "../../endpoints";

export enum ProfileRole {
  AGENT = "agent",
  VENDOR = "vendor",
}

export interface ProfileDetails {
  id: number;
  username: string;
  status: string;
  locations: string[];
  email: string;
  phone: string;
  email_verified: boolean;
  createdAt: string;
  business_name?: string;
  vendor_type_name?: string;
  vendor_categories?: string[];
}

export const getProfileDetailsByRole = async (role: ProfileRole) => {
  try {
    const response = await networkCall<ProfileDetails[]>(
      `${API_ENDPOINTS.GET_PROFILE_DETAILS}?role=${role}`,
      {
        method: "GET",
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface VendorType {
  id: number;
  name: string;
}

export interface ServiceLocation {
  id: number;
  name: string;
}

export interface VendorCategory {
  id: number;
  name: string;
}

export interface PricingDetail {
  id: number;
  pricing_type: string;
  amount: number;
}

export interface WorkGalleryImage {
  id: number;
  image_url: string;
}

export interface BankDetails {
  id: number;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  ifsc_code: string;
  branch_name: string;
  upi_id: string;
  contact_number: string;
}

export interface VendorProfileDetails {
  id: number;
  user_id: number;
  business_name: string;
  description: string;
  address: string;
  phone_number: string;
  email: string;
  profile_step: number;
  profile_completed: boolean;
  vendor_type: VendorType;
  service_locations: ServiceLocation[];
  vendor_categories: VendorCategory[];
  pricing_details: PricingDetail[];
  work_gallery: WorkGalleryImage[];
  bank_details: BankDetails;
}

export interface AgentProfileDetails {
  id: number;
  user_id: number;
  address: string;
  profile_step: number;
  profile_completed: boolean;
  service_locations: ServiceLocation[];
  bank_details: BankDetails;
}

export const getProfileDetailsById = async (
  profileId: number | string,
  role: ProfileRole
) => {
  try {
    const response = await networkCall<VendorProfileDetails | AgentProfileDetails>(
      `${API_ENDPOINTS.GET_PROFILE_DETAILS_BY_ID}/${profileId}?role=${role}`,
      {
        method: "GET",
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
