import { networkCall } from "../../config";
import { API_ENDPOINTS } from "../../endpoints";

interface CreateVendorTypeProps {
  name: string;
  commission_percentage: number;
  status: boolean;
}

export const createVendorType = async (data: CreateVendorTypeProps) => {
  try {
    const response = await networkCall(API_ENDPOINTS.CREATE_VENDOR_TYPE, {
      method: "POST",
      body: data,
    });
    return response;
  } catch (error) {
    console.error("Error creating vendor type:", error);
    throw error;
  }
};
