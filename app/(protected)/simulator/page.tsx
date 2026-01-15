import { Suspense } from "react";
import { SimulatorContent } from "@/app/components/dash/simulator/SimulatorContent";
import { SimulatorSkeleton } from "@/app/components/dash/simulator/SimulatorSkeleton";

export default function SimulatorPage() {
  return (
    <Suspense fallback={<SimulatorSkeleton />}>
      <SimulatorContent />
    </Suspense>
  );
}
