import { CheckCheck } from "lucide-react";
import { cn } from "@/app/lib/tailwind_utils";

type UserMessageProps = {
  author: string;
  content: string;
  timestamp: string;
  className?: string;
};

export function UserMessage({
  author,
  content,
  timestamp,
  className,
}: UserMessageProps) {
  return (
    <div className={cn("flex justify-start", className)}>
      <div className="max-w-[70%]">
        <div className="bg-primary rounded-2xl rounded-bl-md px-4 py-3 shadow-lg shadow-primary/20">
          {/* Author */}
          <p className="text-xs font-medium text-white/90 mb-1">{author}</p>

          {/* Content */}
          <p className="text-sm text-white leading-relaxed">{content}</p>

          {/* Timestamp and Read Status */}
          <div className="flex items-center justify-end gap-1 mt-2">
            <span className="text-[10px] text-white/70">{timestamp}</span>
            <CheckCheck className="w-3.5 h-3.5 text-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
