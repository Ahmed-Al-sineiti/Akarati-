import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToHub() {
  return (
    <Link
      href="/"
      className="fixed top-3 right-3 z-50 flex items-center gap-[7px] rounded-full bg-stone-900/85 px-[14px] py-[9px] font-body text-[12.5px] font-semibold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-stone-900"
    >
      <ArrowLeft className="h-[15px] w-[15px]" strokeWidth={2} />
      Design Review Hub
    </Link>
  );
}
