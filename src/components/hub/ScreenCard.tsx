"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, ChevronRight } from "lucide-react";
import type { ScreenEntry } from "@/data/screens";
import { formatDate } from "@/lib/date";
import { ScreenThumbnail } from "./ScreenThumbnail";

function CardFooter({ screen, disabled = false }: { screen: ScreenEntry; disabled?: boolean }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="truncate text-[15px] font-semibold text-hub-ink">{screen.title}</span>
        <span className="flex items-center gap-[6px] text-[12.5px] text-hub-muted">
          {screen.category}
          <span aria-hidden className="text-hub-border">
            ·
          </span>
          {formatDate(screen.date)}
        </span>
      </div>
      <MoreHorizontal
        aria-hidden
        className="h-[18px] w-[18px] flex-none text-hub-faint"
        strokeWidth={1.75}
      />
      <span
        className={
          "flex h-8 w-8 flex-none items-center justify-center rounded-full transition-colors " +
          (disabled
            ? "bg-hub-border-soft text-hub-faint"
            : "bg-hub-border-soft text-hub-ink-soft group-hover:bg-hub-accent group-hover:text-white")
        }
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </div>
  );
}

export function ScreenCard({ screen }: { screen: ScreenEntry }) {
  const [showHint, setShowHint] = useState(false);

  if (screen.status === "available") {
    return (
      <Link
        href={screen.route}
        className="group flex flex-col overflow-hidden rounded-[14px] border border-hub-border bg-hub-surface transition-all hover:-translate-y-[2px] hover:shadow-[0_16px_32px_rgba(17,24,39,0.08)]"
      >
        <ScreenThumbnail screen={screen} />
        <CardFooter screen={screen} />
      </Link>
    );
  }

  function handleClick() {
    setShowHint(true);
    window.setTimeout(() => setShowHint(false), 2200);
  }

  return (
    <div
      role="button"
      aria-disabled="true"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className="relative flex cursor-not-allowed flex-col overflow-hidden rounded-[14px] border border-hub-border bg-hub-surface"
    >
      <ScreenThumbnail screen={screen} />
      <CardFooter screen={screen} disabled />
      <div
        className={
          "pointer-events-none absolute inset-x-4 bottom-[70px] rounded-[8px] bg-gray-900/90 px-3 py-2 text-[12px] font-medium text-white shadow-lg transition-all duration-200 " +
          (showHint ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")
        }
      >
        Interactive prototype coming soon.
      </div>
    </div>
  );
}
