import { Sparkles, Send, Phone, History } from "lucide-react";
import { Button } from "@/app/components/ui/button/Button";
import { cn } from "@/app/lib/tailwind_utils";

type AISuggestionProps = {
  content: string;
  timestamp: string;
  className?: string;
  onSendProposal?: () => void;
  onMakeCall?: () => void;
  onViewHistory?: () => void;
};

export function AISuggestion({
  content,
  timestamp,
  className,
  onSendProposal,
  onMakeCall,
  onViewHistory,
}: AISuggestionProps) {
  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[70%]">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3">
          {/* Header with Icon */}
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-light/70">
              Sugestão da IA
            </span>
          </div>

          {/* Content */}
          <p className="text-sm text-light/90 leading-relaxed">{content}</p>

          {/* Timestamp */}
          <div className="flex items-center justify-end mt-2 mb-3">
            <span className="text-[10px] text-light/50">{timestamp}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={onSendProposal}
              className="flex-1 min-w-[120px] text-xs py-2 flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Enviar proposta</span>
            </Button>
            <Button
              size="sm"
              onClick={onMakeCall}
              className="flex-1 min-w-[120px] text-xs py-2 flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Fazer ligação</span>
            </Button>
            <Button
              size="sm"
              onClick={onViewHistory}
              className="flex-1 min-w-[120px] text-xs py-2 flex items-center justify-center gap-1.5"
            >
              <History className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Ver histórico</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
