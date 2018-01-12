webpack 实现持久化缓存
====

# 概要

- 文件 Hash 摘要

  1. webpack 计算hash的方式及对比 

  2. webpack 配置计算hash

  3. chunkhash不稳定问题及其原因
    
    1. entry 内容修改后导致 entry chunk 对应的 ID 改变，webpack runtime代码随之变化

    2. webpack runtime 代码集成到 vendor chunk，导致vendor chunk也因此改变

  4. webpack runtime 代码的主要功能

- 如何生成稳定的模块 ID？

- 如何避免频繁的 chunk 内容变动

https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/


缓存（cache）一直是前端性能优化的重头戏，利用好静态资源的缓存机制，可以使我们的 web 应用更加快速和稳定。
仅仅简单的资源缓存是不够的，我们还要为不断更新的资源做持久化缓存（Long term cache）。

# 文件 Hash 摘要

### webpack 计算hash的方式及对比 

Hash文件名（vendor.f02bc2.js）是实现持久化缓存的第一步

目前 webpack 有两种计算 hash 的方式：

1. 计算所有 chunks 的 hash —— [hash]

  每次编译生成一个唯一 hash，适合 chunk 拆分不多的小项目，但所有资源全打上同一个 hash，无法完成持久化缓存的需求

2. 为每个 chunk 计算 hash —— [chunkhash]

  webpack 为每个 chunk 资源都生成与其内容相关的 hash 摘要，为不同的资源打上不同的 hash。

### webpack配置 计算hash

JS 资源的 [chunkhash] 由 webpack 计算
Images/Fonts 的 [hash] 由 webpack/file-loader 计算
提取的 CSS 的 [contenthash] 由 webpack/extract-text-webpack-plugin 计算。

eg: webpack2部分配置

``` js
// production
output: {  
  filename: '[name].[chunkhash:8].bundle.js',
  chunkFilename: '[name].[chunkhash:8].js'
},
module: {  
  rules: [{
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: 'assets/imgs/[name].[hash:8].[ext]'
    }
  }, {
    test: /\.(woff2?|eot|ttf|otf)$/i,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'assets/fonts/[name].[hash:8].[ext]'
    }
  }]
},
plugins: [  
  new ExtractTextPlugin('[name].[contenthash:8].css')
]
```

> **注意：**不要在开发环境使用 [chunkhash]/[hash]/[contenthash]，因为不需要在开发环境做持久缓存，而且这样会增加编译时间，开发环境用 [name] 就可以了。

### chunkhash不稳定问题及其原因

只是计算 chunk MD5 摘要并修改 chunk 资源文件名是不够的。Chunk 的生成还涉及到依赖解析和模块 ID 分配，这是无法稳定实质上没有变化的 chunk 文件的 chunkhash 变动问题的本源

