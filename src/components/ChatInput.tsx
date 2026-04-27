import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="请输入您的问题或需求..."
        disabled={disabled}
        rows={3}
        className="w-full pr-12 rounded-2xl bg-muted/50 hover:bg-muted/70 border border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors resize-none"
      />
      {message.trim() && (
        <Button 
          type="submit" 
          size="icon" 
          disabled={disabled || !message.trim()} 
          className="absolute right-2 bottom-2 rounded-full h-7 w-7 p-0 bg-primary hover:bg-primary/90"
        >
          <ArrowUp className="h-3 w-3" />
        </Button>
      )}
    </form>
  );
};

export default ChatInput;