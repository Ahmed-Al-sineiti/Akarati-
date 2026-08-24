"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

export const ALL_PROJECTS = "All Projects";
export const ALL_OFFICERS = "All Officers";

export type Filters = {
  project: string;
  propertyNumber: string;
  isActive: "All" | "Active" | "Inactive";
  officer: string;
};

export const defaultFilters: Filters = {
  project: ALL_PROJECTS,
  propertyNumber: "",
  isActive: "All",
  officer: ALL_OFFICERS,
};

function SelectField({
  label,
  value,
  options,
  onChange,
  onClear,
  clearable,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  onClear?: () => void;
  clearable?: boolean;
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
    <div ref={ref} className="relative flex flex-col gap-[6px]">
      <span className="text-[13px] font-medium text-label">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-[38px] cursor-pointer items-center gap-2 rounded-[6px] border border-border-soft bg-white px-[11px] text-[14px] text-ink transition-colors hover:border-accent-border"
      >
        <span className="min-w-0 flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap">
          {value}
        </span>
        {clearable && (
          <X
            className="h-4 w-4 flex-none text-faint transition-colors hover:text-ink-muted"
            strokeWidth={1.4}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              onClear?.();
            }}
          />
        )}
        <ChevronDown
          className={
            "h-4 w-4 flex-none text-ink-muted transition-transform " + (open ? "rotate-180" : "")
          }
          strokeWidth={1.4}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-full z-20 mt-[6px] max-h-[240px] w-full overflow-y-auto rounded-[8px] border border-border-soft bg-white py-[6px] shadow-[0_14px_32px_rgba(15,23,42,0.14)]"
        >
          {options.map((o) => (
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
                "flex w-full cursor-pointer items-center px-3 py-[7px] text-left text-[13.5px] transition-colors " +
                (o === value ? "bg-accent-soft font-semibold text-accent" : "text-ink-soft hover:bg-page")
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

function TextField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-[6px]">
      <span className="text-[13px] font-medium text-label">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-[38px] rounded-[6px] border border-border-soft px-[11px] text-[14px] text-ink placeholder:text-faint transition-colors outline-none hover:border-accent-border focus:border-accent"
      />
    </label>
  );
}

export function FiltersBar({
  filters,
  onChange,
  projectOptions,
  officerOptions,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  projectOptions: string[];
  officerOptions: string[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[20px] font-semibold tracking-[-0.01em] text-ink">
          Filters
        </span>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-[6px] border border-border-soft bg-white px-5 py-[9px] font-body text-[13px] font-semibold text-ink-soft transition-colors hover:bg-hover"
        >
          <Search className="h-4 w-4" strokeWidth={1.4} />
          Search
        </button>
      </div>

      <div className="grid grid-cols-4 gap-[18px] rounded-[8px] border border-border bg-white p-[18px]">
        <SelectField
          label="Project"
          value={filters.project}
          options={[ALL_PROJECTS, ...projectOptions]}
          onChange={(v) => onChange({ project: v })}
          clearable={filters.project !== ALL_PROJECTS}
          onClear={() => onChange({ project: ALL_PROJECTS })}
        />
        <TextField
          label="Property Number"
          placeholder="Enter property number"
          value={filters.propertyNumber}
          onChange={(v) => onChange({ propertyNumber: v })}
        />
        <SelectField
          label="Is Active"
          value={filters.isActive}
          options={["All", "Active", "Inactive"]}
          onChange={(v) => onChange({ isActive: v as Filters["isActive"] })}
          clearable={filters.isActive !== "All"}
          onClear={() => onChange({ isActive: "All" })}
        />
        <SelectField
          label="Officer"
          value={filters.officer}
          options={[ALL_OFFICERS, ...officerOptions]}
          onChange={(v) => onChange({ officer: v })}
          clearable={filters.officer !== ALL_OFFICERS}
          onClear={() => onChange({ officer: ALL_OFFICERS })}
        />
      </div>
    </div>
  );
}
