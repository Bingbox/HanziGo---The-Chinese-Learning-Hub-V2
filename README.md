# HanziGo 研发团队开发手册 & 架构设计文档

## 1. 项目概述 (Project Overview)
**HanziGo** 是一款全栈式（Full-stack）中文学习应用。项目采用前后端分离的架构思想，但为了部署的轻量化，实际运行在一个 Node.js 进程中（Express 提供 API，Vite 提供前端静态资源与开发环境的热更新）。
项目核心业务包括：体系化课程（Learn）、文化探索（Explore）、HSK 题库模考（Exam）、AI 智能语伴（AI Tutor）以及配套的内容管理后台（Admin CMS）。

## 2. 技术栈选型 (Tech Stack)

### 2.1 前端 (Frontend)
*   **核心框架**: React 18 (Functional Components + Hooks)
*   **构建工具**: Vite (极速冷启动和 HMR 热更新)
*   **样式方案**: Tailwind CSS (Utility-first，支持高度定制的响应式设计)
*   **图标库**: `lucide-react` (轻量级 SVG 矢量图标)
*   **路由与状态**: 采用单页面应用 (SPA) 模式，通过顶层 `App.tsx` 中的 Context (`useExam`) 进行全局状态管理和视图切换，未使用重量级的 React Router 或 Redux。

### 2.2 后端 (Backend)
*   **运行环境**: Node.js (v18+)
*   **Web 框架**: Express.js (提供 RESTful API 和静态文件服务)
*   **开发中间件**: Vite Middleware (在开发环境下，Express 拦截 API 请求，其余请求交由 Vite 处理)

### 2.3 数据与 AI (Data & AI)
*   **数据库**: SQLite3 (`better-sqlite3` 驱动)。轻量级、零配置，数据文件存储在本地 `hanzigo.db`。
*   **AI 服务**: `@google/genai` (Google Gemini API)。用于 AI Tutor 的多轮对话、生词提取、语法分析及语音合成 (TTS)。

---

## 3. 目录结构指南 (Directory Structure)

新开发者接手项目时，请优先熟悉以下目录结构：

```text
.
├── server.ts                 # 后端入口：Express 实例、API 路由定义、Vite 中间件集成
├── migrate.ts                # 数据库迁移脚本：定义建表语句(DDL)和初始化种子数据
├── package.json              # 项目依赖与 npm scripts (dev, build, start)
├── src/                      # 前端源码目录
│   ├── App.tsx               # 前端入口：定义全局 Context、主布局、视图路由分发
│   ├── main.tsx              # React 挂载点
│   ├── index.css             # 全局样式与 Tailwind 引入
│   ├── types/                # TypeScript 类型定义 (如 Unit, Exercise, HSKLevel)
│   ├── components/           # UI 组件库 (按业务模块划分)
│   │   ├── Dashboard.tsx     # 学习仪表盘
│   │   ├── Learn.tsx         # 体系化学习模块
│   │   ├── CultureFeed.tsx   # 文化探索模块
│   │   ├── ExamCenter.tsx    # HSK 模考中心
│   │   ├── AITutor.tsx       # AI 语伴对话界面
│   │   └── AdminDashboard.tsx# CMS 管理后台
│   ├── services/             # 业务逻辑与 API 封装
│   │   ├── api.ts            # 封装 fetch 请求，与后端 Express 交互
│   │   ├── geminiService.ts  # 封装 Gemini API 的调用 (流式对话、TTS)
│   │   └── questionBankService.ts # 题库生成与本地进度管理
│   └── data/                 # 静态配置与预设数据 (如词汇表、多语言翻译)
```

---

## 4. 核心数据流与架构 (Data Flow & Architecture)

### 4.1 整体数据流向
1.  **初始化**: `migrate.ts` 创建 SQLite 表并写入初始数据。
2.  **后端启动**: `server.ts` 启动 Express，连接 SQLite，暴露 `/api/*` 接口。
3.  **前端加载**: `App.tsx` 挂载，通过 `useEffect` 调用 `api.ts` 向后端请求初始数据（Units, Categories, Exams），并存入 React Context。
4.  **用户交互**: 用户在 UI 上操作，触发 Context 状态更新或调用 `api.ts` 进行数据持久化。

### 4.2 数据库表结构设计 (Schema)
数据库采用关系型设计，支持层级数据的下钻管理。

*   **Learn 模块表**:
    *   `learn`: 存储单元元数据 (`id` PK, `data` JSON)。
    *   `exercises`: 存储具体题目 (`id` PK, `unit_id` FK, `data` JSON)。
*   **Explore 模块表**:
    *   `explore`: 存储文化大类 (`id` PK, `data` JSON)。
    *   `culture_topics`: 存储具体文章 (`id` PK, `category_id` FK, `data` JSON)。
*   **Exam 模块表**:
    *   `exams`: 存储 HSK 级别元数据 (`title` PK, `data` JSON)。
    *   `questions`: 存储 HSK 题库 (`id` PK, `level` INTEGER, `type` TEXT, `data` JSON)。

