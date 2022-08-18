# 后台管理系统

#### 介绍
vue2+elementui

#### 特技
=======
![项目技术栈](./src/assets/images/jsz.png)

# 脚手架的搭建

1. 下载 node.js
2. npm -i @vue/cli(vue2)
3. vue create ProjectName

# 使用插件

1. vue-router
2. vuex
3. mockjs
4. js-cookie
5. element-ui
6. echarts
7. axios

# 系统架构

--api
--mockServerData（模拟后台数据）
--home.js(首页 echarts 图标数据)
--permission.js(权限菜单数据)
--user.js(用户表格数据)
--axios.js(对 axios 二次封装)
--data.js(axios 对外暴露接口)
--mock.js(mock 拦截请求接口)
--config（设置配置 根据开发 和 生产环境）
--node_modules(依赖包)
--public（静态资源）
--src
--assets（静态资源）
--components
--CommonAside.vue(侧边菜单)
--CommonForm.vue（封装表单）
--CommonHeader.vue（顶部容器）
--CommonTable.vue（封装表格）
--CommonTag.vue（Tag 标签组件）
--echarts.vue（封装 echarts 图表）
--router（路由配置）
--store
--index.js（vuex 配置）
--tab.js（权限菜单和面包屑和标签状态管理）
--user.js(用户 token 管理)
--views
--Home（首页）
--Login（登录页面）
--Mall（商品管理页面，待完善）
--Other（其他页面，待完善）
--User（用户管理页面）
--Main.vue(主页组件)
--App.vue
--main.js（入口文件）

# 系统核心重点

1. 项目搭建+使用 element 实现首页布局
2. 顶部导航菜单及与左侧导航联动的面包屑实现
3. 封装一个 ECharts 组件
4. 封装一个 Form 表单组件和 Table 表格组件
5. 登录权限管理

# 面包屑导航思路

面包屑是在 head 部分组件里,Tag 标签虽然不再 head 部分组件里,但是它在整个管理后台系统中是会一直存在的，所以需要在 Main.vue 中。
这两块功能的实现,主要依赖 Element-ui 两个样式 Breadcrumb 面包屑 + Tag 标签
整个大致逻辑是这样的,首先是面包屑 首页 一定要存在的,接下来 侧边组件 点击某菜单,把这个数据存到 vuex 中，然后 头部组件 来获取 vuex 中这个数据并展示。

### 登录权限

我们给系统添加一个登录凭证叫"token"，这个 token 在登录的时候通过接口请求将用户名和密码传给后端，后端再数据库中匹配成功后返回一个凭证，前端将 token 缓存起来，再调用接口时传给后端验证就建立了登录权限校验。根据不同的登录渲染不同的权限菜单，实现动态路由的创建。

