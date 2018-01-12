插件
====

# 概要

- 开发插件

  - 公开方法 `install(Vue, options)`
  - 示例

- 使用插件

``` js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

# 使用插件

通过全局方法 Vue.use() 使用插件:

``` js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)
```

传入一个选项对象:

`Vue.use(MyPlugin, { someOption: true})`

Vue.use 会自动阻止多次注册相同插件，届时只会注册一次该插件

