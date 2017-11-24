webpack 的文件束加载器
=======
# 安装

npm i bundle-loader --save

# 使用

```
<!-- webpack.config.js -->
module.exports = {
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader'
      }
    ]
  }
}

<!-- file.js -->
import bundle from './file.bundle.js';

bundle((file) => {
  // 相当于 const file = require('./file.js')
  
});

```

这将`require（'file.js')`包装在 `require.ensure` 块中

可以添加多个回调。 他们将按照添加的顺序执行。
```
bundle(callbackTwo)
bundle(callbackThree)
```
如果在加载依赖关系之后添加了回调函数，则会立即调用它。


# `react-cli` 中使用

`webpack.config.dev.js` & `webpack.config.prod.js`中添加如下配置：
在loader rule中添加
```
{
  test: /\.bundle\.(js|jsx)$/,
  include: path.resolve(__dirname, 'src'),
  use: 'bundle-loader?lazy!babel-loader'
},
```
# 详解


当你引用 文件束 (bundle) 的时候，chunk 会被浏览器加载:
`var waitForChunk = require("bundle-loader!./file.js");`

为了等待 chunk 的加载完成 (而且为了拿到 exports 输出)
你需要异步去等待它

```
waitForChunk(function(file) {
    // 这里可以使用file，就像是用下面的代码require进来一样
    // var file = require("./file.js");
});
// 将 require 包裹在 require.ensure 的代码块中
```

当你引用文件束的时候，chunk 会被浏览器加载。如果你想它***懒加载***，请用：

```
var load = require("bundle-loader?lazy!./file.js");
```

文件束不会被加载，除非你调用了 `call` 函数: 

```
load(function(file) {

});
```

你可能会给文件束设名称(name 查询参数)。

`require("bundle-loader?lazy&name=my-chunk!./file.js");`