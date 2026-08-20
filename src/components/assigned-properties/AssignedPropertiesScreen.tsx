"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopTabs } from "@/components/layout/TopTabs";
import { FiltersBar, defaultFilters, ALL_PROJECTS, ALL_OFFICERS, type Filters } from "./FiltersBar";
import { ViewSwitch } from "./ViewSwitch";
import { PropertyCard } from "./PropertyCard";
import { PropertiesTable } from "./PropertiesTable";
import { Pagination } from "./Pagination";
import { properties as data, totalPropertiesCount } from "@/data/properties";
import type { SortDir, SortKey, ViewMode } from "@/types/property";

function parseDate(s: string): number {
  const [d, m, y] = s.split("/").map(Number);
  return new Date(y, m - 1, d).getTime();
}

export function AssignedPropertiesScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    officer: "Altahir Abdulrahman Mahmoud Khalifa",
  });

  const projectOptions = useMemo(
    () => Array.from(new Set(data.map((p) => p.project))).sort(),
    []
  );
  const officerOptions = useMemo(
    () => Array.from(new Set(data.map((p) => p.officer))).sort(),
    []
  );

  function updateFilters(patch: Partial<Filters>) {
    setFilters((f) => ({ ...f, ...patch }));
  }

  const filtered = useMemo(() => {
    const q = filters.propertyNumber.trim().toLowerCase();
    return data.filter((p) => {
      if (filters.project !== ALL_PROJECTS && p.project !== filters.project) return false;
      if (filters.officer !== ALL_OFFICERS && p.officer !== filters.officer) return false;
      if (filters.isActive === "Active" && !p.isActive) return false;
      if (filters.isActive === "Inactive" && p.isActive) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.id.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filters]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setOpenMenuId(null);
  }

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const raw = (p: (typeof data)[number]) => {
      switch (sortKey) {
        case "price":
          return p.price;
        case "paid":
          return p.paid;
        case "due":
          return p.due;
        case "next":
          return parseDate(p.nextDate);
      }
    };
    return [...filtered].sort((a, b) => {
      const cmp = raw(a) - raw(b);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  function toggleMenu(id: string) {
    setOpenMenuId((cur) => (cur === id ? null : id));
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-page font-body text-ink">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Fixed shell: never scrolls away — nav, filters, title and refresh
            all stay reachable without hunting for them mid-list. */}
        <div className="flex-none">
          <TopTabs />
          <div className="flex flex-col gap-4 px-[30px] pt-6 pb-4">
            <FiltersBar
              filters={filters}
              onChange={updateFilters}
              projectOptions={projectOptions}
              officerOptions={officerOptions}
            />

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="text-[20px] font-semibold tracking-[-0.01em] text-ink">
                  Assigned Properties
                </span>
                <span className="flex-none rounded-full bg-accent-soft px-[11px] py-1 text-[12.5px] font-semibold whitespace-nowrap text-accent">
                  {totalPropertiesCount} Properties
                </span>
              </span>
              <span className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFilters({ ...defaultFilters, officer: "Altahir Abdulrahman Mahmoud Khalifa" })}
                  className="flex cursor-pointer items-center gap-2 rounded-[6px] border border-border-soft bg-white px-[14px] py-2 font-body text-[13px] font-semibold text-ink-soft transition-colors hover:bg-hover"
                >
                  <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
                  Refresh
                </button>
                <ViewSwitch value={viewMode} onChange={setViewMode} />
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable middle: only the list scrolls. */}
        <div className="min-h-0 flex-1 overflow-y-auto px-[30px] pb-4">
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-[8px] border border-dashed border-border-soft bg-white py-16 text-center">
              <span className="text-[14px] font-semibold text-ink">No properties match these filters</span>
              <span className="text-[13px] text-label">Try clearing a filter or a different property number.</span>
            </div>
          ) : viewMode === "card" ? (
            <div className="flex flex-col gap-4">
              {sorted.map((p, i) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  menuOpen={openMenuId === p.id}
                  onToggleMenu={() => toggleMenu(p.id)}
                  flipUp={i >= sorted.length - 2 && sorted.length > 2}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[8px] border border-border bg-white">
              <PropertiesTable
                properties={sorted}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
                openMenuId={openMenuId}
                onToggleMenu={toggleMenu}
              />
            </div>
          )}
        </div>

        {/* Fixed footer: page controls stay put, no scrolling to reach them. */}
        <div className="flex-none px-[30px] pt-3 pb-4">
          <Pagination shown={sorted.length} total={totalPropertiesCount} pageSize={data.length} />
        </div>
      </main>
    </div>
  );
}
