import { IHttpAdapter } from "@/app/@adapters/http/IHttpAdapter";
import { nortusHttpAdapter } from "@/app/@adapters/http/implementations/nortus/NortusHttpAdapter";

// Tipos da resposta da API
export type MessageType = "user_message" | "assistant_message" | "ai_suggestion";

export type ChatMessage = {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: MessageType;
};

export type Insight = {
  id: string;
  type: "interaction" | "emotionAnalysis" | "clusterIdentification";
  category: string;
};

export type NextStepAction = {
  id: string;
  action: string;
  priority: "high" | "medium" | "low";
};

export type ConversationAnalysis = {
  insights: {
    title: string;
    insights: Insight[];
  };
  futureSteps: {
    title: string;
    actions: NextStepAction[];
  };
};

export type ChatAPIResponse = {
  messages: ChatMessage[];
  iaSuggestion: string;
  conversationAnalysis: ConversationAnalysis;
};

// Tipos de saída do usecase
export type ChatUsecaseOutput = {
  messages: ChatMessage[];
  iaSuggestion: string;
  conversationAnalysis: ConversationAnalysis;
};

class ChatUsecase {
  constructor(private readonly httpClient: IHttpAdapter) {}

  async getChat(headers?: Record<string, string>): Promise<ChatUsecaseOutput> {
    const response = await this.httpClient.get<ChatAPIResponse>("/nortus-v1/chat", {
      headers: headers || {},
    });

    return {
      messages: response.messages,
      iaSuggestion: response.iaSuggestion,
      conversationAnalysis: response.conversationAnalysis,
    };
  }
}

export const chatUsecase = new ChatUsecase(nortusHttpAdapter);
