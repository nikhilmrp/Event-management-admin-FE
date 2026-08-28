import dayjs from "dayjs";

export const formatDate = (dateStr?: string) =>
  dateStr ? dayjs(dateStr).format("DD-MM-YYYY") : "—";

export const formatCurrency = (amount?: number) =>
  amount === undefined || amount === null
    ? "—"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
