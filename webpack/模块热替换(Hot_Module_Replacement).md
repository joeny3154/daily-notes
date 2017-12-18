模块热替换(Hot Module Replacement)
======

https://doc.webpack-china.org/api/hot-module-replacement/#src/components/Sidebar/Sidebar.jsx

**已经使用HotModuleReplacementPlugin**

如果已经通过 `HotModuleReplacementPlugin` 启用了模块热替换(Hot Module Replacement)，则它的接口将被暴露在 `module.hot` 属性下面。通常，用户先要检查这个接口是否可访问，然后再开始使用它。举个例子，你可以这样 accept 一个更新的模块：

```
if (module.hot) {
  module.hot.accept('./library.js', function() {
    // 使用更新过的 library 模块执行某些操作...
  })
}
```

支持以下方法……

### `accept`

接受(accept)给定依赖模块的更新，并触发一个 回调函数 来对这些更新做出响应

module.hot.accept(
  dependencies, // 可以是一个字符串或字符串数组
  callback // 用于在模块更新后触发的函数
)


### decline

拒绝给定**依赖模块**的更新，使用 'decline' 方法强制更新失败

module.hot.decline(
  dependencies // 可以是一个字符串或字符串数组
)