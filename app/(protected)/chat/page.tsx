import { Suspense } from "react";
import { ChatContent } from "@/app/components/dash/chat/ChatContent";
import { ChatSkeleton } from "@/app/components/dash/chat/ChatSkeleton";

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatContent />
    </Suspense>
  );
}
