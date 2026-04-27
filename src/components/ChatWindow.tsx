import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  content: string;
  timestamp: number;
}

const STORAGE_KEY = "chat_messages";

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }
  }, []);

  // Save messages to localStorage and scroll to bottom
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div 
        className="flex-1 p-6 overflow-y-auto"
      >
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground opacity-50">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-lg font-medium">开始您的第一条对话</p>
              <p className="text-sm">消息将保存在本地</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} content={message.content} timestamp={message.timestamp} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
      <div className="p-6 border-t bg-card mt-auto sticky bottom-0">
        <div className="max-w-2xl mx-auto w-full">
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;