"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function AccordionSection({
  title,
  defaultOpen = false,
  headerExtra,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  headerExtra?: ReactNode;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-[8px] border border-border-soft bg-white">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen((o) => !o);
        }}
        className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4"
      >
        <span className="text-[18px] font-semibold text-ink">{title}</span>
        <span className="flex flex-none items-center gap-[10px]">
          {headerExtra && (
            <span onClick={(e) => e.stopPropagation()} className="flex items-center">
              {headerExtra}
            </span>
          )}
          <ChevronDown
            className={"h-4 w-4 flex-none text-label transition-transform " + (open ? "rotate-180" : "")}
            strokeWidth={1.4}
          />
        </span>
      </div>

      {open && (
        <div className="px-5 pb-5">
          {children ?? (
            <p className="text-[13px] text-faint">
              Fields for this section were not supplied in the source screen.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
