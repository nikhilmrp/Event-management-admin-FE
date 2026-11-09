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

export enum EventPriority {
  LOW = "low",
  MODERATE = "moderate",
  HIGH = "high",
}

export interface AgentEventDetails {
  id: number;
  event_name: string;
  event_priority: EventPriority;
  estimated_budget: number;
  preferred_date: string;
  additional_notes: string | null;
  status: string;
  total_amount: number;
  payment_receipts: string[];
  confirmed_at: string | null;
}

export interface AgentEventAgent {
  id: number;
  name: string;
  email: string | null;
  phone: string;
}

export interface AgentEvent {
  client: AgentEventClient;
  event: AgentEventDetails;
  vendors: ClientEventVendor[];
  agent: AgentEventAgent;
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

export const completeEvent = async (eventId: number | string) => {
  try {
    const response = await networkCall<AgentEventDetails>(
      `${API_ENDPOINTS.COMPLETE_EVENT}/${eventId}/complete`,
      {
        method: "PATCH",
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
