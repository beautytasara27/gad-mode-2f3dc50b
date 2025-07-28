import { Mail, Sparkles } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="border-b border-border bg-background/80 backdrop-blur-sm p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          <Mail className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
            Email Generator
            <Sparkles className="w-4 h-4 text-primary" />
          </h1>
          <p className="text-sm text-muted-foreground">
            Generate professional emails with AI assistance
          </p>
        </div>
      </div>
    </div>
  );
};