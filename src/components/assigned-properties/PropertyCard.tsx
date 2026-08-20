"use client";

import type { ReactNode } from "react";
import { Phone, CircleCheck, FilePlus, FileText, History, Receipt, Wallet } from "lucide-react";
import type { Property } from "@/types/property";
import { fmtMoney, fmtPct } from "@/lib/format";
import { ActionsMenu } from "./ActionsMenu";

const quickActions = [
  { label: "Call", icon: Phone },
  { label: "Update Status", icon: CircleCheck },
  { label: "Create Receipt", icon: FilePlus },
  { label: "View Sell", icon: FileText },
];

const moreItems = [
  { label: "View History", icon: History },
  { label: "View Vouchers", icon: Receipt },
  { label: "Payment Summary", icon: Wallet },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[62px] w-full flex-col justify-center gap-[5px] rounded-[6px] border border-border bg-white px-[14px] py-[11px]">
      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] font-medium text-label">
        {label}
      </span>
      <span className="flex w-full items-baseline gap-[7px]">{children}</span>
    </div>
  );
}

export function PropertyCard({
  property,
  menuOpen,
  onToggleMenu,
  flipUp,
}: {
  property: Property;
  menuOpen: boolean;
  onToggleMenu: () => void;
  flipUp: boolean;
}) {
  const remaining = Math.max(0, 100 - property.paidPct - property.duePct);
  const dueColor = property.duePct > 0 ? "text-red" : "text-faint";

  return (
    <div className="relative flex gap-5 rounded-[8px] border border-border bg-white p-[18px] shadow-[0_0_8px_rgba(1,21,64,0.04)]">
      <div className="grid min-w-0 flex-1 grid-cols-3 gap-x-[14px] gap-y-4">
        <Field label="Property">
          <span className="text-[16.5px] leading-[1.25] font-semibold tracking-[-0.165px] text-ink">
            {property.name}
          </span>
        </Field>
        <Field label="Owners">
          <span className="text-[16.5px] leading-[1.25] font-semibold tracking-[-0.165px] text-ink">
            {property.owners}
          </span>
        </Field>
        <Field label="Selling Price">
          <span className="text-[16.5px] leading-[1.25] font-semibold tracking-[-0.165px] text-ink">
            {fmtMoney(property.price)}
          </span>
          <span className="flex-none text-[12.5px] font-medium text-ink-muted">AED</span>
        </Field>

        <Field label="Total Paid">
          <span className="text-[16.5px] leading-[1.25] font-semibold tracking-[-0.165px] text-ink">
            {fmtMoney(property.paid)}
          </span>
          <span className="flex-none text-[12.5px] font-medium text-ink-muted">AED</span>
          <span className="ms-auto flex-none text-[13px] font-semibold text-green">
            {fmtPct(property.paidPct)}
          </span>
        </Field>
        <Field label="Total Overdue">
          <span className="text-[16.5px] leading-[1.25] font-semibold tracking-[-0.165px] text-ink">
            {fmtMoney(property.due)}
          </span>
          <span className="flex-none text-[12.5px] font-medium text-ink-muted">AED</span>
          <span className={"ms-auto flex-none text-[13px] font-semibold " + dueColor}>
            {fmtPct(property.duePct)}
          </span>
        </Field>
        <div className="flex min-h-[62px] flex-col justify-center gap-[5px] rounded-[6px] border border-border bg-white px-[14px] py-[11px]">
          <span className="text-[12.5px] font-medium text-label">Next Installment</span>
          <span className="flex items-baseline gap-[10px]">
            <span className="text-[16.5px] font-semibold text-ink">{property.nextDate}</span>
            <span className="text-[14px] font-semibold text-ink">
              {fmtMoney(property.nextAmount)}{" "}
              <span className="text-[12.5px] font-medium text-ink-muted">AED</span>
            </span>
            <span className="ms-auto text-[13px] font-semibold text-ink-muted">
              {property.nextDays} Days
            </span>
          </span>
        </div>

        <div className="col-span-3 flex items-center gap-[18px] border-t border-border-faint pt-[13px]">
          <span className="flex-none text-[12.5px] font-medium text-label">Payment Progress</span>
          <span className="flex h-2 flex-1 overflow-hidden rounded-full bg-border-faint" dir="ltr">
            <span className="h-full bg-green" style={{ width: `${property.paidPct}%` }} />
            <span className="h-full bg-red" style={{ width: `${property.duePct}%` }} />
          </span>
          <span className="flex flex-none gap-4 text-[12.5px] text-ink-soft">
            <span className="flex items-center gap-[6px]">
              <span className="h-2 w-2 rounded-full bg-green" />
              Paid {fmtPct(property.paidPct)}
            </span>
            <span className="flex items-center gap-[6px]">
              <span className="h-2 w-2 rounded-full bg-red" />
              Overdue {fmtPct(property.duePct)}
            </span>
            <span className="flex items-center gap-[6px]">
              <span className="h-2 w-2 rounded-full bg-placeholder" />
              Remaining {fmtPct(remaining)}
            </span>
          </span>
        </div>
      </div>

      <div className="flex w-[150px] flex-none flex-col gap-2">
        {quickActions.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="group flex cursor-pointer items-center gap-[7px] rounded-[6px] border border-border-soft bg-white px-[10px] py-[9px] font-body text-[13px] font-semibold whitespace-nowrap text-ink-soft transition-colors hover:border-accent-border hover:text-accent"
          >
            <Icon
              className="h-4 w-4 flex-none text-ink-muted transition-colors group-hover:text-accent"
              strokeWidth={1.5}
            />
            {label}
          </button>
        ))}
        <ActionsMenu
          variant="block"
          open={menuOpen}
          onToggle={onToggleMenu}
          items={moreItems}
          flipUp={flipUp}
        />
      </div>
    </div>
  );
}
