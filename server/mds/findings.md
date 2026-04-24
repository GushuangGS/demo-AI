# 发现记录

## 图标现状

- 项目当前通过 `static/font2.css` 引入 `Material Symbols Outlined` 字体。
- 页面模板中大量使用 `<text class="material-symbols-outlined">icon_name</text>` 形式渲染图标。
- 同时存在 `item.icon`、`item.bgIcon` 等动态图标字段，主要用于首页、订单页、我的页面和客服页。

## 下载与替换策略

- 计划使用 Material Symbols 的 Iconify JSON 数据生成本地 SVG，再借助系统 `sips` 转成 PNG。
- 计划新增统一本地图标组件，通过 `currentColor` 保持原有颜色风格。
- 需要避免误处理 `uni.showToast()` 中的 `icon: 'none'`、`icon: 'success'` 等运行时参数。

## 本次迁移结果

- 已新增 `用户端/components/LocalIcon.vue`，最终改为直接使用 `<image>` 渲染本地 PNG，解决小程序端 `mask-image` 不显示的问题。
- 已将项目中的 `material-symbols-outlined` 模板节点批量替换为 `LocalIcon` 组件调用。
- 已在 `用户端/static/icons` 生成 61 个本地 PNG 图标资源。
- 运行时不再依赖 `static/font2.css` 和 Material Symbols 字体文件，相关临时资源已清理。
- 二次排查发现，直接拼接 `/static/icons/${name}.png` 在小程序端可能不会被构建系统正确收录；现已改为 `import.meta.glob()` 的静态资源映射方式。
- 现已进一步改为更保守的纯静态 `import` 图标表方案：`components/local-icon-map.js` 显式导入全部 PNG，`LocalIcon.vue` 仅做查表渲染。
