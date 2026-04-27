import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  content: string;
  timestamp: number;
  isBot: boolean;
}

const STORAGE_KEY = "chat_messages";

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
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

  const simulateBotResponse = async (userText: string) => {
    setIsTyping(true);
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const botContent = `### 您好！已收到您的消息
您发送的内容是：**"${userText}"**

这是一条由系统生成的 **Markdown** 格式回复：
1. **自动渲染**：支持加粗、斜体等语法。
2. **代码支持**：支持代码块展示。
3. **列表展示**：如您所见，这是一个有序列表。

> 提示：本网站已强制将所有生成的文字转码为 Markdown 格式撰写。

\`\`\`javascript
// 示例代码
console.log("Hello, Markdown!");
\`\`\``;

    const botMessage: Message = {
      id: crypto.randomUUID(),
      content: botContent,
      timestamp: Date.now(),
      isBot: true,
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      timestamp: Date.now(),
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    simulateBotResponse(content);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div 
        className="flex-1 p-6 overflow-y-auto"
      >
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground opacity-50">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-lg font-medium">开始您的第一条对话</p>
              <p className="text-sm">内容将强制以 **Markdown** 格式生成</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  content={message.content} 
                  timestamp={message.timestamp} 
                  isBot={message.isBot}
                />
              ))}
              {isTyping && (
                <div className="flex items-start gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-xs">🤖</span>
                  </div>
                  <div className="bg-secondary/30 rounded-2xl px-4 py-2 text-sm text-muted-foreground">
                    正在撰写 Markdown 内容...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
      <div className="p-6 border-t bg-card mt-auto sticky bottom-0">
        <div className="max-w-2xl mx-auto w-full">
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;