import { Suspense } from "react";
import { DashboardContent } from "@/app/components/dash/dashboard/DashboardContent";
import { DashboardSkeleton } from "@/app/components/dash/dashboard/DashboardSkeleton";

export default function DashPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
