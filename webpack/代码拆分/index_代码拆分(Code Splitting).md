
代码分割 - CSS
========

***目标：*** 从 bundle 中抽离css, 可以有效利用 浏览器的异步 和 并行加载CSS 的能力。

要通过webpack打包CSS，像任何其他模块一样将CSS导入JavaScript代码，并使用css-loader（它输出CSS作为JS模块），并可选地应用ExtractTextWebpackPlugin（它提取打包的CSS并输出CSS文件）。


# 导入 CSS

像JavaScript模块一样导入CSS文件，例如在vendor.js中：

`import 'bootstrap/dist/css/bootstrap.css';`

# 使用 css-loader

在 webpack.config.js 中配置 css-loader , 如下:

```
module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: 'css-loader'
        }]
    }
}
```

结果，CSS和您的JavaScript打包在一起。

***缺点：***

您将无法利用***浏览器的异步*** 和 ***并行加载CSS的能力***。这样，您的网页必须等待，直到您的整个JavaScript 包下载完成，然后重绘网页。

webpack可以通过使用 `ExtractTextWebpackPlugin` 分别打包CSS来帮助解决这个问题。

# 使用 ExtractTextWebpackPlugin

安装

`npm i --save-dev extract-text-webpack-plugin@beta`

要使用此插件，只需要在`webpack.config.js`文件中添加两个步骤。

```
module.exports = {
    module: {
         rules: [{
             test: /\.css$/,
-            use: 'css-loader'
+            use: ExtractTextPlugin.extract({
+                use: 'css-loader'
+            })
         }]
     },
+    plugins: [
+        new ExtractTextPlugin('styles.css'),
+    ]
}
```

通过上述两个步骤，您可以专门为所有CSS模块生成新的bundle，并将它们作为单独的标记添加到index.html中