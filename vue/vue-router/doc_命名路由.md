

命名路由
====

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。

# 配置

const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})

# 使用

- 声明式: `<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>`

- 编程式: `router.push({ name: 'user', params: { userId: 123 }})`