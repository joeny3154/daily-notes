滚动行为
======

注意: 这个功能只在 HTML5 history 模式下可用

当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：

scrollBehavior 方法接收 to 和 from 路由对象。

**savedPosition**

第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

- `{ x: number, y: number }`
- `{ selector: string, offset? : { x: number, y: number }}` (offset 只在 2.6.0+ 支持)

如果返回一个 falsy (译者注：falsy 不是 false，参考这里)的值，或者是一个空对象，那么不会发生滚动。

eg:

1. 对于所有路由导航，简单地让页面滚动到顶部:

```
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

2. 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样

```
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

3. 拟『滚动到锚点』的行为

```
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```

4. 利用路由元信息更细颗粒度地控制滚动

https://github.com/vuejs/vue-router/blob/next/examples/scroll-behavior/app.js

```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = {
  template: `
    <div>
      bar
      <div style="height:500px"></div>
      <p id="anchor">Anchor</p>
    </div>
  `
}

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    <!-- savedPosition仅适用于popstate导航（通过浏览器的 前进/后退 按钮触发） -->
    return savedPosition
  } else {
    const position = {}
    // 返回选择器，模拟锚点
    if (to.hash) {
      position.selector = to.hash
    }
    // 检查任何匹配的路由是否有路由元信息滚动到顶部
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    如果返回的位置是falsy对象，将保留当前的滚动位置。
    return position
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [
    { path: '/', component: Home, meta: { scrollToTop: true }},
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar, meta: { scrollToTop: true }}
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Scroll Behavior</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <!-- 锚点 -->
        <li><router-link to="/bar#anchor">/bar#anchor</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
```