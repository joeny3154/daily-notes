
http://www.css88.com/doc/webpack2/plugins/commons-chunk-plugin/

- webpack中chunk的概念

webpack将多个模块打包之后的代码集合称为chunk。


- 提取库代码

``` js
entry: {
  app: "./app.js",
  vendor: ["lodash","jquery"],
},
output: {
  path: "release",
  filename: "[name].[chunkhash].js"
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({names: ["vendor"]})
]
```

- 提取公有代码


``` js
entry: { 
    page1: "./page1.js", 
    page2: "./page2.js" 
  },
output: { 
    filename: "[name].[chunkhash].js" 
  },
plugins: [ new webpack.optimize.CommonsChunkPlugin("common.[chunkhash].js") ]
```


``` js
new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
```


options.name or options.names(string|string[]): 公共模块的名称
options.filename (string): 公开模块的文件名（生成的文件名）
options.minChunks (number|Infinity|function(module,count) - boolean): 为number表示需要被多少个entries依赖才会被打包到公共代码库；为Infinity 仅仅创建公共组件块，不会把任何modules打包进去。并且提供function，以便于自定义逻辑。
options.chunks(string[]):只对该chunks中的代码进行提取。
options.children(boolean):如果为true,那么公共组件的所有子依赖都将被选择进来
options.async(boolean|string):如果为true,将创建一个 option.name的子chunks（options.chunks的同级chunks） 异步common chunk
options.minSize(number):所有公共module的size 要大于number，才会创建common chunk

``` js
{
  name: string, // or
  names: string[],
  // 这是 common chunk 的名称。已经存在的 chunk 可以通过传入一个已存在的 chunk 名称而被选择。
  // 如果一个字符串数组被传入，这相当于插件针对每个 chunk 名被多次调用
  // 如果该选项被忽略，同时 `options.async` 或者 `options.children` 被设置，所有的 chunk 都会被使用，
  // 否则 `options.filename` 会用于作为 chunk 名。
  // When using `options.async` to create common chunks from other async chunks you must specify an entry-point
  // chunk name here instead of omitting the `option.name`.

  filename: string,
  // common chunk 的文件名模板。可以包含与 `output.filename` 相同的占位符。
  // 如果被忽略，原本的文件名不会被修改(通常是 `output.filename` 或者 `output.chunkFilename`)。
  // This option is not permitted if you're using `options.async` as well, see below for more details.

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
  // 它会与 `options.chunks` 并行被加载。
  // Instead of using `option.filename`, it is possible to change the name of the output file by providing
  // the desired string here instead of `true`.

  minSize: number,
  // 在 公共chunk 被创建立之前，所有 公共模块 (common module) 的最少大小。
}
```

https://doc.webpack-china.org/plugins/commons-chunk-plugin/