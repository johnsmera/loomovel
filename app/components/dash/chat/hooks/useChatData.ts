"use client";

import { useState, useEffect, useCallback } from "react";
import { getChatAction } from "@/app/actions/chat/get-chat-action";
import type {
  ChatMessage,
  ConversationAnalysis,
} from "@/app/usecases/chat/chat-usecase";

type UseChatDataReturn = {
  messages: ChatMessage[];
  iaSuggestion: string;
  conversationAnalysis: ConversationAnalysis | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const defaultAnalysis: ConversationAnalysis = {
  insights: {
    title: "Análise da IA",
    insights: [],
  },
  futureSteps: {
    title: "Próximos passos",
    actions: [],
  },
};

export function useChatData(): UseChatDataReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [iaSuggestion, setIaSuggestion] = useState("");
  const [conversationAnalysis, setConversationAnalysis] =
    useState<ConversationAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getChatAction();

      if (result.success) {
        setMessages(result.data.messages);
        setIaSuggestion(result.data.iaSuggestion);
        setConversationAnalysis(result.data.conversationAnalysis);
      } else {
        setError(result.error);
        setConversationAnalysis(defaultAnalysis);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar dados do chat";
      setError(errorMessage);
      setConversationAnalysis(defaultAnalysis);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    messages,
    iaSuggestion,
    conversationAnalysis,
    isLoading,
    error,
    refetch: fetchData,
  };
}
