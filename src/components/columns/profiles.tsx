import { ProfileDetails } from "@/lib/api/services/profiles/general";
import { ColumnDef } from "../ui/table/BasicTable";

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
];
