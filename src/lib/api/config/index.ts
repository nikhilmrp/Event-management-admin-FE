import axios from "axios";
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

export const networkCall = async (url: string, options: { method: string; body: any }) => {
  try {
    const response = await apiClient({
      url,
      method: (options.method as string) ?? "GET",
      data: options.body,
    });
    return response.data;
  } catch (error) {
    console.error("Network call error:", error);
    throw error;
  }
};
