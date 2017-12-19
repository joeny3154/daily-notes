重定向 和 别名
=====

# 重定向

有三种配置方式

1. 通过 routes 配置

```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

2. 命名的路由

```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: {name: 'foo'}}
  ]
})
```

3. 方法，动态返回重定向目标

```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

其它高级用法，请参考[例子](https://github.com/vuejs/vue-router/blob/next/examples/redirect/app.js)。

# 别名

重定向 vs 别名

`重定向`: 当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`

`别名`: `/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。

配置：

```
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

`别名` 的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。

更多高级用法，请查看[例子](https://github.com/vuejs/vue-router/blob/next/examples/route-alias/app.js)。