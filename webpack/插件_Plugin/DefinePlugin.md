
DefinePlugin
====

http://www.css88.com/doc/webpack2/plugins/define-plugin/


使用 webpack 的 DefinePlugin 或者是 Browserify 的 envify 使 

process.env.NODE_ENV !== 'production' 为 false

# 概要

- 作用：创建在编译时可以配置的全局常量，实现对不同环境下构建产生不同行为



# 详解

允许你创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。

**注意**

因为这个插件直接做的文本替换,给定的值**必须包含字符串本身内的实际引号**。
通常，有两种方式来达到这个效果，使用 `'"production"'`, 或者使用 `JSON.stringify('production')`。

eg: 

``` js
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify("5fa3b9"),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: "1+1",
  "typeof window": JSON.stringify("object")
})
```

使用

``` js
console.log("Running App version " + VERSION);
if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");
```

每个传进 DefinePlugin 的**键值**都是一个标志符或者多个用 `.` 连接起来的标志符。

- 如果这个值是一个字符串，它会被当作一个代码片段来使用。

- 如果这个值不是字符串，它会被转化为字符串(包括函数)。

- 如果这个值是一个对象，它所有的 key 会被同样的方式定义。

- 如果在一个 key 前面加了 typeof,它会被定义为 typeof 调用。

- 这些值会被内联进那些允许传一个代码压缩参数的代码中，从而减少冗余的条件判断。

这些值会被内联进那些允许传一个代码压缩参数的代码中，从而减少冗余的条件判断

示例:

``` js
if (!PRODUCTION) {
  console.log('Debug info')
}
if (PRODUCTION) {
  console.log('Production log')
}
```

通过没有使用压缩的 webpack 的结果:

``` js
if (!true) {
  console.log('Debug info')
}
if (true) {
  console.log('Production log')
}
```

通过使用压缩的 webpack 的结果:`console.log('Production log')`