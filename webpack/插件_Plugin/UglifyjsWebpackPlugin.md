UglifyjsWebpackPlugin
========

https://github.com/webpack-contrib/uglifyjs-webpack-plugin

http://www.css88.com/doc/webpack2/plugins/uglifyjs-webpack-plugin/

https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/#-


`npm i -D uglifyjs-webpack-plugin`

这个插件使用 UglifyJS 去压缩你的JavaScript代码。除了它从 webpack 中解耦之外，它和 webpack 核心插件 (`webpack.optimize.UglifyJSPlugin`) 是同一个插件。这允许你控制你正在使用的 UglifyJS 的版本。

> 注意: webpack 在 `webpack.optimize.UglifyJsPlugin` 下包含相同的插件。对于那些想控制 `UglifyJS` 版本的开发者来说，这是一个独立的版本。


``` js
// ...
const webpackConfig = merge(baseWebpackConfig, {
  // ...
  plugins: [
    // ...
    new UglifyJsPlugin({
      
      uglifyOptions: {
        // 压缩选项：见UglifyJS 文档 http://lisperator.net/uglifyjs/compress
        compress: {
          warnings: false
        }
      },
      // 使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。
      sourceMap: config.build.productionSourceMap,
      // parallel: { Boolean | Number } 启用并行。 默认为false, 为true时，并发运行的默认数量：os.cpus().length - 1。
      parallel: true
    })
  ]
}
```

# 配置选项

`parallel`: `{ Boolean | Number }`使用多进程并行运行来提高构建速度,默认为false。为true时并发运行的默认数量：`os.cpus().length - 1`


`comments`: 注释相关的配置:`boolean, RegExp, function(astNode, comment) -> boolean`  默认保存包含 `/*!`, `/**!`, `@preserve` or `@license` 的注释

`compress`: 见 [UglifyJS 文档](http://lisperator.net/uglifyjs/compress)

``` js
{
  sequences     : true,  // join consecutive statemets with the “comma operator”
  properties    : true,  // optimize property access: a["foo"] → a.foo
  dead_code     : true,  // discard unreachable code
  drop_debugger : true,  // discard “debugger” statements
  unsafe        : false, // some unsafe optimizations (see below)
  conditionals  : true,  // optimize if-s and conditional expressions
  comparisons   : true,  // optimize comparisons
  evaluate      : true,  // evaluate constant expressions
  booleans      : true,  // optimize boolean expressions
  loops         : true,  // optimize loops
  unused        : true,  // drop unused variables/functions
  hoist_funs    : true,  // hoist function declarations
  hoist_vars    : false, // hoist variable declarations
  if_return     : true,  // optimize if-s followed by return/continue
  join_vars     : true,  // join var declarations
  cascade       : true,  // try to cascade `right` into `left` in sequences
  side_effects  : true,  // drop side-effect-free statements
  warnings      : true,  // warn about potentially dangerous optimizations/code
  global_defs   : {}     // global definitions
}
```

`sourceMap`: `boolean = false`, 使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。

`test`: `RegExp, Array`, 默认`/.js($|\?)/i`, 测试匹配的文件

`include`: `RegExp, Array`, 只测试包含的文件。

`exclude`: `RegExp, Array`, 要从测试中排除的文件。

`mangle`: mangle.props (boolean|object) - 传递 true 或者一个对象可以启用并提供 UglifyJS mangling 属性选项 