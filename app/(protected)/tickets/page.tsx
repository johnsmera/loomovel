import { Suspense } from "react";
import { TicketsContent } from "@/app/components/dash/tickets/TicketsContent";
import { TicketsSkeleton } from "@/app/components/dash/tickets/TicketsSkeleton";

export default function TicketsPage() {
  return (
    <Suspense fallback={<TicketsSkeleton />}>
      <TicketsContent />
    </Suspense>
  );
}
