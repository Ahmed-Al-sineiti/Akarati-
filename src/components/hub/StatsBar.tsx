import { LayoutGrid, CheckCircle2, CalendarDays, Layers } from "lucide-react";

export function StatsBar({
  total,
  interactive,
  months,
  comingSoon,
}: {
  total: number;
  interactive: number;
  months: number;
  comingSoon: number;
}) {
  const stats = [
    { icon: LayoutGrid, iconBg: "bg-blue-100", iconColor: "text-blue-600", value: total, label: "Screens" },
    { icon: CheckCircle2, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", value: interactive, label: "Interactive" },
    { icon: CalendarDays, iconBg: "bg-violet-100", iconColor: "text-violet-600", value: months, label: "Months" },
    { icon: Layers, iconBg: "bg-amber-100", iconColor: "text-amber-600", value: comingSoon, label: "Coming Soon" },
  ];

  return (
    <div className="grid grid-cols-2 divide-y divide-hub-border rounded-[14px] border border-hub-border bg-hub-surface sm:grid-cols-4 sm:divide-x sm:divide-y-0">
      {stats.map(({ icon: Icon, iconBg, iconColor, value, label }) => (
        <div key={label} className="flex items-center gap-3 px-6 py-5">
          <span className={"flex h-10 w-10 flex-none items-center justify-center rounded-[10px] " + iconBg + " " + iconColor}>
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[20px] font-bold text-hub-ink">{value}</span>
            <span className="text-[12.5px] text-hub-muted">{label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
