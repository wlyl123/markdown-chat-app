import ChatWindow from "@/components/ChatWindow";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-foreground">对话框网站</h1>
      </header>
      <main className="flex-1 flex justify-center py-8 px-4">
        <div className="w-full max-w-4xl bg-card border rounded-lg shadow-sm flex flex-col h-[calc(100vh-160px)]">
          <ChatWindow />
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t bg-card">
        © 2026 对话框网站 - 极简对话体验
      </footer>
    </div>
  );
};

export default Index;