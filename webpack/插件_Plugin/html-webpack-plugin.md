简化了HTML文件的创建，以便为您的webpack包提供服务。这对于在文件名中包含每次会随着变异会发生变化的哈希的webpack bundle尤其有用。 您可以让插件为您生成一个HTML文件，使用lodash模板提供您自己的模板，或使用您自己的loader

# 安装

`npm install --save-dev html-webpack-plugin`

# 配置选项

- `title`: 设置生成的 html 文件的标题。

模板中使用：
```
<title><%= htmlWebpackPlugin.options.title %></title>
```

- `filename`: 生成 html 文件的文件名。默认为 index.html.

- `template`: 根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader， 否则webpack不能正确解析。以 jade 为例:

``` js
loaders: {
    ...
    {
        test: /\.jade$/,
        loader: 'jade'
    }
}
plugins: [
    new HtmlWebpackPlugin({
        ...
        jade: 'path/to/yourfile.jade'
    })
]
```

-`inject`: 注入选项。有四个选项值 true, body, head, false

  1. `true`: 默认值，script标签位于html文件的 body 底部

  2. `body`: 同 true

  3. `head`: script 标签位于 head 标签内

  4. `false`: 不插入生成的 js 文件，只是单纯的生成一个 html 文件

- `favicon`: 给生成的 html 文件生成一个 favicon。属性值为 favicon 文件所在的路径名。


``` js
plugins: [
    new HtmlWebpackPlugin({
        ...
        favicon: 'path/to/yourfile.ico'
    }) 
]
```

- `favicon`: 给生成的 html 文件生成一个 favicon。属性值为 favicon 文件所在的路径名


- `minify`: 对`html`的压缩选项或者 false 。默认值为false, 表示不进行压缩
html-webpack-plugin 内部集成了 [`html-minifier`](./https://github.com/kangax/html-minifier#options-quick-reference) ,这个压缩选项同 `html-minify` 的压缩选项完全一样

``` js
new HtmlWebpackPlugin({
    // ...
    minify: {
        removeAttributeQuotes: true // 移除属性的引号
    }
})
```

``` html
<!-- 原html片段 -->
<div id="example" class="example">test minify</div>
<!-- 生成的html片段 -->
<div id=example class=example>test minify</div>
```

- `cache`

- `showErrors`: showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息

- `chunks`:

作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件.
chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件

``` js
entry: {
    entry1: path.resolve(__dirname, './src/entry1.js'),
    entry2: path.resolve(__dirname, './src/entry2.js'),
    entry3: path.resolve(__dirname, './src/entry3.js')
}
// ...
plugins: [
    new HtmlWebpackPlugin({
        // ...
        chunks: ['entry1','entry2']
    })
]
```

``` html
<script type=text/javascript src=index.js></script>
<script type=text/javascript src=index2.js></script>
```

- `excludeChunks`: 弄懂了 chunks 之后，excludeChunks 选项也就好理解了，跟 chunks 是相反的，排除掉某些 js 文件。 比如上面的例子，其实等价于下面这一行

`excludeChunks: ['index1.js']`

- `chunksSortMode`: 这个选项决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}'。

  1. 'dependency' 按照不同文件的依赖关系来排序。

  2. 'auto' 默认值，插件的内置的排序方式，具体顺序这里我也不太清楚...

  3. 'none': 

  4. function(chunk1, chunk2, ...)

- `xhtml`: 一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。


https://segmentfault.com/a/1190000007294861