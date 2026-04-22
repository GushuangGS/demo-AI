# 发现记录

## 当前任务

- 目标是从 `mine.vue` 的“帮我买”入口进入一个新下单页。
- 参考图位于 `用户端/file/帮我买/screen.png`，另有 `进行中的订单.png` 可用于提交后目标状态参考。

## 已知项目结构

- 用户端主项目位于 `用户端/`。
- 订单页面位于 `用户端/pages/order/order.vue`，已实现订单多状态展示。
- 当前项目中尚未存在“帮我买”页面。

## 参考图关键信息

- `帮我买/screen.png` 顶部为自定义导航，标题是“帮我买”，右侧头像。
- 页面主体包含蓝色 Hero 卡片、商品信息输入框、预估价格、添加图片、买卖地址、送达时间、备注要求、费用汇总和底部提交按钮。
- 提交按钮默认位于内容底部上方，底部仍保留自定义 tabbar，当前激活的是“预约”。
- `帮我买/进行中的订单.png` 表明提交后应进入订单页的“进行中”展示态，而不是停留在列表态。

## 现有代码发现

- `mine.vue` 当前没有“帮我买”入口，登录态主要是服务列表，未登录态有功能卡片。
- `pages.json` 目前尚未注册“帮我买”页面，需要新增路由。
- `order.vue` 已有 `activePrimaryTab` 控制三个大状态，适合通过缓存或页面参数切换到 `delivery`。

## 本次实现结论

- 已新增 `用户端/pages/buy/buy.vue`，实现蓝色 Hero 卡片、商品输入、价格、图片上传、地址选择、送达时间、备注要求、费用汇总与底部提交按钮。
- 下单页通过 `isSubmitEnabled` 控制提交按钮，仅在商品、价格、地址、收货信息、送达时间、备注齐全时允许提交。
- 提交订单后使用缓存键 `urban_architect_order_redirect` 和 `urban_architect_active_order` 驱动订单页跳转并展示进行中订单。
- `mine.vue` 已在登录态和未登录态都接入“帮我买”入口。

## 继续迭代结论

- 已新增 `用户端/pages/buy/address.vue`，将购买地址和收货地址管理拆成独立页面。
- `buy.vue` 现通过 `pages/buy/address` 选择地址，返回后用缓存同步表单。
- 提交订单时除了写入进行中详情数据，还会写入 `urban_architect_order_list`，使订单页列表态可见新订单。
- `order.vue` 现会在页面显示时同时同步进行中详情数据和自定义订单列表数据。

## 首页服务扩展

- `index.vue` 已具备统一的 `handleServiceAction()` 入口，适合继续给其余三个服务补 `path`。
- 首页“立即呼叫服务”按钮当前已按选中的服务执行跳转，因此只要补齐对应页面和路由，按钮与卡片都会自动生效。
- 已新增三个业务页：`pages/send/send.vue`、`pages/errand/errand.vue`、`pages/all/all.vue`。
- 三个页面都沿用现有移动端风格，包含 Hero 区、表单/选项卡片和提交按钮，可作为后续接真实业务流的落点。

## 三页提交流程

- `send.vue` 已支持完整校验和提交，提交后会生成“帮我送”进行中订单，并跳转订单页。
- `errand.vue` 已支持任务说明与预算校验，提交后会生成“帮我办”进行中订单，并跳转订单页。
- `all.vue` 已支持需求标签与详细需求校验，提交后会生成“万能帮”进行中订单，并跳转订单页。
- `order.vue` 新增了 `addressLabel` 与 `detailLabel` 的可配置显示，便于不同服务类型共用详情布局。

## 订单仓库与专属详情

- 已新增 `用户端/utils/order-store.js`，封装订单仓库、列表同步、当前进行中订单同步等逻辑。
- `buy.vue`、`send.vue`、`errand.vue`、`all.vue` 现统一通过 `buildCommonOrderRecord()` 和 `submitOrderRecord()` 写入订单仓库。
- `detail.vue` 现会优先按 `orderNo` 从订单仓库读取完整订单记录，并根据 `type` 渲染专属详情区块。
- 四类订单详情都已能保留更多字段，如图片、地址、备注、预算、需求标签、时效和费用说明。

## 本轮首页与根页复刻

- `首页` 与 `我的` 文件夹中的 `code.html` 对应的是两张根页面原型，项目中此前只有占位 `pages/index/index.vue`，且不存在真正的 `pages/mine/mine.vue` 与 `pages/order/order.vue`。
- `pages.json` 此前只注册了首页，导致已有业务页与订单详情页在小程序侧并不完整可达；本轮已补齐全部用到的页面注册。
- 由于项目需要保留设计稿里的自定义底部导航，不能直接启用 uni-app 原生 `tabBar`；否则会和页面底部导航重复显示。
- 为兼容这一点，提交订单后的返回链路和业务页底部导航统一改为 `uni.reLaunch()` 跳根页，而不是依赖 `uni.switchTab()`。
- 现已新增三个真实根页：`pages/index/index.vue`、`pages/order/order.vue`、`pages/mine/mine.vue`，分别对应首页、订单、我的三大入口。
- 根页实现中仅使用当前本地图标表里已有的 PNG 图标名，避开原型 HTML 中缺失的 `policy`、`schedule_send`、`calendar_today` 等图标，确保小程序端图标可以正常显示。
