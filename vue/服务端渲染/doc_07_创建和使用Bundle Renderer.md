传入 BundleRenderer
=====

# `bundle renderer` 概念:

# 使用基本SSR: 调用`createRenderer`方法 

``` js
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer({template}).renderToString(app, context, (err, html) => {
  
})
```

**存在的问题**: 1. 每次编辑过应用程序源代码必须停止并重启服务; 2. 不支持 `source map`

# 使用BundleRenderer: 调用`createBundleRenderer` 

``` js
renderer { createBundleRenderer } = require('vue-server-renderer')
// 假设生成 bundle renderer 所需的构建工件`serverBundle`已经生成, 下章介绍如何通过webpack 配置生成
const renderer = createBundleRenderer(serverBundle, {template, ...restOpt})

// 在服务器处理函数中……
server.get('*', (req, res) => {
  const context = { url: req.url }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    res.end(html)
  })
})
```
  
bundle renderer 在调用 renderToString 时，它将自动执行「由 bundle 创建的应用程序实例」所导出的函数（传入上下文作为参数），然后渲染它。
