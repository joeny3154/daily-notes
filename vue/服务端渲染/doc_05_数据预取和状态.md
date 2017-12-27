

# 概要

- 组件添加数据预取逻辑：在路由组件上暴露出一个自定义静态函数 `asyncData`

- 服务器端数据预取(Server Data Fetching)： 对所有匹配的路由组件调用 `asyncData()`，并设置`context.state = store.state`

- 客户端数据预取(Client Data Fetching): 
  - `store` 获取 `window.__INITIAL_STATE__` 状态并替换：store.replaceState(window.__INITIAL_STATE__)

  - 处理数据预取：两种方式

    1. 在路由导航之前解析数据： 在全局路由守卫`router.beforeResolve`中处理 
    2. 匹配要渲染的视图后，再获取数据：使用全局混合（Vue.mixin）添加`beforeMount` 选项处理预期逻辑

- Store 代码拆分(Store Code Splitting)

  - 在路由组件的 asyncData 钩子函数中，使用 `store.registerModule` 惰性注册模块
