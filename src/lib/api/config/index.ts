import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
};

const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  message: string;
  stack: string;
}

export const networkCall = async <T>(
  url: string,
  options: { method: string; body?: unknown }
): Promise<AxiosResponse<ApiResponse<T>>> => {
  try {
    const response = await apiClient<ApiResponse<T>>({
      url,
      method: options.method ?? "GET",
      data: options.body,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error) && error.response?.data !== undefined) {
      throw error.response as AxiosResponse<ApiError>;
    }
    throw error;
  }
};
