import { toast as reactToastify, type Id, type ToastOptions } from "react-toastify";

export type ToastStatus = "success" | "failed" | "info";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

function showToast(status: ToastStatus, message: string, options?: ToastOptions) {
  const mergedOptions = { ...defaultOptions, ...options };

  switch (status) {
    case "success":
      return reactToastify.success(message, mergedOptions);
    case "failed":
      return reactToastify.error(message, mergedOptions);
    case "info":
      return reactToastify.info(message, mergedOptions);
  }
}

export const toast = {
  success: (message: string, options?: ToastOptions) => showToast("success", message, options),
  error: (message: string, options?: ToastOptions) => showToast("failed", message, options),
  info: (message: string, options?: ToastOptions) => showToast("info", message, options),
  dismiss: (id?: Id) => reactToastify.dismiss(id),
};
