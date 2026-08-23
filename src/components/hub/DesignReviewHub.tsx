"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { screens, type ScreenEntry } from "@/data/screens";
import { monthLabel, monthSortKey } from "@/lib/date";
import { HubHeader } from "./HubHeader";
import { ScreenCard } from "./ScreenCard";
import { StatsBar } from "./StatsBar";
import { CategoryFilter, ALL_CATEGORIES } from "./CategoryFilter";

type Group = { key: string; label: string; items: ScreenEntry[] };

function groupByMonth(items: ScreenEntry[]): Group[] {
  const map = new Map<string, ScreenEntry[]>();
  for (const item of items) {
    const key = monthSortKey(item.date);
    const bucket = map.get(key);
    if (bucket) bucket.push(item);
    else map.set(key, [item]);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, groupItems]) => ({
      key,
      label: monthLabel(groupItems[0].date),
      items: [...groupItems].sort((a, b) => b.date.localeCompare(a.date)),
    }));
}

export function DesignReviewHub() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);

  const categoryOptions = useMemo(
    () => Array.from(new Set(screens.map((s) => s.category))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return screens.filter((s) => {
      if (category !== ALL_CATEGORIES && s.category !== category) return false;
      if (q && !s.title.toLowerCase().includes(q) && !s.category.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, category]);

  const groups = useMemo(() => groupByMonth(filtered), [filtered]);
  const availableCount = screens.filter((s) => s.status === "available").length;
  const comingSoonCount = screens.length - availableCount;
  const monthCount = groupByMonth(screens).length;

  return (
    <div className="min-h-screen bg-hub-bg font-body text-hub-ink">
      <HubHeader query={query} onQueryChange={setQuery} />

      <main className="mx-auto max-w-[1360px] px-6 py-10 sm:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[620px] flex-col gap-2">
            <h1 className="text-[32px] font-bold tracking-[-0.01em] text-hub-ink sm:text-[36px]">
              Akarati Redesign Archive
            </h1>
            <p className="text-[14px] leading-relaxed text-hub-muted">
              Browse and explore redesigned screens from the Akarati collections dashboard.
              Organized by month for easy review.
            </p>
          </div>
          <CategoryFilter value={category} options={categoryOptions} onChange={setCategory} />
        </div>

        {groups.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-[14px] border border-dashed border-hub-border py-20 text-center">
            <span className="text-[14px] font-semibold text-hub-ink">
              No screens match {query ? `“${query}”` : "this filter"}
            </span>
            <span className="text-[13px] text-hub-muted">Try a different name, category, or clear the filter.</span>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {groups.map((group) => (
              <section key={group.key}>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-hub-border-soft text-hub-ink-soft">
                      <CalendarDays className="h-[17px] w-[17px]" strokeWidth={1.75} />
                    </span>
                    <span className="text-[14px] font-bold tracking-[0.06em] text-hub-ink uppercase">
                      {group.label}
                    </span>
                  </span>
                  <span className="rounded-full bg-hub-border-soft px-[12px] py-[5px] text-[12px] font-medium text-hub-muted">
                    {group.items.length} screen{group.items.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {group.items.map((screen) => (
                    <ScreenCard key={screen.id} screen={screen} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-12">
          <StatsBar
            total={screens.length}
            interactive={availableCount}
            months={monthCount}
            comingSoon={comingSoonCount}
          />
        </div>
      </main>
    </div>
  );
}
