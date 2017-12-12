

[webpack 输出(Output)](http://www.css88.com/doc/webpack2/configuration/output/)


# output.path

string

output 目录对应一个**绝对路径**。

path: path.resolve(__dirname, 'dist/assets')


# output.chunkFilename

`string`

此选项决定了**按需加载**(on-demand loaded)的 chunk 文件的名称。有关可取的值的详细信息，请查看 `output.filename` 选项。

注意，这些文件名需要在 `runtime` 根据 `chunk` 发送的请求去生成。因此，需要在 webpack runtime 输出 `bundle` 值时，将 `chunk id` 的值对应映射到占位符(如 `[name]` 和 `[chunkhash]`)。这会增加文件大小，并且在任何 `chunk` 的占位符值修改后，都会使 bundle 失效。

默认使用 `[id].js` 或从 `output.filename` 中推断出的值（`[name]` 会被预先替换为 `[id]` 或 `[id]`.）。


# output.filename

默认值是 "[name].js"。

此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
对于单个入口起点，filename 会是一个静态名称。默认值是 "[name].js"。

名称配置：

- 使用入口名称： 
`filename: "[name].bundle.js"`

- 使用内部 chunk id： 
`filename: "[id].bundle.js"`

- 使用每次构建过程中，唯一的 hash 生成
`filename: "[name].[hash].bundle.js"`

- 使用基于每个 chunk 内容的 hash
`filename: "[chunkhash].bundle.js"`

注意此选项被称为文件名，但是你还是可以创建像 "`js/[name]/bundle.js`" 这样的文件夹结构。

**注意**

此选项不会影响那些「按需加载 chunk」的输出文件。对于这些文件，请使用 `output.chunkFilename` 选项来控制输出。
同样也不影响通过 `loader` 创建的文件，对于这些文件，请查看 `loader` 选项来输出控制。

# `output.library`

在编写一个导出值的 `JavaScript library` 时，可以使用下面的 `library` 和 `libraryTarget，`**导出值可以作为其他代码的依赖**。传入 `library` 名称的字符串。

注意，`output.libraryTarget` 的默认值是 `var`。这意味着，如果使用 `output.libraryTarget` 的默认值，`output.library` 会将值作为变量声明导出（当使用 script 标签时，其执行后在全局作用域可用）。

# `output.libraryTarget`

string: 默认值： "var"

配置如何暴露 `library` 。可以使用下面的选项中的任意一个

支持以下选项：

- `val` (默认值）

当 library 加载完成，入口起点的返回值将被分配给一个变量：

`var MyLibrary = _entry_return_;`

使用者将会这样调用你的 library：`MyLibrary.doSomething();`

不指定 output.library 将取消这个 var 配置

- `this`

当 library 加载完成，入口起点的返回值将分配给 this，this 的含义取决于你

`this["MyLibrary"] = _entry_return_;`

使用者将会这样调用你的 library：
```
this.MyLibrary.doSomething();
MyLibrary.doSomething(); //如果 this 是 window
```

- `window`

当 library 加载完成，入口起点的返回值将返回给 `window`对象。

`window["MyLibrary"] = _entry_return_;`

使用者将会这样调用你的 library：`window.MyLibrary.doSomething();`

- `global`

当 library 加载完成，入口起点的返回值将返回给 `global`对象。

`global["MyLibrary"] = _entry_return_;`

使用者将会这样调用你的 library：`global.MyLibrary.doSomething();`

- `commonjs`

当 library 加载完成，入口起点的返回值将分配于 exports 对象上。这个名称也意味着模块用于 CommonJS 环境：
`exports["MyLibrary"] = _entry_return_;`

使用者将会这样调用你的 library：`require("MyLibrary").doSomething();`

- `commonjs2`

 当 library 加载完成，入口起点的返回值将分配于 exports 对象上。这个名称也意味着模块用于 CommonJS 环境：
`module.exports = _entry_return_;`

使用者将会这样调用你的 library：`require("MyLibrary").doSomething();`

想要弄清楚 CommonJS 和 CommonJS2 之间的区别？查看[这里](https://github.com/webpack/webpack/issues/1114)（它们之间非常相似）。

- `commonjs-module`

使用 module.exports 对象暴露（忽略 output.library），__esModule 被定义（__esModule 为交互模式下的 ES2015 模块与 CommonJS 模块之间，起到穿针引线的作用）

- `amd`

 webpack 将你的 library 转为 AMD 模块。

 但是在这里有个很重要必备前提，入口 trunk 必须使用 define 属性定义，如果不是，webpack 将创建无依赖的 AMD 模块。 输出结果就像这样：

```
define([], function() {
    //这个模块会返回你的入口 chunk 所返回的
});
```

但是如果你下载完这个 script，首先你可能收到一个错误：define is not defined，就是这样！ 如果你使用 AMD 来发布你的 library，那么使用者需要使用 RequireJS 来加载它。

现在你已经加载过 RequireJS，你就能够加载 library。

但是，require([ _什么？_ ])？

output.library!

```
output: {
    library: "MyLibrary",
    libraryTarget: "amd"
}
```

所以你的模块看起来像这样：

```
define("MyLibrary", [], function() {
    //这个模块会返回你的入口 chunk 所返回的
});
```
你能够像这样来调用它：

```
require(["MyLibrary"], function(MyLibrary){
    MyLibrary.doSomething();
});
```
- `umd`

这是一种可以将你的 library 能够在所有的模块定义下都可运行的方式（并且导出的完全不是模块）。 它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。你可以查看 UMD 仓库 来了解更多相关信息。

- `assign`

Here webpack will blindly generate an implied global.`MyLibrary = _entry_return_;`

请注意，如果MyLibrary之前没有定义，则您的库将在全局范围内设置。

- `jsonp`
这将把你的入口点的返回值封装到一个jsonp包装器中。`MyLibrary( _entry_return_ );`

你的 library 的依赖将由 `externals` 配置定义

# `output.publicPath`