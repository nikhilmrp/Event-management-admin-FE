"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../table";
import Checkbox from "@/components/form/input/Checkbox";

export interface ColumnDef<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T, index: number) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

interface BaseBasicTableProps<T> {
  data?: T[];
  columns?: ColumnDef<T>[];
  loading?: boolean;
  enableRowSelection?: boolean;
  getRowId?: (row: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
  minWidth?: string;
}

type BasicTableProps<T> = BaseBasicTableProps<T> &
  (
    | {
        enableRowSelection?: true;
        enableMultiRowSelection: true;
        onRowSelect?: (rows: T[]) => void;
      }
    | {
        enableRowSelection?: true;
        enableMultiRowSelection?: false;
        onRowSelect?: (row: T | null) => void;
      }
    | {
        enableRowSelection?: false;
        enableMultiRowSelection?: never;
        onRowSelect?: never;
      }
  );

const headerCellClass =
  "px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400";
const bodyCellClass = "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400";

function defaultGetRowId<T>(row: T, index: number): string | number {
  const record = row as Record<string, unknown>;
  if (record.id !== undefined && record.id !== null) {
    return record.id as string | number;
  }
  return index;
}

function BasicTable<T>({
  data = [],
  columns = [],
  loading = false,
  enableRowSelection = false,
  enableMultiRowSelection = false,
  onRowSelect,
  getRowId = defaultGetRowId,
  emptyMessage = "No data available",
  className = "",
  minWidth = "min-w-full",
}: BasicTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  const rowIdMap = useMemo(() => data.map((row, index) => getRowId(row, index)), [data, getRowId]);

  const selectedRows = useMemo(
    () => data.filter((_, index) => selectedIds.has(rowIdMap[index])),
    [data, rowIdMap, selectedIds]
  );

  useEffect(() => {
    if (!enableRowSelection || !onRowSelect) return;

    if (enableMultiRowSelection) {
      (onRowSelect as (rows: T[]) => void)(selectedRows);
    } else {
      (onRowSelect as (row: T | null) => void)(selectedRows[0] ?? null);
    }
  }, [selectedRows, enableRowSelection, enableMultiRowSelection, onRowSelect]);

  const isAllSelected = data.length > 0 && selectedIds.size === data.length;

  const toggleRow = useCallback(
    (rowId: string | number) => {
      setSelectedIds((prev) => {
        if (enableMultiRowSelection) {
          const next = new Set(prev);
          if (next.has(rowId)) {
            next.delete(rowId);
          } else {
            next.add(rowId);
          }
          return next;
        }
        return prev.has(rowId) ? new Set() : new Set([rowId]);
      });
    },
    [enableMultiRowSelection]
  );

  const toggleAll = useCallback(() => {
    if (!enableMultiRowSelection) return;

    setSelectedIds((prev) => (prev.size === data.length ? new Set() : new Set(rowIdMap)));
  }, [data.length, enableMultiRowSelection, rowIdMap]);

  const handleRowClick = useCallback(
    (rowId: string | number) => {
      if (!enableRowSelection) return;
      toggleRow(rowId);
    },
    [enableRowSelection, toggleRow]
  );

  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] ${className}`}
    >
      <div className="relative max-w-full overflow-x-auto">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-gray-900/60">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-brand-500" />
          </div>
        )}
        <div className={minWidth}>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {enableRowSelection && (
                  <TableCell isHeader className={`${headerCellClass} w-12`}>
                    {enableMultiRowSelection ? (
                      <Checkbox
                        id="select-all-rows"
                        checked={isAllSelected}
                        onChange={toggleAll}
                      />
                    ) : null}
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    isHeader
                    className={column.headerClassName ?? headerCellClass}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {!loading && data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                    className="px-5 py-8 text-center text-gray-500 text-theme-sm dark:text-gray-400"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => {
                  const rowId = rowIdMap[index];
                  const isSelected = selectedIds.has(rowId);

                  return (
                    <TableRow
                      key={rowId}
                      onClick={() => handleRowClick(rowId)}
                      className={
                        enableRowSelection
                          ? `cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-brand-50 dark:bg-brand-500/10"
                                : "hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                            }`
                          : undefined
                      }
                    >
                      {enableRowSelection && (
                        <TableCell
                          className="w-12 px-5 py-4"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          <Checkbox
                            id={`select-row-${rowId}`}
                            checked={isSelected}
                            onChange={() => toggleRow(rowId)}
                          />
                        </TableCell>
                      )}
                      {columns.map((column) => (
                        <TableCell
                          key={column.key}
                          className={column.cellClassName ?? bodyCellClass}
                        >
                          {column.cell(row, index)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default BasicTable;
