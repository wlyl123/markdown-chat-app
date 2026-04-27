import { useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import AppIntroduction from "@/components/AppIntroduction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Info } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                智能聊天
              </TabsTrigger>
              <TabsTrigger value="intro" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                应用介绍
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex items-center justify-center">
            <ChatWindow />
          </TabsContent>
          
          <TabsContent value="intro">
            <AppIntroduction />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;