import { networkCall } from "../../config";
import { API_ENDPOINTS } from "../../endpoints";
import { ClientEventVendor, ClientLocation } from "../clients/general";

export interface AgentEventClient {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: ClientLocation;
}

export interface AgentEventDetails {
  id: number;
  event_name: string;
  event_priority: string;
  estimated_budget: number;
  preferred_date: string;
  additional_notes: string | null;
  status: string;
  total_amount: number;
  payment_receipt_url: string | null;
  confirmed_at: string | null;
}

export interface AgentEvent {
  client: AgentEventClient;
  event: AgentEventDetails;
  vendors: ClientEventVendor[];
}

export const getEventsByStatus = async (statuses: string[]) => {
  try {
    const query = `status=${statuses.join(",")}`;
    const response = await networkCall<AgentEvent[]>(`${API_ENDPOINTS.GET_ALL_EVENTS}?${query}`, {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
