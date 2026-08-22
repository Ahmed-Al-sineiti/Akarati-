"use client";

import type { ComponentType } from "react";
import { MoreVertical, Power } from "lucide-react";

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
          <MoreVertical className="h-4 w-4" strokeWidth={1.5} />
        </button>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          className={
            "flex w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-accent-border font-body text-[13px] font-semibold text-accent transition-colors px-3 py-[9px] " +
            (open ? "bg-accent-soft" : "bg-white hover:bg-accent-soft")
          }
        >
          Actions
          <MoreVertical className="h-4 w-4" strokeWidth={1.5} />
        </button>
      )}

      {open && (
        <div
          className={
            "absolute z-20 flex w-[214px] flex-col rounded-[8px] border border-border-soft bg-white py-[6px] shadow-[0_14px_32px_rgba(15,23,42,0.14)] end-0 " +
            (flipUp ? "bottom-[38px]" : "top-[38px]")
          }
        >
          {items.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="flex cursor-pointer items-center gap-[9px] px-3 py-[7px] text-[13px] text-ink-soft hover:bg-page"
            >
              <Icon className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
              {label}
            </span>
          ))}
          <span className="mt-1 flex cursor-pointer items-center gap-[9px] border-t border-border-faint px-3 pt-[8px] pb-[6px] text-[13px] font-semibold text-red hover:bg-red/5">
            <Power className="h-4 w-4 text-red" strokeWidth={1.5} />
            Request Termination
          </span>
        </div>
      )}
    </span>
  );
}
