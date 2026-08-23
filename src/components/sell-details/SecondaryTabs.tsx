"use client";

import { secondaryTabs } from "@/data/sellDetails";

export function SecondaryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex flex-none items-center gap-[2px] overflow-x-auto rounded-[8px] border border-border-soft bg-white px-[6px]">
      {secondaryTabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={
              "flex-none cursor-pointer border-b-2 px-3 py-[13px] font-body text-[12.5px] whitespace-nowrap transition-colors " +
              (isActive
                ? "border-accent font-semibold text-accent"
                : "border-transparent font-medium text-label hover:text-ink-soft")
            }
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
