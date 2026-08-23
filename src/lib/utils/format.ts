export const formatDate = (dateStr?: string) =>
  dateStr ? new Date(dateStr).toLocaleDateString() : "—";

export const formatCurrency = (amount?: number) =>
  amount === undefined || amount === null
    ? "—"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
