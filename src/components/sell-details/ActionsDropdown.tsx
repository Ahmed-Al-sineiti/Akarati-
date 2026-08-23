"use client";

import { useEffect, useRef, useState } from "react";
import { UserRoundPlus, Undo2, RefreshCcw, CircleX, ChevronDown } from "lucide-react";

const items = [
  { label: "Reassign", icon: UserRoundPlus },
  { label: "Reassign to sender", icon: Undo2 },
  { label: "ePMS Resale", icon: RefreshCcw },
];

export function ActionsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={
          "flex h-9 cursor-pointer items-center gap-2 rounded-[6px] border px-4 font-body text-[13px] font-medium text-ink-soft transition-colors " +
          (open ? "border-accent-border bg-hover" : "border-[#c7d6e8] bg-white hover:bg-hover")
        }
      >
        <MoreVerticalDots />
        Actions
        <ChevronDown className="h-4 w-4 text-label" strokeWidth={1.4} />
      </button>

      {open && (
        <div className="absolute top-[42px] left-0 z-20 flex w-[192px] flex-col rounded-[8px] border border-border-soft bg-white py-[6px] shadow-[0_14px_32px_rgba(15,23,42,0.14)]">
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
            <CircleX className="h-4 w-4 text-red" strokeWidth={1.4} />
            Cancel Procedure
          </span>
        </div>
      )}
    </div>
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
