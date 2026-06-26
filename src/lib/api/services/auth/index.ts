import { networkCall } from "../../config";
import { API_ENDPOINTS } from "../../endpoints";

export const logOut = async () => {
  try {
    const response = await networkCall(API_ENDPOINTS.LOGOUT, {
      method: "POST",
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
