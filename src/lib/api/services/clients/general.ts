import { networkCall } from "../../config";
import { API_ENDPOINTS } from "../../endpoints";

export interface ClientLocation {
  id: number;
  name: string;
}

export interface ClientEventVendor {
  vendor_profile_id: number;
  business_name: string;
  pricing_type: string;
  amount: number;
}

export interface ClientEvent {
  id: number;
  event_name: string;
  event_priority: string;
  estimated_budget: number;
  preferred_date: string;
  status: string;
  total_amount: number;
  vendors: ClientEventVendor[];
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: ClientLocation;
  events: ClientEvent[];
}

export const getAllClients = async () => {
  try {
    const response = await networkCall<Client[]>(API_ENDPOINTS.GET_ALL_CLIENTS, {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
