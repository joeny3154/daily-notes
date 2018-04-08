hash、chunkhash、contenthash区别
====

hash一般是结合CDN缓存来使用，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对应文件哈希值也会改变，对应的HTML引用的URL地址也会改变，触发CDN服务器从源服务器上拉取对应数据，进而更新本地缓存。但是在实际使用的时候，这几种hash计算还是有一定区别。


- hash

hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值

``` js
output:{
  path:path.join(__dirname, '/dist/js'),
  filename: 'bundle.[name].[hash].js',
},
plugins:[
  new extractTextPlugin('../css/bundle.[name].[hash].css')
]
```

- chunkhash

采用hash计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即chunkhash。

chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。

``` js
output:{
  path:path.join(__dirname, '/dist/js'),
  filename: 'bundle.[name].[chunkhash].js',
},
plugins:[
  new extractTextPlugin('../css/bundle.[name].[chunkhash].css')
]
```

- contenthash

在chunkhash的例子，我们可以看到由于index.css被index.js引用了，所以共用相同的chunkhash值。但是这样子有个问题，如果index.js更改了代码，css文件就算内容没有任何改变，由于是该模块发生了改变，导致css文件会重复构建。
这个时候，我们可以使用extra-text-webpack-plugin里的contenthash值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建。

``` js
output:{
  path:path.join(__dirname, '/dist/js'),
  filename: 'bundle.[name].[chunkhash].js',
},
plugins:[
  new extractTextPlugin('../css/bundle.[name].[contenthash].css')
]
```