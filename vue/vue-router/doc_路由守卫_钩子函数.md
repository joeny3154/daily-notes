导航守卫
======

# 概要

- 全局钩子
  - `beforeEach`： 全局守卫
  - `beforeResolve`： 全局解析守卫
  - `afterEach`： 全局后置钩子

- 组件独享钩子
  - `beforeEnter`

- 组件钩子
  - `beforeRouteEnter`：在渲染该组件的对应路由被 confirm 前调用
  - `beforeRouteUpdate`：在当前路由改变，但是该组件被复用时调用
  - `beforeRouteLeave`：导航离开该组件的对应路由时调用

导航守卫主要用来通过跳转或取消的方式守卫导航。

有多种机会植入路由导航过程中：**全局的**, **单个路由独享的**, 或者**组件级**的。

# 全局守卫

- 全局守卫: `router.beforeEach`

- 全局解析守卫：`router.beforeResolve`

在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用

- 全局后置钩子: `router.afterEach`

# 路由独享的守卫

在路由配置上直接定义 `beforeEnter` 守卫：

const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})

# 组件内的守卫

在路由组件内直接定义以下路由导航守卫：

- beforeRouteEnter
在渲染该组件的对应路由被 confirm 前调用

- beforeRouteUpdate (2.2 新增)

 在当前路由改变，但是该组件被复用时调用

- beforeRouteLeave

 导航离开该组件的对应路由时调用


eg:

```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

**`beforeRouteEnter` 访问组件:**

beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}

**`beforeRouteLeave`使用:**

你可以 在 beforeRouteLeave 中直接访问 this。这个离开守卫通常用来禁止用户在还未保存修改前突然离开。可以通过 next(false) 来取消导航