"use client";

import { useEffect, useRef } from "react";
import { Search, Sun, ChevronDown } from "lucide-react";

export function HubHeader({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="border-b border-hub-border bg-hub-surface">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-6 py-4 sm:px-10">
        <span className="flex items-center gap-[10px]">
          <span
            className="h-[26px] w-[26px] flex-none bg-hub-ink"
            style={{
              clipPath: "polygon(0 100%,45% 0,100% 100%,60% 100%,45% 45%,30% 100%)",
            }}
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-[15px] font-bold tracking-[0.08em] text-hub-ink">
              AKARATI
            </span>
            <span className="text-[10px] font-semibold tracking-[0.14em] text-hub-faint uppercase">
              Design Review Hub
            </span>
          </span>
        </span>

        <div className="relative hidden max-w-[420px] flex-1 md:block">
          <Search
            className="pointer-events-none absolute inset-y-0 start-[14px] my-auto h-4 w-4 text-hub-faint"
            strokeWidth={1.75}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search screens or categories…"
            className="h-[40px] w-full rounded-[10px] border border-hub-border bg-hub-bg ps-10 pe-4 text-[13.5px] text-hub-ink outline-none transition-colors placeholder:text-hub-faint focus:border-hub-accent focus:bg-hub-surface"
          />
        </div>

        <span className="flex flex-none items-center gap-4">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hub-border text-hub-muted"
          >
            <Sun className="h-[17px] w-[17px]" strokeWidth={1.75} />
          </span>
          <span className="flex items-center gap-[9px]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-hub-accent text-[13px] font-semibold text-white">
              A
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[13px] font-semibold text-hub-ink">Ahmed</span>
              <span className="text-[11.5px] text-hub-faint">Designer</span>
            </span>
            <ChevronDown className="h-4 w-4 text-hub-faint" strokeWidth={1.75} />
          </span>
        </span>
      </div>
    </header>
  );
}
