import { VendorType } from "@/lib/api/services/configrations/vendortype";
import { ColumnDef } from "../ui/table/BasicTable";
import Badge from "../ui/badge/Badge";
import { Location } from "@/lib/api/services/configrations/location";
import { VendorCategory } from "@/lib/api/services/configrations/vendorCategries";
import DisplayVendorTypeFromId from "../table-cells/configration-scrns/DisplayVendorTypeFromId";

export const VENDOR_TYPE_COLUMNS: ColumnDef<VendorType>[] = [
  {
    key: "name",
    header: "Name",
    cell: (row: any) => <div>{row.name}</div>,
  },
  {
    key: "commission_percentage",
    header: "Commission Percentage",
    cell: (row: any) => <div>{row.commission_percentage}</div>,
  },
  {
    key: "status",
    header: "Status",
    cell: (row: any) => (
      <Badge color={row.status ? "success" : "error"}>{row.status ? "Active" : "Inactive"}</Badge>
    ),
  },
];

export const LOCATION_COLUMNS: ColumnDef<Location>[] = [
  {
    key: "name",
    header: "Name",
    cell: (row: any) => <div>{row.name}</div>,
  },
  {
    key: "status",
    header: "Status",
    cell: (row: any) => (
      <Badge color={row.status ? "success" : "error"}>{row.status ? "Active" : "Inactive"}</Badge>
    ),
  },
];

export const VENDOR_CATEGORY_COLUMNS: ColumnDef<VendorCategory>[] = [
  {
    key: "name",
    header: "Name",
    cell: (row: any) => <div>{row.name}</div>,
  },
  {
    key: "vendor_type_id",
    header: "Vendor Type",
    cell: (row: any) => <DisplayVendorTypeFromId id={row.vendor_type_id} />,
  },
  {
    key: "status",
    header: "Status",
    cell: (row: any) => (
      <Badge color={row.status ? "success" : "error"}>{row.status ? "Active" : "Inactive"}</Badge>
    ),
  },
];
