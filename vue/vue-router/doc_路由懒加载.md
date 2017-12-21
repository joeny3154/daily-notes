路由懒加载
=====

结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。

**第一步：**

const Foo = () => Promise.resolve({ /* 组件定义对象 */ })

**第二步：**

在 Webpack 2 中，我们可以使用动态 import语法来定义代码分块点 (split point)：

import('./Foo.vue') // 返回 Promise

> **注意：**如果您使用的是 Babel，你将需要添加 `syntax-dynamic-import` 插件，才能使 Babel 可以正确地解析语法。

**结合第一、二步：**

结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。

`const Foo = () => import('./Foo.vue')`

**路由配置**

在路由配置中什么都不需要改变，只需要像往常一样使用 Foo：

```
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

# 把组件按组分块

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

eg:
```
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。