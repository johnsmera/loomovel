import { cn } from "@/app/lib/tailwind_utils";

type AssistantMessageProps = {
  author: string;
  content: string;
  timestamp: string;
  className?: string;
};

export function AssistantMessage({
  author,
  content,
  timestamp,
  className,
}: AssistantMessageProps) {
  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[70%]">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rounded-br-md px-4 py-3">
          {/* Author */}
          <p className="text-xs font-medium text-light/70 mb-1">{author}</p>

          {/* Content */}
          <p className="text-sm text-light/90 leading-relaxed">{content}</p>

          {/* Timestamp */}
          <div className="flex items-center justify-end mt-2">
            <span className="text-[10px] text-light/50">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
