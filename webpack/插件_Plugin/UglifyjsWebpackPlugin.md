UglifyjsWebpackPlugin
========

[详见](https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/#-)


# `parallel` { Boolean | Number }

``` js
new UglifyJsPlugin({
  // 启用并行化。 并发运行的默认数量：os.cpus().length - 1
  parallel: true, 
  // 指定并发运行数。
  parallel: 4
})
```
并行化可以显着加快你的构建，因此强烈推荐

# `sourceMap` { Boolean | String }

# `uglifyOptions` { Object }

``` js
[
  new UglifyJsPlugin({
    uglifyOptions: {
      ie8: false,
      ecma: 8,
      parse: {...options},
      mangle: {
        ...options,
        properties: {
          // mangle property options
        }
      },
      output: {
        comments: false,
        beautify: false,
        ...options
      },
      compress: {...options},
      warnings: false
    }
  })
]
```

- `compress` 

{Boolean|Object} 添加压缩选项，默认为true， 

- `warnings` 

{Boolean} 默认false 显示警告
