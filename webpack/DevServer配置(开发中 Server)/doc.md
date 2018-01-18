开发中 Server(DevServer)
======

http://www.css88.com/doc/webpack2/configuration/dev-server/

使用`webpack-dev-server` 能够用于快速开发应用程序, 
webpack `DevServer`配置选项 将改变 `webpack-dev-server`(简写为：dev-server) 的行为


# 概要

- `devServer.publicPath`: 设置相应路径下的打包文件可在浏览器中访问

- `devServer.proxy`: 设置代理，解决同域名下发送 API 请求

- `devServer.watchOptions`: webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。此选项用来定制 Watch 模式


# `devServer.publicPath`

此路径下的打包文件可在浏览器中访问。

假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js。默认 publicPath 是 "/"，所以你的包(bundle)可以通过 `http://localhost:8080/bundle.js` 访问。

可以修改 `publicPath`，将 bundle 放在一个目录：`publicPath: "/assets/"`, 你的包现在可以通过 http://localhost:8080/assets/bundle.js 访问

**确保 publicPath 总是以斜杠(/)开头和结尾。**

也可以使用一个完整的 URL。这是模块热替换所必需的。`publicPath: "http://localhost:8080/assets/"`
bundle 可以通过 http://localhost:8080/assets/bundle.js 访问。

`devServer.publicPath` 和 `output.publicPath` 一样被推荐。

# `devServer.proxy`

如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

# devServer.watchOptions

webpack 可以监听文件变化，当它们修改后会重新编译。webpack `watch` 选项可启用 Watch 模式，意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改，Watch 模式默认关闭, 即 `watch: false`

> `webpack-dev-server` 和 `webpack-dev-middleware` 里 **Watch 模式**默认开启。

1. `watchOptions.aggregateTimeout` : `number`

默认：`aggregateTimeout: 300` // 默认值
当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位

2. `watchOptions.ignored`

对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，例如 node_modules：
`ignored: /node_modules/` 

也可以使用 anymatch 模式：`ignored: "files/**/*.js"`

3. `watchOptions.poll` : `boolean` or `number`

通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。

`poll: 1000` 每秒检查一次变动