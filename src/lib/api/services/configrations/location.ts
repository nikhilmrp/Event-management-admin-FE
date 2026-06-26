import { networkCall } from "../../config";
import { API_ENDPOINTS } from "../../endpoints";

interface CreateLocationProps {
  name: string;
  status: boolean;
}

export interface Location {
  id: number;
  name: string;
  status: boolean;
  createdAt: Date;
}

export const createLocation = async (data: CreateLocationProps) => {
  try {
    const response = await networkCall(API_ENDPOINTS.CREATE_LOCATION, {
      method: "POST",
      body: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllLocations = async () => {
  try {
    const response = await networkCall<Location[]>(API_ENDPOINTS.GET_ALL_LOCATIONS, {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
