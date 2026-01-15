"use client";

import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";

function MessageSkeleton({ isUser }: { isUser: boolean }) {
  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[70%] ${isUser ? "w-[60%]" : "w-[50%]"}`}>
        <Skeleton
          className={`w-full h-24 rounded-2xl ${
            isUser ? "rounded-bl-md" : "rounded-br-md"
          }`}
        />
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-sidebar z-40 flex items-center">
        <div className="flex items-center">
          <div className="w-20 flex-shrink-0" />
          <div className="flex items-center gap-3 px-8 lg:px-12">
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
      </header>

      {/* Main Content - Centralizado */}
      <div className="flex-1 flex flex-col items-center pt-16 pb-8 px-8 min-h-0">
        {/* Chat Container */}
        <div className="w-full max-w-3xl flex-1 flex flex-col bg-sidebar/80 rounded-2xl overflow-hidden mb-6 min-h-0">
          {/* Messages Area - Scroll interno */}
          <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
            <div className="px-8 pt-6 pb-6">
              {/* Date Header */}
              <div className="flex justify-center mb-6">
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Messages */}
              <div className="space-y-4">
                <MessageSkeleton isUser={true} />
                <MessageSkeleton isUser={false} />
                <MessageSkeleton isUser={true} />
                <MessageSkeleton isUser={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Input Area - Fora do container */}
        <div className="w-full max-w-3xl flex-shrink-0">
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
