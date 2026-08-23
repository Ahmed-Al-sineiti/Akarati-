import Image from "next/image";
import { Hourglass } from "lucide-react";
import type { ScreenEntry } from "@/data/screens";

function ComingSoonPreview() {
  return (
    <div className="relative flex h-full w-full flex-col gap-[10px] bg-hub-border-soft p-5">
      <div className="h-[10px] w-2/5 rounded-full bg-hub-skeleton" />
      <div className="mt-1 flex gap-[10px]">
        <div className="h-16 flex-1 rounded-[6px] bg-hub-skeleton/70" />
        <div className="h-16 flex-1 rounded-[6px] bg-hub-skeleton/70" />
        <div className="h-16 flex-1 rounded-[6px] bg-hub-skeleton/70" />
      </div>
      <div className="h-[8px] w-3/5 rounded-full bg-hub-skeleton/70" />
      <div className="h-[8px] w-2/5 rounded-full bg-hub-skeleton/70" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-hub-surface text-hub-faint shadow-sm">
          <Hourglass className="h-5 w-5" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  );
}

export function ScreenThumbnail({ screen }: { screen: ScreenEntry }) {
  const available = screen.status === "available";
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-hub-border bg-hub-border-soft">
      {available && screen.thumbnail ? (
        <Image
          src={screen.thumbnail}
          alt={`${screen.title} preview`}
          fill
          sizes="(min-width: 1024px) 620px, 90vw"
          className="object-cover object-top"
        />
      ) : (
        <ComingSoonPreview />
      )}

      <span
        className={
          "absolute top-3 right-3 rounded-full px-[10px] py-[4px] text-[11.5px] font-semibold shadow-sm " +
          (available ? "bg-white text-hub-available" : "bg-hub-surface/90 text-hub-muted")
        }
      >
        {available ? "Interactive" : "Coming Soon"}
      </span>
    </div>
  );
}
