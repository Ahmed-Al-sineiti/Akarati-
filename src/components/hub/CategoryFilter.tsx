"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export const ALL_CATEGORIES = "All Categories";

export function CategoryFilter({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-hub-border bg-hub-surface px-[16px] py-[9px] text-[13.5px] font-medium text-hub-ink-soft transition-colors hover:border-hub-accent"
      >
        {value}
        <ChevronDown className={"h-4 w-4 text-hub-faint transition-transform " + (open ? "rotate-180" : "")} strokeWidth={1.75} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute end-0 top-full z-20 mt-2 w-[200px] overflow-hidden rounded-[10px] border border-hub-border bg-hub-surface py-[6px] shadow-[0_14px_32px_rgba(17,24,39,0.12)]"
        >
          {[ALL_CATEGORIES, ...options].map((o) => (
            <button
              key={o}
              type="button"
              role="option"
              aria-selected={o === value}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={
                "flex w-full cursor-pointer items-center px-[14px] py-[8px] text-left text-[13.5px] transition-colors " +
                (o === value ? "bg-hub-accent-soft font-semibold text-hub-accent" : "text-hub-ink-soft hover:bg-hub-bg")
              }
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
