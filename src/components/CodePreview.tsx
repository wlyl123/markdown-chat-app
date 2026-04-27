import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Copy, Play, Code } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CodePreviewProps {
  code: string;
  title: string;
  language: string;
}

const CodePreview = ({ code, title, language }: CodePreviewProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "已复制",
      description: "代码已复制到剪贴板",
    });
  };

  const runCode = () => {
    setIsRunning(true);
    toast({
      title: "代码执行",
      description: "正在生成预览...",
    });
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={runCode}
            disabled={isRunning}
            className="h-8 w-8 p-0"
          >
            {isRunning ? (
              <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">
              <Code className="w-3 h-3 mr-1" />
              代码
            </TabsTrigger>
            <TabsTrigger value="preview">预览</TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="mt-4">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
              <code className={`language-${language}`}>{code}</code>
            </pre>
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            <div className="border rounded-lg p-4 bg-background min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                {isRunning ? "正在生成预览..." : "点击运行按钮查看预览效果"}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodePreview;