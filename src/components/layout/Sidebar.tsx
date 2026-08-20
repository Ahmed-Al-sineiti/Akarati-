import {
  Menu,
  LogOut,
  ChevronRight,
  Network,
  Users,
  UsersRound,
  Landmark,
  HardHat,
  IdCard,
  Repeat,
  Building2,
  LayoutGrid,
  User,
  FileText,
  Tag,
  Receipt,
  Handshake,
  BarChart3,
  Settings,
} from "lucide-react";

const quickAccess = [
  { label: "Company", icon: Network },
  { label: "Employees", icon: Users },
  { label: "Teams", icon: UsersRound },
  { label: "Bank Accounts", icon: Landmark },
  { label: "Contractors", icon: HardHat },
  { label: "Job Titles", icon: IdCard },
  { label: "Barters", icon: Repeat },
  { label: "Banks", icon: Building2 },
];

const modules = [
  { label: "Projects", icon: LayoutGrid },
  { label: "Customers", icon: User },
  { label: "Customers Requests", icon: FileText },
  { label: "Sales", icon: Tag },
  { label: "Collections", icon: Receipt, active: true },
  { label: "Brokers Network", icon: Handshake },
  { label: "Reports", icon: BarChart3 },
  { label: "System Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="flex w-[177px] flex-none flex-col border-r border-border bg-white pb-6">
      <div className="flex items-center justify-between px-[18px] pt-5 pb-4">
        <span className="flex items-center gap-[9px]">
          <span
            className="h-[22px] w-[22px] bg-accent"
            style={{
              clipPath:
                "polygon(0 100%,45% 0,100% 100%,60% 100%,45% 45%,30% 100%)",
            }}
          />
          <span className="font-heading text-[22px] font-bold tracking-[0.13em] text-ink">
            AKARATI
          </span>
        </span>
        <Menu className="h-[17px] w-[17px] text-ink-muted" strokeWidth={1.5} />
      </div>

      <div className="flex items-center gap-[11px] px-[18px] pb-4">
        <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-accent-soft text-[14px] font-semibold text-accent">
          R
        </span>
        <span className="flex flex-col gap-[1px]">
          <span className="text-[12.5px] text-label">Welcome back</span>
          <span className="text-[13px] font-semibold text-ink">
            Mr. Akarati Team
          </span>
        </span>
      </div>

      <div className="flex items-center gap-4 border-b border-border-faint px-[18px] pb-[18px]">
        <span className="flex cursor-pointer items-center gap-[7px] text-[13px] text-ink-soft transition-colors hover:text-accent">
          <LogOut className="h-[17px] w-[17px] text-ink-muted" strokeWidth={1.5} />
          Logout
        </span>
      </div>

      <div className="flex items-center justify-between px-[18px] pt-4 pb-2">
        <span className="text-[11.5px] font-semibold tracking-[0.13em] text-accent uppercase">
          Quick access
        </span>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto">
        {quickAccess.map(({ label, icon: Icon }) => (
          <span
            key={label}
            className="flex cursor-pointer items-center gap-[11px] px-[18px] py-[9px] text-[13.5px] text-ink-soft transition-colors hover:bg-hover hover:text-ink"
          >
            <Icon className="h-[17px] w-[17px] text-ink-muted" strokeWidth={1.5} />
            {label}
          </span>
        ))}

        <span className="my-3 block h-px bg-border-faint" />

        {modules.map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            className={
              "flex cursor-pointer items-center gap-[11px] px-[18px] py-[9px] text-[13.5px] transition-colors " +
              (active
                ? "border-l-2 border-accent bg-accent-soft font-semibold text-ink"
                : "text-ink-soft hover:bg-hover hover:text-ink")
            }
          >
            <Icon
              className={
                "h-[17px] w-[17px] " + (active ? "text-accent" : "text-ink-muted")
              }
              strokeWidth={1.5}
            />
            {label}
            <ChevronRight className="ms-auto h-[17px] w-[17px] text-faint" strokeWidth={1.5} />
          </span>
        ))}
      </nav>

      <div className="px-[18px] pt-6 text-[11.5px] leading-relaxed text-faint">
        © Everrox Technologies LLC
        <br />
        2014–2026. All rights reserved.
      </div>
    </aside>
  );
}
