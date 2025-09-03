"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader2, MoreHorizontal } from "lucide-react";

export type Pegawai = {
  id: string;
  namaPegawai: string;
  rfid: string;
  email: string;
  jobTitle: string;
  status: boolean;
  workHour: number | null;
};

export const columns: ColumnDef<Pegawai>[] = [
  {
    accessorKey: "namaPegawai",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Pegawai
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rfid",
    header: "Card ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "jobTitle",
    header: "Jabatan",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isStatus = row.getValue("status") || false;
      return (
        <Badge className={cn("bg-slate-500", isStatus && " bg-emerald-700")}>
          {isStatus ? "on Work" : "off Work"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "workHour",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Work Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isWorkTime = row.getValue("workHour") || null;
      return (
        <div>
          {isWorkTime ? (
            <>
              <h2 className="text-base">{row.getValue("workHour")} hours</h2>
            </>
          ) : (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-secondary text-sky-700" />
            </>
          )}
        </div>
      );
    },
  },
];
