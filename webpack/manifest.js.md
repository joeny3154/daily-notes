

manifest 是 webpack 的 runtime，里面包含了 jsonp 方法的定义和其它 JS 的路径 mapping，因为你改了 app 会导致 runtime 里的路径改变，如果放在 vendor 中，会导致 vendor 无法长缓存。所以多出一个文件。


webpack每次build的时候都会生成一些运行时代码。当只有一个文件时，运行时代码直接塞到这个文件中。当有多个文件时，运行时代码会被提取到公共文件中，也就是楼主的vendor

 plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
        new webpack.optimize.CommonsChunkPlugin({name: 'mainifest', chunks: ['vendor']})
]