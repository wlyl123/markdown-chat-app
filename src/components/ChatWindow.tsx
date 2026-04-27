import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import CodePreview from "./CodePreview";
import AISettings from "./AISettings";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { Code2, KeyRound, Layout, Moon } from "lucide-react";

interface Message {
  content: string;
  isBot: boolean;
  code?: string;
  codeTitle?: string;
  codeLanguage?: string;
}

const SUGGESTED_PROMPTS = [
  {
    text: "帮我写一个网站",
    icon: <Code2 className="w-3.5 h-3.5 mr-1.5 text-blue-500" />,
  },
  {
    text: "创建登录页面",
    icon: <KeyRound className="w-3.5 h-3.5 mr-1.5 text-green-500" />,
  },
  {
    text: "设计响应式布局",
    icon: <Layout className="w-3.5 h-3.5 mr-1.5 text-purple-500" />,
  },
  {
    text: "添加深色模式",
    icon: <Moon className="w-3.5 h-3.5 mr-1.5 text-orange-500" />,
  },
];

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const callPerplexityAPI = async (message: string) => {
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的前端开发助手。请生成可运行的React组件代码，包含完整的JSX、CSS样式和功能。回复格式：先简短说明，然后提供代码示例。'
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      return data.choices[0]?.message?.content || "抱歉，无法生成回复。";
    } catch (error) {
      console.error('API调用失败:', error);
      return "API调用失败，请检查网络连接和API密钥。";
    }
  };

  const simulateBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    let responseContent = "";
    let codeContent = "";
    let codeTitle = "";
    
    if (apiKey) {
      // 使用真实AI API
      responseContent = await callPerplexityAPI(userMessage);
      
      // 检查回复中是否包含代码
      const codeMatch = responseContent.match(/```(\w+)?\s*([\s\S]*?)```/);
      if (codeMatch) {
        codeContent = codeMatch[2];
        codeTitle = "生成的代码";
        responseContent = responseContent.replace(/```(\w+)?\s*([\s\S]*?)```/, "").trim();
      }
    } else {
      // 演示模式 - 智能分析用户需求并提供代码示例
      const getSmartResponse = (message: string) => {
        const msg = message.toLowerCase();
        
        if (msg.includes('登录') || msg.includes('登录页')) {
          codeContent = `import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('登录:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">用户登录</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="邮箱地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;`;
          codeTitle = "登录页面组件";
          return "我为您创建了一个完整的登录页面组件，包含邮箱和密码输入框，以及现代化的卡片设计。";
        }
        
        if (msg.includes('导航') || msg.includes('菜单') || msg.includes('导航栏')) {
          codeContent = `import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Home, User, Settings } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: '首页', href: '/' },
    { icon: User, label: '用户', href: '/profile' },
    { icon: Settings, label: '设置', href: '/settings' }
  ];

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">我的网站</div>
          
          {/* 桌面菜单 */}
          <div className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
          
          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* 移动端菜单 */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;`;
          codeTitle = "响应式导航栏组件";
          return "我创建了一个响应式导航栏组件，支持桌面和移动端，包含图标和动画效果。";
        }
        
        if (msg.includes('卡片') || msg.includes('产品') || msg.includes('商品')) {
          codeContent = `import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { name, price, image, rating, category, inStock } = product;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover"
          />
          <Badge 
            variant={inStock ? "default" : "destructive"}
            className="absolute top-2 right-2"
          >
            {inStock ? "现货" : "缺货"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="outline">{category}</Badge>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={\`w-4 h-4 \${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}\`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({rating})</span>
        </div>
        
        <div className="text-2xl font-bold text-primary">
          ¥{price.toLocaleString()}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          disabled={!inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {inStock ? "加入购物车" : "暂时缺货"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;`;
          codeTitle = "产品卡片组件";
          return "我创建了一个精美的产品卡片组件，包含图片、评分、价格和购买按钮，支持库存状态显示。";
        }
        
        // 默认回复
        return "请连接AI API密钥以获取真实的代码生成功能，或尝试询问具体的组件需求（如：创建登录页面、导航栏、产品卡片等）。";
      };
      
      responseContent = getSmartResponse(userMessage);
    }
    
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { 
        content: responseContent, 
        isBot: true,
        code: codeContent || undefined,
        codeTitle: codeTitle || undefined,
        codeLanguage: "tsx"
      },
    ]);
  };

  const handleSendMessage = (content: string) => {
    setMessages((prev) => [...prev, { content, isBot: false }]);
    simulateBotResponse(content).catch(() => {
      toast({
        variant: "destructive",
        title: "错误",
        description: "获取回复失败，请重试。",
      });
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`w-full max-w-2xl mx-auto flex flex-col justify-between transition-[min-height] duration-300 ease-[cubic-bezier(0.3,0,0.3,1)] ${messages.length === 0 ? 'min-h-[100px]' : 'min-h-[600px]'}`}>
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center">
          <div className="transition-all duration-300">
            <h1 className="text-3xl font-medium text-center mb-1">欢迎使用智能助手</h1>
            <p className="text-muted-foreground text-center mb-4">我可以帮您创建网站、应用和解决各种技术问题</p>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <div ref={scrollRef} className="flex-1 px-2 md:px-4 py-4 overflow-auto max-h-[500px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className="animate-in slide-in-from-bottom-2 duration-300"
              >
                <div>
                  <ChatMessage {...message} />
                  {message.code && (
                    <CodePreview
                      code={message.code}
                      title={message.codeTitle || "代码示例"}
                      language={message.codeLanguage || "tsx"}
                    />
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="animate-in fade-in-0 duration-300 text-sm text-muted-foreground ml-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                  <span>正在思考中...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="px-2 md:px-4 pb-4">
        <AISettings onApiKeyChange={setApiKey} />
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        {messages.length === 0 && (
          <div className="mt-6 flex justify-center animate-in fade-in-0 duration-500">
            <div className="flex flex-wrap gap-1 justify-center max-w-lg">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-xs rounded-full flex items-center hover:bg-accent px-2.5 py-1 transition-colors duration-200"
                  onClick={() => handleSendMessage(prompt.text)}
                >
                  {prompt.icon}
                  {prompt.text}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
