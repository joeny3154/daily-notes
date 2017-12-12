vue2.0组件通信
===

## [父子通讯](https://cn.vuejs.org/v2/guide/components.html#使用-Prop-传递数据)

**父组件的数据需要通过 prop 才能下发到子组件中**

- 子组件要显式地用 props 选项声明它预期的数据

  ```
  Vue.component('child', {
    // 声明 props
    props: ['message'],
    // 就像 data 一样，prop 也可以在模板中使用
    // 同样也可以在 vm 实例中通过 this.message 来使用
    template: '<span>{{ message }}</span>'
  })
  ```

  1. 向它传入一个普通字符串：

  `<child message="hello!"></child>`

  2. 使用字面量语法传递数值

  `<child v-bind:message="1"></child>``

  3. 使用动态语法传递值

  `<child v-bind:message="value"></child>``

## [子向父通讯](https://cn.vuejs.org/v2/guide/components.html#使用-v-on-绑定自定义事件)

- 使用 v-on 绑定自定义事件

  1. 使用 $on(eventName) 监听事件

  2. 使用 $emit(eventName) 触发事件

  ```
  <div id="counter-event-example">
    <p>{{ total }}</p>
    <button-counter v-on:increment="incrementTotal"></button-counter>
    <button-counter v-on:increment="incrementTotal"></button-counter>
  </div>
  ```

  ```
  Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
      incrementCounter: function () {
        this.counter += 1
        this.$emit('increment')
      }
    },
  })

  new Vue({
    el: '#counter-event-example',
    data: {
      total: 0
    },
    methods: {
      incrementTotal: function () {
        this.total += 1
      }
    }
  })
  ```


## [非父子通讯](https://cn.vuejs.org/v2/guide/components.html#非父子组件的通信)

  使用一个空的 Vue 实例作为事件总线：

  `var bus = new Vue()`

  ```
  // 触发组件 A 中的事件
  bus.$emit('id-selected', 1)
  ```

  ```
  // 在组件 B 创建的钩子中监听事件
  bus.$on('id-selected', function (id) {
    // ...
  })
  ```

  在复杂的情况下组件之间通讯

  [状态管理模式](https://cn.vuejs.org/v2/guide/state-management.html)



vue2.0[组件懒加载](https://cn.vuejs.org/v2/guide/components.html#异步组件)（异步组件）
===

- webpack 的代码分割功能

  ```
  Vue.component('async-webpack-example', function (resolve) {
    // 这个特殊的 require 语法告诉 webpack
    // 自动将编译后的代码分割成不同的块，
    // 这些块将通过 Ajax 请求自动下载。
    require(['./my-async-component'], resolve)
  })
  ```

- webpack 2 + ES2015 的语法

  ```
  Vue.component(
    'async-webpack-example',
    // 该 `import` 函数返回一个 `Promise` 对象。
    () => import('./my-async-component')
  )
  ```

  局部注册时, 也可以直接提供一个返回 Promise 的函数：
  ```
  new Vue({
    // ...
    components: {
      'my-component': () => import('./my-async-component')
    }
  })
  ```

- 路由中配置异步组件

  ```
  export default new Router({
      routes: [
          {
              mode: 'history',
              path: '/my',
              name: 'my',
              component:  resolve => require(['../page/my/my.vue'], resolve),//懒加载
          },
      ]
  })
  ```
