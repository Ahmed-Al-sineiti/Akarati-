const tabs = [
  { label: "My Assignments", badge: 35 },
  { label: "My Teams Assignments", badge: 35 },
  { label: "Overdue Collections", active: true },
  { label: "Handover Collections" },
  { label: "My Activities" },
  { label: "Under Investigation Sales", badge: 3 },
  { label: "Sales For Cancellation" },
  { label: "Authorities" },
];

export function TopTabs() {
  return (
    <div className="flex items-center gap-[26px] overflow-x-auto whitespace-nowrap border-b border-border bg-white px-[30px]">
      {tabs.map(({ label, badge, active }) => (
        <span
          key={label}
          className={
            "flex flex-none cursor-pointer items-center gap-[7px] py-[19px] text-[13.5px] transition-colors " +
            (active
              ? "font-semibold text-ink shadow-[inset_0_-2px_0_0_var(--color-accent)]"
              : "text-ink-muted hover:text-ink")
          }
        >
          {label}
          {badge !== undefined && (
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-red text-[11px] font-semibold text-white">
              {badge}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
