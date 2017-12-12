vue2.0[组件通信](https://github.com/webplus/blog/issues/10)
===

- [父向子通信](http://www.jianshu.com/p/2670ca096cf8)

  1. 子组件在props中创建一个属性，用以接收父组件传过来的值

  2. 父组件中注册子组件

  3. 在子组件标签中添加子组件props中创建的属性

  4. 把需要传给子组件的值赋给该属性

- [子向父通信](http://www.jianshu.com/p/2670ca096cf8)

  1. 子组件中需要以某种方式,例如点击事件的方法来触发一个自定义事件

  2. 将需要传的值作为$emit的第二个参数，将该值将作为实参传给响应自定义事件的方法

  3. 在父组件中注册子组件并在子组件标签上绑定对自定义事件的监听

- [兄弟组件之间的通信](http://www.jianshu.com/p/d946bd7c26f4)

  1. 创建一个事件总线，创建一个空的Vue实例为bus，用它作为通信桥梁

  2. 在需要传值的组件中用bus.$emit触发一个自定义事件，并传递参数

  3. 在需要接收数据的组件中用bus.$on监听自定义事件，并在回调函数中处理传递过来的参数

- [全局状态管理，Vuex]

  基于SPA的应用，使用全局state共享数据，达到组件与组件间的通讯

  ![](https://camo.githubusercontent.com/8e8390a0fdc6c069a9b96b4d54105362ead77427/687474703a2f2f76756566652e636e2f696d616765732f73746174652e706e67)


vue2.0[组件懒加载](http://www.cnblogs.com/zhanyishu/p/6587571.html)
===

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

- 实例中配置异步组件

  ```
  components: {
        historyTab: resolve => {require(['../../component/historyTab/historyTab.vue'], resolve)},//懒加载
        // historyTab: () => import('../../component/historyTab/historyTab.vue')
    },
  ```

- 全局注册异步组件

  ```
  Vue.component('mideaHeader', () => {
    System.import('./component/header/header.vue')
  })
  ```
