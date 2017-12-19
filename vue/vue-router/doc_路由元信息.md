路由元信息
======

# 定义路由的时候可以配置 meta 字段

eg:
```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

# 访问这个 `meta` 字段

 `routes` 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录

一个路由匹配到的所有路由记录会暴露为 `$route` 对象（还有在导航守卫中的路有对象）的 `$route.matched` **数组**。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。

 eg: **展示在全局导航守卫中检查元字段**

 ```
 router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
 ```