> **💡 架构思考**: 为什么使用 `data JSON` 字段？
> 为了保持前端数据结构的灵活性，我们将复杂的对象（如题目的选项、多语言标题）序列化为 JSON 存储在 SQLite 中。这在快速迭代期非常高效。

### 4.3 AI Tutor 模块深度解析
AI Tutor 是项目中最复杂的模块之一，涉及流式传输和多模态。
1.  **流式响应 (Streaming)**: `AITutor.tsx` 调用 `geminiService.ts` 的 `getAITutorResponseStream`。前端通过 `for await (const chunk of stream)` 逐字渲染回复，提升用户体验。
2.  **结构化数据提取**: 提示词 (Prompt) 强制 Gemini 使用特定标签（如 `[VOCAB]...[/VOCAB]` 和 `[ANALYSIS]...[/ANALYSIS]`）。前端通过正则表达式解析这些标签，渲染为 UI 上的“生词卡片”和“语法解析”。
3.  **语音合成 (TTS)**: 在 Voice Mode 下，前端按标点符号对流式文本进行切片，放入队列 (`audioQueueRef`)，依次调用 Gemini TTS 接口生成 Base64 音频并使用 Web Audio API 播放，实现“边想边说”的效果。

---

## 5. 接口规范 (API Contract)

后端 API 遵循 RESTful 风格，所有接口前缀为 `/api/`。

| 模块 | 方法 | 路径 | 描述 |
| :--- | :--- | :--- | :--- |
| **Learn** | GET | `/api/content/learn` | 获取所有单元列表 |
| | POST | `/api/content/learn` | 批量更新单元列表 |
| | GET | `/api/exercises/:unitId` | 获取指定单元下的所有练习题 |
| | POST | `/api/exercises/:unitId` | 批量保存指定单元下的练习题 |
| **Explore** | GET | `/api/content/explore` | 获取文化大类列表 |
| | GET | `/api/culture/topics/:categoryId` | 获取指定大类下的文化文章 |
| **Exam** | GET | `/api/content/questions?level=1` | 获取指定 HSK 级别的题库 |
| | POST | `/api/content/questions` | 新增/更新单道考题 |

---

## 6. 团队开发规范 (Development Guidelines)

### 6.1 状态管理规范
*   **全局状态**: 跨组件共享的数据（如用户信息、当前选中的语言 `lang`、全局视图 `view`、从后端拉取的全量基础数据）必须放在 `App.tsx` 的 Context 中。
*   **局部状态**: 仅在单个页面或组件内流转的数据（如表单输入框的值、模态框的开关状态、AI Tutor 的聊天记录）使用 `useState` 或 `useReducer` 放在组件内部。

### 6.2 样式与 UI 规范
*   **禁止使用内联样式 (`style={{...}}`)**，一律使用 Tailwind CSS 类名。
*   **响应式设计**: 默认编写移动端样式，使用 `md:`, `lg:` 前缀适配大屏幕。例如：`flex-col md:flex-row`。
*   **安全防御**: 在渲染数组前，**必须**进行空值检查或提供默认值，防止应用崩溃。
    *   ❌ 错误: `data.slice(0, 3).map(...)`
    *   ✅ 正确: `(data || []).slice(0, 3).map(...)`

### 6.3 多语言支持 (i18n)
*   项目中使用了自定义的 `t(key)` 函数进行国际化。
*   新增文案时，**不要硬编码中文字符串**在 UI 组件中。请在 `App.tsx` 的 `translations` 对象中添加对应的 `en` 和 `zh` 键值对，然后在组件中通过 `const { t } = useExam();` 调用。

---

## 7. 本地开发与调试指南 (Setup & Run)

### 7.1 环境准备
1.  确保已安装 Node.js (v18+)。
2.  在项目根目录创建 `.env` 文件，并配置必要的环境变量：
    ```env
    # 必须配置 Gemini API Key 才能使用 AI Tutor 功能
    GEMINI_API_KEY=your_api_key_here
    ```

### 7.2 启动项目
```bash
# 1. 安装依赖
npm install

# 2. 初始化/重置数据库 (每次修改数据库结构后需执行)
npx tsx migrate.ts

# 3. 启动本地开发服务器 (前端 Vite + 后端 Express)
npm run dev
```
启动后，访问 `http://localhost:3000` 即可预览应用。

### 7.3 常见问题排查 (Troubleshooting)
*   **数据库报错 `SQLITE_CONSTRAINT_FOREIGNKEY`**: 通常是因为在 `migrate.ts` 中删除表时顺序不对。脚本中已添加 `PRAGMA foreign_keys = OFF;` 解决此问题。如果手动操作数据库，请注意外键约束。
*   **AI Tutor 无响应**: 检查 `.env` 中的 `GEMINI_API_KEY` 是否有效，以及网络是否可以访问 Google API。
*   **前端修改未生效**: 检查终端是否有 Vite 的编译错误。由于我们禁用了 HMR（在特定沙箱环境中），有时需要手动刷新浏览器或重启 `npm run dev`。

---
*文档维护者：HanziGo 架构组*
*最后更新时间：2026-03-02*
