"use client";

import { PageHeader } from "@/app/components/ui/page-header/PageHeader";
import { ChatSkeleton } from "./ChatSkeleton";
import { UserMessage } from "./messages/UserMessage";
import { AssistantMessage } from "./messages/AssistantMessage";
import { AISuggestion } from "./messages/AISuggestion";
import { ChatInput } from "./input/ChatInput";
import { useChatData } from "./hooks/useChatData";
import { type ChatMessage } from "@/app/usecases/chat/chat-usecase";

function DateHeader({ date }: { date: string }) {
  return (
    <div className="flex justify-center mb-6">
      <span className="text-[11px] text-light/40 uppercase tracking-wider">
        {date}
      </span>
    </div>
  );
}

function MessageRenderer({ message }: { message: ChatMessage }) {
  switch (message.type) {
    case "user_message":
      return (
        <UserMessage
          author={message.author}
          content={message.content}
          timestamp={message.timestamp}
        />
      );
    case "assistant_message":
      return (
        <AssistantMessage
          author={message.author}
          content={message.content}
          timestamp={message.timestamp}
        />
      );
    case "ai_suggestion":
      return (
        <AISuggestion
          content={message.content}
          timestamp={message.timestamp}
          onSendProposal={() => console.log("Enviar proposta")}
          onMakeCall={() => console.log("Fazer ligação")}
          onViewHistory={() => console.log("Ver histórico")}
        />
      );
    default:
      return null;
  }
}

export function ChatContent() {
  const {
    messages,
    isLoading,
    error,
  } = useChatData();

  if (isLoading) {
    return <ChatSkeleton />;
  }

  if (error) {
    return (
      <div className="py-8 pt-24">
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Erro ao carregar chat
          </h2>
          <p className="text-red-300/80">{error}</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = (message: string) => {
    console.log("Mensagem enviada:", message);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <PageHeader>
        <PageHeader.Title>Chat & Assistente Virtual</PageHeader.Title>
      </PageHeader>

      {/* Main Content - Centralizado */}
      <div className="flex-1 flex flex-col items-center pt-24 pb-8 px-8 min-h-0">
        {/* Chat Container - Área de mensagens com scroll */}
        <div className="w-full max-w-3xl flex-1 flex flex-col bg-sidebar/80 rounded-2xl overflow-hidden mb-6 min-h-0">
          {/* Messages Area - Scroll interno */}
          <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
            <div className="px-8 pt-6 pb-6">
              {/* Date Header */}
              <DateHeader date="HOJE, 16:40" />

              {/* Messages */}
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageRenderer key={message.id} message={message} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Area - Fora do container, sempre visível */}
        <div className="w-full max-w-3xl flex-shrink-0">
          <ChatInput
            onSend={handleSendMessage}
            placeholder="Escreva aqui..."
          />
        </div>
      </div>
    </div>
  );
}
