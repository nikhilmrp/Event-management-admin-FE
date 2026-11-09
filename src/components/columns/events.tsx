import AgentDetailsModal from "@/components/modals/events/AgentDetailsModal";
import PaymentReceiptsModal from "@/components/modals/events/PaymentReceiptsModal";
import ProfileViewModal from "@/components/modals/profile/ProfileViewModal";
import Badge from "@/components/ui/badge/Badge";
import { AgentEvent, EventPriority } from "@/lib/api/services/events/general";
import { ProfileRole } from "@/lib/api/services/profiles/general";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ColumnDef } from "../ui/table/BasicTable";
import MarkEventComplete from "./_components/MarkEventComplete";

const PRIORITY_BADGE_COLOR: Record<EventPriority, "success" | "warning" | "error"> = {
  [EventPriority.LOW]: "success",
  [EventPriority.MODERATE]: "warning",
  [EventPriority.HIGH]: "error",
};

export const EVENT_COLUMNS: ColumnDef<AgentEvent>[] = [
  {
    key: "client_name",
    width: 150,
    header: "Client Name",
    cell: (row) => <div>{row.client.name}</div>,
  },
  {
    key: "priority",
    header: "Priority",
    cell: (row) => (
      <Badge color={PRIORITY_BADGE_COLOR[row.event.event_priority]} size="sm">
        <span className="capitalize">{row.event.event_priority}</span>
      </Badge>
    ),
  },
  { key: "phone", header: "Phone", cell: (row) => <div>{row.client.phone}</div> },
  {
    key: "event_name",
    header: "Event Name",
    width: 150,
    cell: (row) => <div>{row.event.event_name}</div>,
  },
  {
    key: "agent",
    header: "Agent",
    width: 150,
    cell: (row) => (
      <div className="flex items-center gap-2">
        <span>{row.agent?.name || "—"}</span>
        {row.agent && <AgentDetailsModal agent={row.agent} />}
      </div>
    ),
  },
  {
    key: "location",
    header: "Location",
    cell: (row) => <div>{row.client.location?.name ?? "—"}</div>,
  },
  {
    key: "date",
    header: "Date",
    width: 120,
    cell: (row) => <div>{formatDate(row.event.preferred_date)}</div>,
  },
  {
    key: "vendor",
    header: "Vendors Business Names",
    width: 200,
    cell: (row) =>
      row.vendors?.length ? (
        <div className="flex flex-wrap items-center gap-x-1">
          {row.vendors.map((vendor, idx) => (
            <span key={vendor.vendor_profile_id} className="flex items-center">
              <ProfileViewModal
                profileId={vendor.vendor_profile_id}
                role={ProfileRole.VENDOR}
                trigger={
                  <span className="text-brand-500 hover:underline cursor-pointer">
                    {vendor.business_name}
                  </span>
                }
              />
              {idx < row.vendors.length - 1 && <span>,</span>}
            </span>
          ))}
        </div>
      ) : (
        <div>—</div>
      ),
  },
  {
    key: "total_amount",
    header: "Total Amount",
    cell: (row) => <div>{formatCurrency(row.event.total_amount)}</div>,
  },
];

export const ADVANCE_PAID_EVENT_COLUMNS: ColumnDef<AgentEvent>[] = [
  ...EVENT_COLUMNS,
  {
    key: "action",
    header: "Action",
    cell: (row) => (
      <div className="flex gap-2 items-center">
        <PaymentReceiptsModal urls={row.event.payment_receipts ?? []} />
        <MarkEventComplete eventId={row.event.id} eventName={row.event.event_name} />
      </div>
    ),
  },
];

export const FULLY_PAID_EVENT_COLUMNS: ColumnDef<AgentEvent>[] = [
  ...EVENT_COLUMNS,
  {
    key: "action",
    header: "Action",
    cell: (row) => <PaymentReceiptsModal urls={row.event.payment_receipts ?? []} />,
  },
];
