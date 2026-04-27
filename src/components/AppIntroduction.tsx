import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bot, Code2, Layout, Sparkles, Zap, MessageCircle } from "lucide-react";

const AppIntroduction = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bot className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            智能助手聊天平台
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          基于现代Web技术打造的智能对话平台，为开发者和用户提供便捷的AI助手服务
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="w-3 h-3" />
            AI智能对话
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Zap className="w-3 h-3" />
            实时响应
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Layout className="w-3 h-3" />
            响应式设计
          </Badge>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              智能对话
            </CardTitle>
            <CardDescription>
              支持自然语言交互，提供智能化的问答体验
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 实时消息传输</li>
              <li>• 上下文理解</li>
              <li>• 多轮对话支持</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-green-500" />
              开发助手
            </CardTitle>
            <CardDescription>
              专业的编程辅助，帮助开发者提升工作效率
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 代码生成与优化</li>
              <li>• 技术问题解答</li>
              <li>• 架构设计建议</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-purple-500" />
              现代设计
            </CardTitle>
            <CardDescription>
              精美的用户界面和流畅的交互体验
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 响应式布局设计</li>
              <li>• 深色/浅色模式</li>
              <li>• 平滑动画效果</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Technical Stack */}
      <Card>
        <CardHeader>
          <CardTitle>技术栈与特性</CardTitle>
          <CardDescription>
            采用现代化前端技术栈，确保应用的性能与可维护性
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-sm">前端技术</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">React 18</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Vite</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">核心特性</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">组件化架构</Badge>
                <Badge variant="outline">类型安全</Badge>
                <Badge variant="outline">热重载</Badge>
                <Badge variant="outline">响应式设计</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>使用指南</CardTitle>
          <CardDescription>
            快速上手使用智能助手，开始您的AI对话之旅
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <h4 className="font-medium">选择建议提示</h4>
                <p className="text-sm text-muted-foreground">
                  点击预设的建议按钮，快速开始对话
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <h4 className="font-medium">输入您的问题</h4>
                <p className="text-sm text-muted-foreground">
                  在输入框中描述您的需求，支持多行输入
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <h4 className="font-medium">获得智能回复</h4>
                <p className="text-sm text-muted-foreground">
                  AI助手将为您提供专业的回答和建议
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground border-t pt-6">
        <p>🚀 基于 React + TypeScript + Vite 构建 | ⚡ 支持实时响应 | 🎨 现代化设计</p>
      </div>
    </div>
  );
};

export default AppIntroduction;