import type { Metadata } from "next";
import { SellDetailsScreen } from "@/components/sell-details/SellDetailsScreen";
import { BackToHub } from "@/components/hub/BackToHub";

export const metadata: Metadata = {
  title: "Sell Details — Akarati Prototype",
  description: "Interactive prototype: Sell Details (Collections Confirmation).",
};

export default function Page() {
  return (
    <div className="relative h-screen">
      <BackToHub />
      <SellDetailsScreen />
    </div>
  );
}
