import Badge from "@/components/ui/badge/Badge";
import { ProfileDetails, ProfileRole, ProfileStatus } from "@/lib/api/services/profiles/general";
import { ColumnDef } from "../ui/table/BasicTable";
import ProfileViewModal from "../modals/profile/ProfileViewModal";
import ProfileApproval from "./_components/ProfileApproval";

const STATUS_BADGE_COLOR: Record<string, "success" | "warning" | "error"> = {
  [ProfileStatus.ACTIVE]: "success",
  [ProfileStatus.INACTIVE]: "warning",
  [ProfileStatus.SUSPENDED]: "error",
};

const STATUS_COLUMN: ColumnDef<ProfileDetails> = {
  key: "status",
  header: "Status",
  cell: (row) =>
    row.status ? (
      <Badge color={STATUS_BADGE_COLOR[row.status] ?? "light"} size="sm">
        <span className="capitalize">{row.status}</span>
      </Badge>
    ) : (
      <div>—</div>
    ),
};

const createActionColumn = (role: ProfileRole): ColumnDef<ProfileDetails>[] => [
  {
    key: "action",
    header: "Action",
    cell: (row) => (
      <div className="flex gap-2 items-center">
        <ProfileViewModal profileId={row.id} role={role} />
        <ProfileApproval
          userId={row.userId}
          name={row.business_name || row.username}
          isApproved={row.email_verified}
        />
      </div>
    ),
  },
];

export const AGENT_PROFILE_COLUMNS: ColumnDef<ProfileDetails>[] = [
  {
    key: "username",
    header: "Name",
    cell: (row) => <div>{row.username}</div>,
  },
  {
    key: "email",
    header: "Email",
    cell: (row) => <div>{row.email}</div>,
  },
  {
    key: "phone",
    header: "Phone",
    cell: (row) => <div>{row.phone}</div>,
  },
  {
    key: "locations",
    header: "Locations",
    cell: (row) => <div>{row.locations.join(", ")}</div>,
  },
  STATUS_COLUMN,
  ...createActionColumn(ProfileRole.AGENT),
];

export const VENDOR_PROFILE_COLUMNS: ColumnDef<ProfileDetails>[] = [
  {
    key: "business_name",
    header: "Business Name",
    cell: (row) => <div>{row.business_name}</div>,
  },
  {
    key: "username",
    header: "Name",
    cell: (row) => <div>{row.username}</div>,
  },
  {
    key: "vendor_type_name",
    header: "Vendor Type",
    cell: (row) => <div>{row.vendor_type_name}</div>,
  },
  {
    key: "vendor_categories",
    header: "Vendor Categories",
    cell: (row) => <div>{row.vendor_categories?.join(", ")}</div>,
  },
  {
    key: "email",
    header: "Email",
    cell: (row) => <div>{row.email}</div>,
  },
  {
    key: "phone",
    header: "Phone",
    cell: (row) => <div>{row.phone}</div>,
  },
  {
    key: "locations",
    header: "Locations",
    cell: (row) => <div>{row.locations.join(", ")}</div>,
  },
  STATUS_COLUMN,
  ...createActionColumn(ProfileRole.VENDOR),
];
