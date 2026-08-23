import type { FieldValue } from "@/data/sellDetails";

export function DataField({
  label,
  value,
  unit,
  badge,
  note = false,
  className = "",
}: FieldValue & { note?: boolean; className?: string }) {
  return (
    <div
      className={
        "flex flex-col gap-[5px] rounded-[6px] border border-border bg-white px-[14px] py-[11px] " + className
      }
    >
      <span className="text-[12.5px] font-medium text-label">{label}</span>
      {note ? (
        <span className="text-[13.5px] font-medium text-ink">{value}</span>
      ) : (
        <span className="flex items-baseline gap-[6px]">
          <span className="text-[16.5px] font-semibold tracking-[-0.01em] text-ink">{value}</span>
          {unit && <span className="text-[12.5px] font-medium text-ink-muted">{unit}</span>}
          {badge && (
            <span
              className={
                "ms-auto text-[13px] font-semibold " +
                (badge.tone === "green" ? "text-green" : "text-ink-muted")
              }
            >
              {badge.text}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
