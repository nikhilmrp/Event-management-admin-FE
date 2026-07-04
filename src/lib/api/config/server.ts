import axios from "axios";
import { cookies } from "next/headers";
import { API_CONFIG } from "./index";

export async function serverNetworkCall(url: string, options: { method: string; body?: unknown }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios({
    baseURL: API_CONFIG.baseUrl,
    url,
    method: options.method,
    data: options.body,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response;
}
