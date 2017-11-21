### 增强 uglifyPlugin


https://segmentfault.com/a/1190000007891318


```
new webpack.optimize.UglifyJsPlugin({
   exclude:/\.min\.js$/
   mangle:true,
   compress: { warnings: false },
   output: { comments: false }
})

```

修改成如下代码即可：

```
const os = require('os');
    const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
    
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
       }
    })

```