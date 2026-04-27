import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Settings, Eye, EyeOff, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AISettingsProps {
  onApiKeyChange: (apiKey: string) => void;
}

const AISettings = ({ onApiKeyChange }: AISettingsProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem("perplexity_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsConnected(true);
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("perplexity_api_key", apiKey);
      setIsConnected(true);
      onApiKeyChange(apiKey);
      toast({
        title: "API密钥已保存",
        description: "AI助手现在可以生成真实的代码了！",
      });
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("perplexity_api_key");
    setApiKey("");
    setIsConnected(false);
    onApiKeyChange("");
    toast({
      title: "已断开连接",
      description: "AI助手已切换到演示模式",
    });
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Settings className="w-4 h-4" />
          AI助手设置
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-xs">
                API 密钥
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    placeholder="输入您的API 密钥"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="text-xs pr-8"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-6 w-6 p-0"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <Button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  size="sm"
                  className="text-xs"
                >
                  连接
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              连接后AI助手将能够生成真实的网页代码。暂时可以使用演示模式体验基础功能。
            </p>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">AI助手已连接</span>
              </div>
            </div>
            <Button
              onClick={handleDisconnect}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              断开连接
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AISettings;