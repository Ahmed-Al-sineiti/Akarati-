"use client";

import type { ComponentType } from "react";
import { MoreVertical, ChevronDown, Power } from "lucide-react";

export type MenuItem = { label: string; icon: ComponentType<{ className?: string; strokeWidth?: number }> };

export function ActionsMenu({
  open,
  onToggle,
  items,
  flipUp = false,
  variant = "icon",
}: {
  open: boolean;
  onToggle: () => void;
  items: MenuItem[];
  flipUp?: boolean;
  variant?: "icon" | "block";
}) {
  return (
    <span className="relative">
      {variant === "icon" ? (
        <button
          type="button"
          aria-label="Row actions"
          aria-expanded={open}
          onClick={onToggle}
            className={
              "flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[5px] border transition-colors " +
              (open
                ? "border-accent-border bg-accent-soft text-accent"
                : "border-border bg-white text-ink-muted hover:border-accent-border hover:bg-accent-soft hover:text-accent")
            }
        >
          <MoreVertical className="h-4 w-4" strokeWidth={1.4} />
        </button>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          className={
            "flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] border font-body text-[13px] font-medium text-ink-soft transition-colors " +
            (open ? "border-accent-border bg-hover" : "border-[#c7d6e8] bg-white hover:bg-hover")
          }
        >
          <MoreVerticalDots />
          Actions
          <ChevronDown className="h-4 w-4 text-label" strokeWidth={1.4} />
        </button>
      )}

      {open && (
        <div
          className={
            "absolute z-20 flex w-[192px] flex-col rounded-[8px] border border-border-soft bg-white py-[6px] shadow-[0_14px_32px_rgba(15,23,42,0.14)] end-0 " +
            (flipUp ? "bottom-[38px]" : "top-[38px]")
          }
        >
          {items.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="flex cursor-pointer items-center gap-[9px] px-3 py-[8px] text-[13px] text-ink-soft hover:bg-page"
            >
              <Icon className="h-4 w-4 text-ink-muted" strokeWidth={1.4} />
              {label}
            </span>
          ))}
          <span className="flex cursor-pointer items-center gap-[9px] px-3 py-[8px] text-[13px] font-semibold text-red hover:bg-red/5">
            <Power className="h-4 w-4 text-red" strokeWidth={1.4} />
            Request Termination
          </span>
        </div>
      )}
    </span>
  );
}

function MoreVerticalDots() {
  return (
    <span className="flex flex-none flex-col items-center justify-center gap-[2px]">
      <span className="h-[3px] w-[3px] rounded-full bg-label" />
      <span className="h-[3px] w-[3px] rounded-full bg-label" />
      <span className="h-[3px] w-[3px] rounded-full bg-label" />
    </span>
  );
}
