# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

这是一个跑腿/代办服务的 Demo 项目，包含三个子项目，当前工作目录是**用户端**：

```
跑腿demo/
  用户端/     ← 当前目录（UniApp Vue3，微信小程序）
  骑手端/     （UniApp Vue3，微信小程序）
  server/     （NestJS，端口 3000）
```

## 开发命令

### 用户端（UniApp）
UniApp 项目通过 **HBuilderX IDE** 构建和运行，没有标准 npm 脚本。  
在 HBuilderX 中选择"运行 → 运行到小程序模拟器 → 微信开发者工具"来启动。

微信小程序 AppID：`wx76499faba7653faa`

### 服务端（NestJS）
```bash
cd ../server
npm run start:dev   # 开发模式（watch，端口 3000）
npm run lint        # ESLint 检查并自动修复
npm run test        # 单元测试
npm run test:e2e    # E2E 测试
```

## 架构要点

### 用户端结构

**页面路由**（`pages.json` 管理，均为 `navigationStyle: custom`）：
- `pages/index` — 首页，服务入口卡片 + 快速预约表单
- `pages/order` — 订单页，含列表（`order.vue`）、详情（`detail.vue`）、客服（`service.vue`）、评价（`review.vue`）
- `pages/mine` — 我的，用户信息 + 功能入口
- `pages/buy` — 帮我买，代购下单
- `pages/send` — 帮我送，快递/送件下单
- `pages/errand` — 帮我办，代办跑腿下单
- `pages/all` — 所有服务列表

**API 层**（`api/`）：
- `request.js` — 封装 `uni.request`，自动附加 Bearer token，基础 URL 硬编码为 `http://127.0.0.1:3000`
- `auth.js` — 登录/自动演示登录（`ensureDemoLogin`），演示账号手机号：`13800138000`
- `order.js` — 订单 CRUD，所有下单接口通过 `withUserId()` 自动注入当前用户 ID

**本地状态管理**（`utils/order-store.js`）：  
项目不使用 Vuex/Pinia，订单状态全部通过 `uni.getStorageSync/setStorageSync` 管理。  
`order-store.js` 提供了本地订单仓库（`ORDER_REPOSITORY_KEY`）的增删改查工具函数。

Storage key 常量：
- `urban_architect_token` — JWT Token
- `urban_architect_user` — 用户信息
- `urban_architect_order_repository` — 完整订单数据
- `urban_architect_order_list` — 订单列表项（派生自 repository）
- `urban_architect_active_order` — 当前进行中订单
- `urban_architect_order_redirect` — 订单完成后跳转标志

**图标组件**（`components/LocalIcon.vue`）：  
所有图标使用本地图片，通过 `name` prop 映射到 `components/local-icon-map.js` 中的路径。  
在 `pages.json` 中配置了 easycom，可直接用 `<LocalIcon name="xxx" />` 不需要 import。

### 服务端结构（`../server`）

- **`auth` 模块** — 登录即注册，手机号唯一标识用户，返回 mock token（格式：`mock-token-${userId}`）
- **`orders` 模块** — 订单 CRUD，支持按 userId/status 过滤，`getDashboard` 返回看板聚合数据
- **`shared/file-store.ts`** — JSON 文件持久化工具（`ensureJsonFile` / `writeJsonFile`），数据存于 `data/users.json` 和 `data/orders.json`

服务端无真实 JWT 验证，Token 验证逻辑未实现（Demo 项目）。

## 关键约定

- 下单流程：用户端先调 `ensureDemoLogin` 取得 userId，再调相应 createOrder API，同时通过 `submitOrderRecord` 写入本地 storage
- 订单页面入口模式：通过读 `ORDER_REDIRECT_KEY` 决定进入"进行中"视图还是"列表"视图
- 图标新增：先在 `static/` 放置图片，再在 `local-icon-map.js` 中注册映射
