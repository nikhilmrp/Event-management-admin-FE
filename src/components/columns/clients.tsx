import { Client } from "@/lib/api/services/clients/general";
import { ColumnDef } from "../ui/table/BasicTable";

export const CLIENT_COLUMNS: ColumnDef<Client>[] = [
  { key: "name", header: "Client Name", cell: (row) => <div>{row.name}</div> },
  { key: "phone", header: "Phone", cell: (row) => <div>{row.phone}</div> },
  { key: "email", header: "Email", cell: (row) => <div>{row.email}</div> },
  { key: "location", header: "Location", cell: (row) => <div>{row.location?.name ?? "—"}</div> },
];
