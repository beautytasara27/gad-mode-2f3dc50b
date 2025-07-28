import { useRef, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { useEmailGenerator } from "@/hooks/useEmailGenerator";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { messages, isLoading, sendMessage } = useEmailGenerator();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <ChatHeader />
      
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 px-4">
          <div className="max-w-4xl mx-auto py-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">Ready to generate emails!</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Describe the type of email you need and I'll help you create a professional, well-formatted message.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  <div className="p-3 rounded-lg bg-card border border-border text-sm">
                    <strong>Follow-up email</strong> after a meeting
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border text-sm">
                    <strong>Thank you note</strong> after an interview
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border text-sm">
                    <strong>Professional inquiry</strong> or request
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
