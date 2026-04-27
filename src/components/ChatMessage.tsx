import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isBot: boolean;
}

const ChatMessage = ({ content, isBot }: ChatMessageProps) => {
  return (
    <div className={cn("flex items-start gap-3 mb-4", !isBot && "flex-row-reverse")}>
      <div
        className={cn(
          "rounded-3xl px-5 py-3 max-w-[80%] text-sm transition-all duration-200 ease-in-out transform scale-100 opacity-100",
          isBot ? "bg-secondary border border-border" : "bg-muted/50 border border-border"
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;