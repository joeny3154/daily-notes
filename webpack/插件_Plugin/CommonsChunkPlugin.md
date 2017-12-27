
[CommonsChunkPlugin](http://www.css88.com/doc/webpack2/plugins/commons-chunk-plugin/)

```
new webpack.optimize.CommonsChunkPlugin(options)
```

配置

``` js
{
  name: string, // or
  names: string[],
  // 这是 common chunk 的名称。已经存在的 `chunk` 可以通过传入一个已存在的 `chunk` 名称而被选择。
  // 如果一个字符串数组被传入，这相当于插件针对每个 chunk 名被多次调用
  // 如果该选项被忽略，同时 `options.async` 或者 `options.children` 被设置，所有的 chunk 都会被使用，否则 `options.filename` 会用于作为 chunk 名。

  filename: string,
  // common chunk 的文件名模板。可以包含与 `output.filename` 相同的占位符。
  // 如果被忽略，原本的文件名不会被修改(通常是 `output.filename` 或者 `output.chunkFilename`)

  minChunks: number|Infinity|function(module, count) -> boolean,
  // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
  // 数量必须大于等于2，或者少于等于 chunks的数量
  // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
  // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）

  chunks: string[],
  // 通过 chunk name 去选择 chunks 的来源。chunk 必须是  公共chunk 的子模块。
  // 如果被忽略，所有的，所有的 入口chunk (entry chunk) 都会被选择。


  children: boolean,
  // 如果设置为 `true`，所有  公共chunk 的子模块都会被选择

  async: boolean|string,
  // 如果设置为 `true`，一个异步的  公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。
  // 它会与 `options.chunks` 并行被加载。可以通过提供想要的字符串，而不是 `true` 来对输出的文件进行更换名称。

  minSize: number,
  // 在 公共chunk 被创建立之前，所有 公共模块 (common module) 的最少大小。
}
```

*提示： webpack1 构造函数 `new webpack.optimize.CommonsChunkPlugin(options, filenameTemplate, selectedChunks, minChunks)` 不再被支持。请使用相应的选项对象。*


# eg

### 公共chunk 用于 入口chunk (entry chunk)

生成一个额外的 chunk 包含入口chunk 的公共模块。

``` js
new webpack.optimize.CommonsChunkPlugin({
  name: "commons",
  // ( 公共chunk(commnons chunk) 的名称)

  filename: "commons.js",
  // ( 公共chunk 的文件名)

  // minChunks: 3,
  // (模块必须被3个 入口chunk 共享)

  // chunks: ["pageA", "pageB"],
  // (只使用这些 入口chunk)
})
```

你必须在 入口chunk 之前加载生成的这个 公共chunk:

``` html
<script src="commons.js" charset="utf-8"></script>
<script src="entry.bundle.js" charset="utf-8"></script>
```

### 明确第三方库 chunk

``` js
entry: {
  <!-- 如此其他入口引用了vendor入口的模块，就满足了CommonsChunkPlugin抽离公共代码块的条件 -->
  vendor: ["jquery", "other-lib"],
  app: "./entry"
}
new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",

  // filename: "vendor.js"
  // (给 chunk 一个不同的名字)

  minChunks: Infinity,
  // 随着 入口chunk 越来越多，这个配置保证没其它的模块会打包进 公共chunk
})
```

<script src="vendor.js" charset="utf-8"></script>
<script src="app.js" charset="utf-8"></script>

*提示： 结合长期缓存，你可能需要使用[chunk-manifest-webpack-plugin](https://github.com/diurnalist/chunk-manifest-webpack-plugin)去避免 公共chunk 改变。 你也需要使用 `records` 去保持稳定的模块 id。*


### 将公共模块打包进父 chunk

使用代码拆分功能，一个 chunk 的多个子 chunk 会有公共的模块。你可以将这些公共模块移入父 chunk (这个会减少总体的大小，但会对首次加载时间产生不良影响。如果预期用户需要下载许多兄弟 chunks，那这将非常有用)。

``` js
new webpack.optimize.CommonsChunkPlugin({
  // names: ["app", "subPageA"]
  // (选择 chunks，或者忽略该项设置以选择全部 chunks)

  children: true,
  // (选择所有被选 chunks 的子 chunks)

  // minChunks: 3,
  // (在提取之前需要至少三个子 chunk 共享这个模块)
})
```

### 额外的异步 公共chunk

与上面的类似，但是并非将公共模块移动到父 chunk（增加初始加载时间），而是使用新的异步加载的额外公共chunk。当下载额外的 chunk 时，它将自动并行下载。


``` js
new webpack.optimize.CommonsChunkPlugin({
  // names: ["app", "subPageA"]
 // (选择 chunks，或者忽略该项设置以选择全部 chunks)

  children: true,
  // (选择所有被选 chunks 的子 chunks)

  async: true,
  // (创建一个异步 公共chunk)

  // minChunks: 3,
  // (在提取之前需要至少三个子 chunk 共享这个模块)
})
```

# 给 minChunks 配置传入函数

你也可以给 minChunks 传入一个函数。这个函数会被 CommonsChunkPlugin 插件回调，并且调用函数时会传入 module 和 count 参数。

`module` 参数代表每个 chunks 里的模块，这些 chunks是你通过 name 参数传入的。

`count` 参数表示 module 被使用的 chunk 数量。

当你想要对 CommonsChunk 如何决定模块被打包到哪里的算法有更为细致的控制， 这个配置就会非常有用。

``` js
new webpack.optimize.CommonsChunkPlugin({
  name: "my-single-lib-chunk",
  filename: "my-single-lib-chunk.js",
  minChunks: function(module, count) {
    // count: countOfHowManyTimesThisModuleIsUsedAcrossAllChunks
    // 如果模块是一个路径，而且在路径中有 "somelib" 这个名字出现，
    // 而且它还被三个不同的 chunks/入口chunk 所使用，那请将它拆分到
    // 另一个分开的 chunk 中，chunk 的 keyname 是 "my-single-lib-chunk"， 而文件名是
    // "my-single-lib-chunk.js"
    return module.resource && (/somelib/).test(module.resource) && count === 3;
  }
});
```

正如上面看到的，这个例子允许你只将其中一个库移到一个分开的文件当中，当而仅当函数中的所有条件都被满足了