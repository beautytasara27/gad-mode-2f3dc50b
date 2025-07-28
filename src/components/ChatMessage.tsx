import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-3 p-4 animate-in slide-in-from-bottom-2 duration-200", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={cn("max-w-[70%] rounded-lg p-3 shadow-sm", {
        "bg-chat-user text-chat-user-foreground ml-auto": isUser,
        "bg-chat-assistant text-chat-assistant-foreground": !isUser
      })}>
        <div className="prose prose-sm max-w-none">
          {isUser ? (
            <p className="text-sm leading-relaxed">{message}</p>
          ) : (
            <div className="space-y-2">
              {message.split('\n\n').map((paragraph, index) => (
                <div key={index} className="text-sm leading-relaxed">
                  {paragraph.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex}>
                      {line.startsWith('Subject: ') ? (
                        <div className="font-semibold text-primary border-b border-border pb-1 mb-2">
                          {line}
                        </div>
                      ) : line.startsWith('To: ') || line.startsWith('From: ') || line.startsWith('Date: ') ? (
                        <div className="text-muted-foreground text-xs mb-1">
                          {line}
                        </div>
                      ) : (
                        <div className={cn({
                          "mt-3": lineIndex > 0 && line.length > 0,
                          "font-medium": line.includes(':') && line.length < 50
                        })}>
                          {line}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-2 opacity-70">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-chat-user flex items-center justify-center">
          <User className="w-4 h-4 text-chat-user-foreground" />
        </div>
      )}
    </div>
  );
};