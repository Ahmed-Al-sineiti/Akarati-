import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export function Pagination({
  shown,
  total,
  pageSize,
}: {
  shown: number;
  total: number;
  pageSize: number;
}) {
  const pages = [1, 2, 3];
  const lastPage = Math.ceil(total / 10);

  return (
    <div className="flex items-center justify-between gap-4 rounded-[8px] border border-border bg-white px-4 py-[13px] shadow-[0_-4px_10px_rgba(15,23,42,0.04)]">
      <span className="text-[12px] whitespace-nowrap text-label" dir="ltr">
        Showing 1 - {shown} of {total} entries
      </span>
      <span className="flex items-center gap-[5px]" dir="ltr">
        <button
          type="button"
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[5px] border border-border-soft bg-white text-faint transition-colors hover:bg-hover"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.4} />
        </button>
        {pages.map((n) => (
          <button
            key={n}
            type="button"
            className={
              "flex h-7 min-w-7 cursor-pointer items-center justify-center rounded-[5px] text-[12.5px] font-semibold transition-colors " +
              (n === 1
                ? "bg-accent text-white"
                : "border border-border-soft bg-white text-ink-soft hover:bg-hover")
            }
          >
            {n}
          </button>
        ))}
        <span className="flex h-7 min-w-7 items-center justify-center text-[12.5px] text-faint">
          …
        </span>
        <button
          type="button"
          className="flex h-7 min-w-7 cursor-pointer items-center justify-center rounded-[5px] border border-border-soft bg-white text-[12.5px] text-ink-soft transition-colors hover:bg-hover"
        >
          {lastPage}
        </button>
        <button
          type="button"
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[5px] border border-border-soft bg-white text-ink-muted transition-colors hover:bg-hover"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </span>
      <span className="flex cursor-pointer items-center gap-2 rounded-[5px] border border-border-soft bg-white px-[10px] py-[6px] text-[12.5px] text-ink transition-colors hover:bg-hover">
        {pageSize} per page
        <ChevronDown className="h-4 w-4 text-ink-muted" strokeWidth={1.4} />
      </span>
    </div>
  );
}
