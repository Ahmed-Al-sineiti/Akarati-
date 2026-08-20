"use client";

import {
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  Phone,
  CircleCheck,
  FilePlus,
  FileText,
  History,
  Receipt,
  Wallet,
} from "lucide-react";
import type { Property, SortDir, SortKey } from "@/types/property";
import { fmtMoney, fmtPct } from "@/lib/format";
import { ActionsMenu } from "./ActionsMenu";

const dropdownItems = [
  { label: "Update Status", icon: CircleCheck },
  { label: "Create Receipt", icon: FilePlus },
  { label: "View Sell", icon: FileText },
  { label: "View History", icon: History },
  { label: "View Vouchers", icon: Receipt },
  { label: "Payment Summary", icon: Wallet },
];

function SortableHeader({
  label,
  unit,
  sortKey,
  activeKey,
  dir,
  onSort,
}: {
  label: string;
  unit: string;
  sortKey: SortKey;
  activeKey: SortKey | null;
  dir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const active = activeKey === sortKey;
  const Icon = active ? (dir === "asc" ? ArrowUp : ArrowDown) : ChevronsUpDown;

  return (
    <th
      scope="col"
      tabIndex={0}
      aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
      onClick={() => onSort(sortKey)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSort(sortKey);
        }
      }}
      className={
        "sticky top-0 z-10 cursor-pointer border-b border-border px-[14px] py-[11px] text-left align-middle transition-colors select-none " +
        (active ? "bg-accent-toggle" : "bg-[#F6F8FB] hover:bg-hover")
      }
    >
      <span
        className={
          "flex items-center gap-[5px] text-[14px] font-bold tracking-[0.24px] " +
          (active ? "text-accent" : "text-ink-soft")
        }
      >
        {label}
        <Icon className="h-[13px] w-[13px]" strokeWidth={1.5} />
      </span>
      <span className="block text-[10px] font-medium text-faint">{unit}</span>
    </th>
  );
}

export function PropertiesTable({
  properties,
  sortKey,
  sortDir,
  onSort,
  openMenuId,
  onToggleMenu,
}: {
  properties: Property[];
  sortKey: SortKey | null;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
  openMenuId: string | null;
  onToggleMenu: (id: string) => void;
}) {
  return (
    <div>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className="sticky top-0 z-10 border-b border-border bg-[#F6F8FB] px-[14px] py-[11px] text-left align-middle">
              <span className="text-[14px] font-bold tracking-[0.24px] text-ink-soft">
                Property
              </span>
            </th>
            <th className="sticky top-0 z-10 border-b border-border bg-[#F6F8FB] px-[14px] py-[11px] text-left align-middle">
              <span className="text-[14px] font-bold tracking-[0.24px] text-ink-soft">
                Owners
              </span>
            </th>
            <SortableHeader
              label="Selling Price"
              unit="AED"
              sortKey="price"
              activeKey={sortKey}
              dir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Total Paid"
              unit="AED / %"
              sortKey="paid"
              activeKey={sortKey}
              dir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Total Overdue"
              unit="AED / %"
              sortKey="due"
              activeKey={sortKey}
              dir={sortDir}
              onSort={onSort}
            />
            <th className="sticky top-0 z-10 border-b border-border bg-[#F6F8FB] px-[14px] py-[11px] text-left align-middle">
              <span className="text-[14px] font-bold tracking-[0.24px] text-ink-soft">
                Payment Progress
              </span>
            </th>
            <SortableHeader
              label="Next Installment"
              unit="Date · Days"
              sortKey="next"
              activeKey={sortKey}
              dir={sortDir}
              onSort={onSort}
            />
            <th className="sticky top-0 z-10 border-b border-border bg-[#F6F8FB] px-[14px] py-[11px] text-left align-middle">
              <span className="text-[14px] font-bold tracking-[0.24px] text-ink-soft">
                Actions
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p, i) => {
            const remaining = Math.max(0, 100 - p.paidPct - p.duePct);
            const paidColor = p.paidPct > 0 ? "text-green-strong" : "text-faint";
            const dueColor = p.duePct > 0 ? "text-red-strong" : "text-faint";
            const flipUp = i >= properties.length - 3 && properties.length > 3;

            return (
              <tr key={p.id} className="border-b border-border-faint transition-colors hover:bg-row-hover">
                <td className="px-[14px] py-3 align-middle">
                  <a
                    href="#"
                    className="block text-[13px] leading-[1.3] font-medium text-accent transition-colors hover:text-accent-hover hover:underline"
                    dir="ltr"
                  >
                    {p.name}
                  </a>
                </td>
                <td className="px-[14px] py-3 align-middle">
                  <span className="line-clamp-2 text-[13px] leading-[1.3] text-ink-soft">
                    {p.owners}
                  </span>
                </td>
                <td className="px-[14px] py-3 align-middle">
                  <span
                    className="text-[13px] tabular-nums text-ink"
                    dir="ltr"
                  >
                    {fmtMoney(p.price)}
                  </span>
                </td>
                <td className="px-[14px] py-3 align-middle">
                  <span
                    className={"block text-[13px] font-semibold tabular-nums " + paidColor}
                    dir="ltr"
                  >
                    {fmtMoney(p.paid)}
                  </span>
                  <span className="block text-[11px] tabular-nums text-green" dir="ltr">
                    {fmtPct(p.paidPct)}
                  </span>
                </td>
                <td className="px-[14px] py-3 align-middle">
                  <span
                    className={"block text-[13px] font-semibold tabular-nums " + dueColor}
                    dir="ltr"
                  >
                    {fmtMoney(p.due)}
                  </span>
                  <span
                    className={
                      "block text-[11px] tabular-nums " +
                      (p.duePct > 0 ? "text-red-soft" : "text-faint")
                    }
                    dir="ltr"
                  >
                    {fmtPct(p.duePct)}
                  </span>
                </td>
                <td className="px-[14px] py-3 align-middle">
                  <span className="flex h-[7px] w-full max-w-[150px] overflow-hidden rounded-full bg-track" dir="ltr">
                    <span className="h-full bg-green" style={{ width: `${p.paidPct}%` }} />
                    <span className="h-full bg-red" style={{ width: `${p.duePct}%` }} />
                  </span>
                  <span className="mt-[5px] flex items-center gap-[5px] text-[10px] tabular-nums whitespace-nowrap" dir="ltr">
                    <span className="text-green">{fmtPct(p.paidPct)}</span>
                    <span className="text-placeholder">·</span>
                    <span className={p.duePct > 0 ? "text-red-soft" : "text-faint"}>
                      {fmtPct(p.duePct)}
                    </span>
                    <span className="text-placeholder">·</span>
                    <span className="text-faint">{fmtPct(remaining)}</span>
                  </span>
                </td>
                <td className="px-[14px] py-3 align-middle">
                  <span className="block text-[12px] font-semibold tabular-nums text-ink" dir="ltr">
                    {p.nextDate}
                  </span>
                  <span className="block text-[10px] text-faint" dir="ltr">
                    {p.nextDays} Days
                  </span>
                  <span className="block text-[11px] text-faint" dir="ltr">
                    {fmtMoney(p.nextAmount)} AED
                  </span>
                </td>
                <td className="px-[14px] py-3 align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Call"
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[5px] border border-border bg-white text-ink-muted transition-colors hover:border-accent-border hover:bg-accent-soft hover:text-accent"
                    >
                      <Phone className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <ActionsMenu
                      variant="icon"
                      open={openMenuId === p.id}
                      onToggle={() => onToggleMenu(p.id)}
                      items={dropdownItems}
                      flipUp={flipUp}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
