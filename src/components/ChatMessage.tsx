import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  timestamp: number;
}

const ChatMessage = ({ content, timestamp }: ChatMessageProps) => {
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col items-end gap-1 mb-2 group">
      <div
        className={cn(
          "rounded-2xl px-4 py-2 max-w-[90%] text-sm transition-all duration-200",
          "bg-white border border-border shadow-sm text-foreground",
          "group-hover:border-primary/30"
        )}
      >
        <div className="whitespace-pre-wrap break-words">{content}</div>
      </div>
      <span className="text-[10px] text-muted-foreground mr-1">
        {time}
      </span>
    </div>
  );
};

export default ChatMessage;