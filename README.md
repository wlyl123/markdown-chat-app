# Markdown Chat App

极简 Markdown 对话体验 — React + TypeScript + Tailwind CSS + shadcn/ui

## 功能

- 💬 **实时对话**：用户发送消息，系统自动生成 Markdown 格式回复
- 📝 **Markdown 渲染**：支持加粗、斜体、代码块、列表、引用等语法
- 💾 **本地持久化**：对话记录自动保存到 localStorage，刷新不丢失
- 🎨 **暗色模式**：支持明暗主题切换
- 📱 **响应式设计**：适配桌面、平板、手机
- 🗑️ **一键清空**：快速清除所有对话记录

## 技术栈

- **React 18** — UI 框架
- **TypeScript** — 类型安全
- **Vite** — 构建工具
- **Tailwind CSS** — 样式框架
- **shadcn/ui** — UI 组件库（基于 Radix UI）
- **react-markdown** — Markdown 渲染
- **Biome** — 代码格式化与 Lint

## 快速开始

```bash
pnpm install
pnpm dev
```

浏览器访问 `http://localhost:5173`

## 构建

```bash
pnpm build
```

产物在 `dist/` 目录。

## License

MIT