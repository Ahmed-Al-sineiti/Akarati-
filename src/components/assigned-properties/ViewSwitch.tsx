"use client";

import { LayoutGrid, List } from "lucide-react";
import type { ViewMode } from "@/types/property";

export function ViewSwitch({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <span className="flex items-center overflow-hidden rounded-[6px] border border-border-soft bg-white">
      <button
        type="button"
        aria-label="Card view"
        aria-pressed={value === "card"}
        onClick={() => onChange("card")}
        className={
          "flex h-[34px] w-[34px] cursor-pointer items-center justify-center transition-colors " +
          (value === "card" ? "bg-accent-toggle text-accent" : "text-faint hover:bg-hover hover:text-ink-muted")
        }
      >
        <LayoutGrid className="h-[17px] w-[17px]" strokeWidth={1.4} />
      </button>
      <button
        type="button"
        aria-label="Table view"
        aria-pressed={value === "table"}
        onClick={() => onChange("table")}
        className={
          "flex h-[34px] w-[34px] cursor-pointer items-center justify-center border-l border-border-soft transition-colors " +
          (value === "table" ? "bg-accent-toggle text-accent" : "text-faint hover:bg-hover hover:text-ink-muted")
        }
      >
        <List className="h-[17px] w-[17px]" strokeWidth={1.4} />
      </button>
    </span>
  );
}