常见问题：[Vendor chunkhash changes when app code changes #1315](https://github.com/webpack/webpack/issues/1315)

问题描述：虽然只修改了 app.js 的代码，但在最终的构建结果中，vendor.js 的 chunkhash 也被修改了，尽管 vendor.js 的内容没有实质变化

**造成上述问题的原因**

1. webpack runtime 中包含 chunks ID 及其对应 chunkhash 的对象，但 runtime 被集成到 vendor.js 中

2. entry 内容修改后，由于 webpack 的依赖收集规则导致构建产生的 entry chunk 对应的 ID 发生变化，webpack runtime 也因此被改变

> 解决这个问题的核心**在于生成稳定的模块 ID，避免频繁的 chunk 内容变动**

*webpack runtime代码的主要功能:*

- 全局 `webpackJsonp` 方法：模块读取函数，用来区分模块是否加载，并调用 `__webpack_require__` 函数；

- 私有 `__webpack_require__` 方法：模块初始化执行函数，并给执行过的模块做标记；

- 异步 chunk 加载函数（用 script 标签异步加载），加载的 chunk 内容均被 webpackJsonp 包裹的，script 加载成功会直接执行。这个函数还包含了所有生成的 chunks 的路径。在 webpack 2 中这个函数用到了 Promise，因此可能需要提供 Promise Polyfill；

- 对 ES6 Modules 的默认导出（export default）做处理。


# 一、如何生成稳定的模块 ID？

默认，模块的 ID 是 webpack 根据依赖的收集顺序递增的正整数，这种 ID 分配方式不太稳定，因为修改一个被依赖较多的模块，依赖这个模块的 chunks 内容均会跟着模块的新 ID 一起改变，但实际上我们只想让用户下载有真正改动的 chunk，而不是所有依赖这个新模块的 chunk 都重新更新。

1. OccurrenceOrderPlugin 

这个插件可以改变默认的 ID 决定方式，让 webpack 以依赖模块出现的次数决定 ID 的值，次数越多 ID 越小。在依赖项变动不大情况下，还是一个比较好的方法，但当依赖出现次数有变化时，输出的模块 ID 则可能会有大幅变动（级联）。（目前 webpack 2 已经将此插件默认启用 🎉）

2. NamedModulesPlugin

这个模块可以将依赖模块的正整数 ID 替换为相对路径(如：将 4 替换为 ./node_modules/es6-promise/dist/es6-promise.js)

开发模式，它可以让 webpack-dev-server 和 HMR 进行热更新时在控制台输出模块名字而不是纯数字；
生产构建环境，它可以避免因修改内容导致的 ID 变化，从而实现持久化缓存。

两个缺点:

递增 ID 替换为模块相对路径，构建出来的 chunk 会充满各种路径，使文件增大；
模块（npm 和自己的模块）路径会泄露，可能导致安全问题。

3. HashedModuleIdsPlugin 

这是 NamedModulesPlugin 的进阶模块，它在其基础上对模块路径进行 MD5 摘要，不仅可以实现持久化缓存，同时还避免了它引起的两个问题（文件增大，路径泄露）。用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化


# 二、如何避免频繁的 chunk 内容变动？

一般场景下，我们可能不需要做太多的优化，也不用追求持久化缓存，常规配置即可

``` js
{
  entry: { entry },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'entry']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: Infinity
    })
  ]
}

```

但随着业务需求变化，最初的单页模式可能无法满足需求，而且把公共模块全部提取到 vendor 中，也无法做到较好的持久化缓存，我们需要更合理地划分并提取公共模块。

### 合理划分公共模块

稍大型的应用通常会包含这几个部分:

|   类型      |公用率     |      使用频率	| 更新频率 |          例                    |
|-------------|----------|--------------|---------|-------------------------------|
|库和工具	      |高	      |高	          |   低	    | vue/react/redux/whatwg-fetch 等|
|定制UI库和工具	 |高	       |高	           |中	      | UI 组件/私有工具/语法 Polyfill/页面初始化脚本等|
|低频库/工具/代码|低	      |低	          |低	      | 富文本编辑器/图表库/微信 JSSDK/省市 JSON 等|
|业务模块	      |低	       |高	          |高	     | 包含业务逻辑的模块/View                    |


根据公用/使用/更新率来做公共模块的划分是比较科学：

- 库和工具 - `libs`

- 定制 UI 库和工具 - `vendor`

- 业务模块 - `entries`

- 低频库/工具/代码 - 分割为 `chunk`

我们可通过指定模块的入口 chunk，来直接分离模块。以 Vue 搭建的多入口单页应用为例：

``` js
{
  entry: {
    libs: [
      'es6-promise/auto',
      'whatwg-fetch',
      'vue',
      'vue-router'
    ],
    vendor: [
      // vendor 中均是非 npm 模块，用 resolve.alias 修改路径，避免冗长的相对路径。如assets, components
      'assets/libs/fastclick',
      'components/request',
      'components/ui',
      'components/bootstrap' // 初始化脚本
    ],
    page1: 'src/pages/page1',
    page2: 'src/pages/page2'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 省略部分配置
      template: 'src/pages/page1/index.html',
      chunks: ['libs', 'vendor', 'page1']
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/page2/index.html',
      chunks: ['libs', 'vendor', 'page2']
    })
  ]
}
```
注意：

1. 上面示例代码中 vendor chunk 均是非 npm 模块，用 resolve.alias 修改路径, 比如:

``` js
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // ...
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
```

2. 多页入口最好用脚本来扫描目录并生成，手动添加维护性较差

### 代码分割

除了入口代码的分离，我们还缺少对「低频库/工具/代码」的处理，对于这类代码最好的办法是做代码分割（Code Splitting），做到按需加载，进一步加速应用。

webpack 提供了几种添加分割点的方法：

- CommonJs: require.ensure
- AMD: require
- ES6 Modules (webpack 2)

添加分割点可以主动将指定的模块分离成另一个 chunk，而不是随当前 chunk 一起打包。对于这几种情况处理非常好：

- 比较大，且不常用的库/工具，如 D3.js、Draft.js、微信 JSSDK、querystring 等；

- 单页应用中不常用的 router view，即某些不常访问的介面。

**import()**

webpack 2 在 1.x 的基础上增加了对 ES6 模块（ES6 Modules）的支持，这意味着在 webpack 2 环境下，import 导入模块语法不再需要编译为 require 了。还优化了 ES6 模块依赖（Tree-shaking，后面会谈到），并实现了 JS Loader Standard 规范定义中的 import(path) 方法。

由于 import() 仅仅是个语法，不涉及转换，因此我们需要使用 babel 插件 syntax-dynamic-import 来让 babel 可以识别这个语法。


### 提取公共模块

提取公共模块要使用 Commons-chunk-plugin，对于持久化缓存来说，我们只需要将共用的模块打包到 libs/vendor 中即可

模块有两种共用情况：

- libs、vendor 与其他 chunk 共用的模块，如：vue、react、moment、whatwg-fetch

- 多个 chunks 间共用的模块，如 page1 和 page2 共用 Header 组件

**配置示例：**

1. 把所有共用的模块全部提取

```
new webpack.optimize.CommonsChunkPlugin({  
  names: ['vendor', 'libs']
})
```
*webpack runtime代码会打包到 names 末尾的 chunk 中*。
所以用上述配置构建时，webpack 会将 webpack runtime 打包到 libs 中（names 数组末尾的 chunk），而 chunks 间共用的模块会打包到 vendor中

### manifest (清单)

``` js
new webpack.optimize.CommonsChunkPlugin({  
  // 将 `manifest` 优先于 libs 进行提取，
  // 则可以将 webpack runtime 分离到这个块中。
  names: ['manifest', 'libs', 'vendor'].reverse()
  // manifest 只是个有意义的名字，也可以改成其他名字。
})
```

manifest 包含 webpack runtime 代码 和 manifest

构建之后，就会多打包一个特别小（不足 2kb）的 manifest.js，解决了 libs 经常「被」更新的问题。

不过，你可能发现了一个问题 —— manifest.js 实在是太小了，以至于不值得再为一个小 js 增加资源请求数量。因此我们可以引入另一个插件：inline-manifest-webpack-plugin。 它可以将 manifest 转为内联在 html 内的 inline script。因为 manifest 经常随着构建而变化，写入到 html 中便不需要每次构建再下载新的 manifest 了，从而减少了一个小文件请求。此插件依赖 html-webpack-plugin 和 manifest 公共块，因此我们要配置 HtmlWebpackPlugin 且保持 manifest 的命名

``` js
{
  module: {
    rules: [{
      test: /\.ejs$/,
      loader: 'ejs-loader'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest', 'libs', 'vendor'].reverse()
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/page1/index.ejs',
      chunks: ['manifest', 'libs', 'vendor', 'page1']
    }),
    new InlineManifestWebpackPlugin()
  ]
}
```

```EJS Template:
<!-- ejs template -->  
<!DOCTYPE html>  
<html lang="zh-CN">

<head>  
  <meta charset="UTF-8">
  <title>Template</title>
  <%= htmlWebpackPlugin.files.webpackManifest %>
</head>

<body>  
  <div id="app"></div>
</body>

</html> 
```

### 提取 CSS


### Tree Shaking

注意：

为了避免 import x from 'foo' 被 babel 转换为 require，我们需要在 .babelrc 的 presets 配置中标明 "modules": false：

```
{
  "presets": [
    ["latest", {
      "es2015": { "modules": false }
    }]
  ],
  "plugins": ["transform-runtime", "syntax-dynamic-import"],
  "comments": false
}
```

webpack 在构建过程中只会标记出未使用的 exports，并不会直接将 dead code 去掉，因为为了使工具尽量通用，webpack 被设计为：只标注未使用的 imports/exports。真正的清除死代码工作，交给了 UglifyJS/babili 等工具。

UglifyJsPlugin 不仅可以将未使用的 exports 清除，还能去掉很多不必要的代码，如无用的条件代码、未使用的变量、不可达代码等。

``` js
new webpack.optimize.UglifyJsPlugin({  
  compress: { warnings: true }
})
```

*如果打开了 UglifyJsPlugin 的 warning 功能，就可以在构建结果中看到代码清除警告*

因此必须在生产环境中配置 UglifyJsPlugin，并启用 -p (production) 环境，才能真正发挥 Tree Shaking 的作用。