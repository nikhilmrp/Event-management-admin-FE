import { networkCall } from "../../config";
import { API_ENDPOINTS } from "../../endpoints";

export type ProfileRole = "agent" | "vendor";

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
