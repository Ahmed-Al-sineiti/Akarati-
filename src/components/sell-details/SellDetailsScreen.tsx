"use client";

import { useState } from "react";
import { BadgeCheck, Undo2, Save, RefreshCw } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { RecordHeaderBar } from "./RecordHeaderBar";
import { SecondaryTabs } from "./SecondaryTabs";
import { ActionsDropdown } from "./ActionsDropdown";
import { AccordionSection } from "./AccordionSection";
import { DataField } from "./DataField";
import {
  sellRecord,
  epmsFields,
  sellDetailFields,
  specialConditions,
} from "@/data/sellDetails";

export function SellDetailsScreen() {
  const [activeTab, setActiveTab] = useState("Sell Details");

  return (
    <div className="flex h-screen w-full overflow-x-auto overflow-y-hidden bg-page font-body text-ink">
      <Sidebar />

      <main className="flex flex-1 flex-col">
        <RecordHeaderBar />

        <div className="min-h-0 flex-1 overflow-y-auto px-[30px] py-6">
          <div className="flex flex-col gap-8">
            <SecondaryTabs active={activeTab} onChange={setActiveTab} />

            <div className="flex flex-col gap-6">
              <div className="flex items-end justify-between">
                <h1 className="text-[28px] font-semibold tracking-[0.02em] text-ink">Sell Details</h1>
                <span className="text-[12.5px] font-semibold text-ink-muted">
                  {sellRecord.propertyRef}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <button
                    type="button"
                    className="flex h-9 cursor-pointer items-center gap-2 rounded-[6px] bg-accent px-[18px] font-body text-[13px] font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    <BadgeCheck className="h-4 w-4" strokeWidth={2} />
                    Approve
                  </button>
                  <button
                    type="button"
                    className="flex h-9 cursor-pointer items-center gap-2 rounded-[6px] border border-border-soft bg-white px-4 font-body text-[13px] font-medium text-ink-soft transition-colors hover:bg-hover"
                  >
                    <Undo2 className="h-4 w-4 text-ink-muted" strokeWidth={1.4} />
                    Send Back
                  </button>
                  <ActionsDropdown />
                </div>

                <div className="flex items-center gap-[10px]">
                  <button
                    type="button"
                    className="flex h-9 cursor-pointer items-center gap-2 rounded-[6px] border border-border-soft bg-white px-4 font-body text-[14px] font-semibold text-ink-soft transition-colors hover:bg-hover"
                  >
                    <Save className="h-4 w-4 text-ink-muted" strokeWidth={1.4} />
                    Save
                  </button>
                  <button
                    type="button"
                    className="flex h-9 cursor-pointer items-center gap-2 rounded-[6px] border border-border-soft bg-white px-4 font-body text-[14px] font-semibold text-ink-soft transition-colors hover:bg-hover"
                  >
                    <RefreshCw className="h-4 w-4 text-ink-muted" strokeWidth={1.4} />
                    Refresh
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <AccordionSection title="Procedure Information" />

                <AccordionSection title={`${sellRecord.propertyRef} Property Details`} />

                <AccordionSection
                  title="EPMS Information"
                  defaultOpen
                  headerExtra={
                    <button
                      type="button"
                      className="flex h-[30px] cursor-pointer items-center gap-[7px] rounded-[6px] border border-[#d6dfea] bg-white px-3 font-body text-[12px] font-semibold text-ink-soft transition-colors hover:bg-hover"
                    >
                      <RefreshCw className="h-[14px] w-[14px] text-ink-muted" strokeWidth={1.4} />
                      Refresh ePMS
                    </button>
                  }
                >
                  <div className="grid grid-cols-2 gap-3">
                    {epmsFields.map((f) => (
                      <DataField key={f.label} {...f} />
                    ))}
                  </div>
                </AccordionSection>

                <AccordionSection title="Sell Details" defaultOpen>
                  <div className="grid grid-cols-3 gap-3">
                    {sellDetailFields.map((f) => (
                      <DataField key={f.label} {...f} />
                    ))}
                    <DataField
                      label="Special Conditions"
                      value={specialConditions}
                      note
                      className="col-span-3"
                    />
                  </div>
                </AccordionSection>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
