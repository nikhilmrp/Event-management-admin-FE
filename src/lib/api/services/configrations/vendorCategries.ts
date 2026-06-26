import { networkCall } from "../../config";
import { API_ENDPOINTS } from "../../endpoints";

interface CreateVendorCategoryProps {
  name: string;
  vendor_type_id: number;
  status: boolean;
}

export interface VendorCategory {
  id: number;
  name: string;
  vendor_type_id: number;
  status: boolean;
}

export const createVendorCategory = async (data: CreateVendorCategoryProps) => {
  try {
    const response = await networkCall(API_ENDPOINTS.CREATE_VENDOR_CATEGORY, {
      method: "POST",
      body: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllVendorCategories = async () => {
  try {
    const response = await networkCall<VendorCategory[]>(API_ENDPOINTS.GET_ALL_VENDOR_CATEGORIES, {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
