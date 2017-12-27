
官方文档 https://ssr.vuejs.org/zh/

官方示例代码 https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/entry-server.js

参考文档 https://juejin.im/entry/5a02b29bf265da430b7aaa8d

# 什么是服务器端渲染(SSR)？

Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。
然而，也可以将同一个**组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器**，最后将静态标记"混合"为客户端上完全交互的应用程序。

服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。


demo： https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Ftangdaohai%2Fvue-prerender-demo

# 约束

如果你打算为你的vue项目在node使用 SSR，那么在通用代码中，我们有必要并且需要遵守下面的这些约定：

> 通用代码: 在客户端与服务器端都会运行的部分为通用代码。

1. 避免在 beforeCreate 和 created 生命周期时产生全局副作用的代码

避免在 beforeCreate 和 created 生命周期时产生全局副作用的代码，例如在其中使用 setInterval 设置 timer。在纯客户端(client-side only)的代码中，我们可以设置一个 timer，然后在 beforeDestroy 或 destroyed 生命周期时将其销毁。但是，由于在 SSR 期间并不会调用销毁钩子函数，所以 timer 将永远保留下来。

为了避免这种情况，**请将副作用代码移动到 beforeMount 或 mounted 生命周期中**

2. 避免状态单例

Node.js 服务器是一个长期运行的进程。当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着如果创建一个单例对象，它将在每个传入的请求之间共享。
**应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例**

同样的规则也适用于 `router`、`store` 和 `event bus` 实例。你不应该直接从模块导出并将其导入到应用程序中，而是需要在 createApp 中创建一个新的实例，并从根 Vue 实例注入。

> 在使用带有 `{ runInNewContext: true }` 的 `bundle renderer` 时，可以消除此约束，但是由于需要为每个请求创建一个新的 `vm` 上下文，因此伴随有一些显著性能开销。

3. 如有在beforeCreat与created钩子中使用第三方的API，需要确保该类API在node端运行时不会出现错误，比如在created钩子中初始化一个数据请求的操作，这是正常并且及其合理的做法。但如果只单纯的使用XHR去操作，那在node端渲染时就出现问题了，所以应该采取axios这种浏览器端与服务器端都支持的第三方库。

在纯客户端应用程序(client-only app)中，每个用户会在他们各自的浏览器中使用新的应用程序实例。对于服务器端渲染，我们也希望如此：每个请求应该都是全新的、独立的应用程序实例，以便不会有交叉请求造成的状态污染(cross-request state pollution)。

4. 通用代码不可接受特定平台的 API

因此如果你的代码中，直接使用了像 window 或 document，这种仅浏览器可用的全局变量，则会在 Node.js 中执行时抛出错误，反之也是如此

建议将平台特定实现包含在通用 API 中: 例如，axios 是一个 HTTP 客户端，可以向服务器和客户端都暴露相同的 API

对于仅浏览器可用的 API，通常方式是，在「纯客户端(client-only)」的生命周期钩子函数中惰性访问(lazily access)它们。

5. 自定义指令处理

大多数自定义指令直接操作 DOM，因此会在服务器端渲染(SSR)过程中导致错误。有两种方法可以解决这个问题：

推荐使用组件作为抽象机制，并运行在「虚拟 DOM 层级(Virtual-DOM level)」（例如，使用渲染函数(render function)）。

如果你有一个自定义指令，但是不是很容易替换为组件，则可以在创建服务器 renderer 时，使用 directives 选项所提供"服务器端版本(server-side version)"。

# 开始

1. 首先安装 ssr 支持

`npm i vue-server-renderer --save`

2. 增加Count页面, 并添加到路由

`src/components/Count.vue`

```
<template>
  <div>
    <h3> Count page</h3>
    <div>
      <p>{{ mode }}</p>
      <p>count: {{ count }}</p>
      <p>
        <button @click="count ++">click +1</button>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mode: process.env.VUE_ENV === 'server' ? 'server' : 'client',
        count: 0
      }
    }
  }
</script>
```

`src/router/index.js`

```
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/count',
      name: 'Count',
      component: Count
    }
  ]
})
```

3. 在src目录下创建两个js:

```
src
├── entry-client.js # 仅运行于浏览器
└── entry-server.js # 仅运行于服务器
```

4. 修改router配置

为了避免产生单例的影响，暴露出 `createRouter` 函数，函数每次返回一个新的 `router` 实例

```
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

const routerOpt = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/count',
      name: 'Count',
      component: () => import('@/components/Count') //异步组件
    }
  ]
}

// 为了避免产生单例的影响，暴露出createRouter 每次返回一个新的 router 实例
export function createRouter () {
  return new Router(routerOpt)
}

export default new Router(routerOpt)
```

5. 改造 `main.js`

main.js初始化的只适合在浏览器的运行，所以要改造两端都可以使用的文件，同样为了避免产生单例的影响，这里将导出一个createApp的工厂函数:

```
import Vue from 'vue'
import App from './App'
import { createRouter } from './router'

Vue.config.productionTip = false

export function createApp () {
  // 创建 router 实例
  const router = createRouter()
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    render: h => h(App)
  })

  return { app, router }
}

6. entry-client.js

```
import { createApp } from './main'

const { app, router } = createApp()

// 因为可能存在异步组件，所以等待router将所有异步组件加载完毕，服务器端配置也需要此操作
router.onReady(() => {
  app.$mount('#app')
})
```

7. entry-server.js

```
import { createApp } from './main'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        // eslint-disable-next-line
        return ject({ code: 404 })
      }
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app)
    }, reject)
  })
}
```

### webpack配置

vue相关代码已处理完毕，接下来就需要对webpack打包配置进行修改了。

官网推荐下面这种配置：

```
build
├── webpack.base.conf.js	# 基础通用配置
├── webpack.client.conf.js  # 客户端打包配置
└── webpack.server.conf.js  # 服务器端打包配置
```

但vue-cli初始化的配置文件也有三个：base、dev、prod ，我们依然保留这三个配置文件，只需要增加`webpack.server.conf.js`即可。

1. `webpack` 客户端的配置

修改`webpack.base.conf.js`的`entry`入口配置为: `./src/entry-client.js`。这样原 dev 配置与 prod 配置都不会受到影响。

2. 