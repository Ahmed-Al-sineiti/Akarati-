import type { Metadata } from "next";
import { AssignedPropertiesScreen } from "@/components/assigned-properties/AssignedPropertiesScreen";
import { BackToHub } from "@/components/hub/BackToHub";

export const metadata: Metadata = {
  title: "Assigned Properties — Akarati Prototype",
  description: "Interactive prototype: Assigned Properties (Collections).",
};

export default function Page() {
  return (
    <div className="relative h-screen">
      <BackToHub />
      <AssignedPropertiesScreen />
    </div>
  );
}
