import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  content: string;
  timestamp: number;
  isBot?: boolean;
}

const ChatMessage = ({ content, timestamp, isBot = false }: ChatMessageProps) => {
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={cn(
      "flex flex-col gap-1 mb-2 group animate-in fade-in slide-in-from-bottom-2 duration-300",
      isBot ? "items-start" : "items-end"
    )}>
      <div className="flex items-center gap-2 mb-1">
        {isBot && (
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px]">
            🤖
          </div>
        )}
        <span className="text-[10px] text-muted-foreground">
          {isBot ? "系统助手" : "您"} • {time}
        </span>
      </div>
      <div
        className={cn(
          "rounded-2xl px-4 py-2 max-w-[90%] text-sm transition-all duration-200",
          isBot 
            ? "bg-secondary/50 border border-border text-foreground rounded-tl-none" 
            : "bg-primary text-primary-foreground shadow-sm rounded-tr-none",
          "prose prose-sm max-w-none prose-p:my-0.5 prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0 prose-pre:bg-muted prose-pre:text-muted-foreground prose-code:text-foreground prose-code:bg-muted/50 prose-code:px-1 prose-code:rounded",
          !isBot && "prose-invert"
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;