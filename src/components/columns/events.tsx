import { AgentEvent } from "@/lib/api/services/events/general";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ColumnDef } from "../ui/table/BasicTable";

export const EVENT_COLUMNS: ColumnDef<AgentEvent>[] = [
  { key: "client_name", header: "Client Name", cell: (row) => <div>{row.client.name}</div> },
  { key: "phone", header: "Phone", cell: (row) => <div>{row.client.phone}</div> },
  { key: "event_name", header: "Event Name", cell: (row) => <div>{row.event.event_name}</div> },
  {
    key: "location",
    header: "Location",
    cell: (row) => <div>{row.client.location?.name ?? "—"}</div>,
  },
  {
    key: "date",
    header: "Date",
    cell: (row) => <div>{formatDate(row.event.preferred_date)}</div>,
  },
  {
    key: "vendor",
    header: "Vendors Business Names",
    cell: (row) => (
      <div>{row.vendors?.map((vendor) => vendor.business_name).join(", ") || "—"}</div>
    ),
  },
  {
    key: "total_amount",
    header: "Total Amount",
    cell: (row) => <div>{formatCurrency(row.event.total_amount)}</div>,
  },
];
