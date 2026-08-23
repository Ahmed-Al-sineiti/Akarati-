import { WorkflowStepper } from "./WorkflowStepper";

export function RecordHeaderBar() {
  return (
    <div className="flex flex-none items-center justify-between border-b border-border-soft bg-white px-[26px] py-3">
      <WorkflowStepper />

      <div className="flex items-center gap-[10px]">
        <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-accent-soft text-[13px] font-bold text-accent">
          R
        </span>
        <span className="flex flex-col gap-[1px]">
          <span className="text-[12.5px] font-semibold text-ink">AkArati Team</span>
          <span className="text-[11px] text-faint">15/08/2026 2:25 PM</span>
        </span>
      </div>
    </div>
  );
}
