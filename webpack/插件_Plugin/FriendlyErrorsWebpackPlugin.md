friendly-errors-webpack-plugin 
======

能够更好在终端看到webapck运行的警告和错误

https://www.npmjs.com/package/friendly-errors-webpack-plugin

npm install friendly-errors-webpack-plugin --save-dev


# 基本用法

``` js
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
 
var webpackConfig = {
  // ... 
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
  // ... 
}
```

# 关闭错误

``` js
app.use(require('webpack-dev-middleware')(compiler, {
  quiet: true,
  publicPath: config.output.publicPath,
}));
```

如果你使用webpack-dev-server，webpack的devServer选项有一个设置

``` js
// webpack config root 
{
  // ... 
  devServer: {
    // ... 
    quiet: true,
    // ... 
  },
  // ... 
}
```

如果使用webpack-hot-middleware，那么通过将log选项设置为no-op来完成。你可以做一些这样的事情，这取决于你的设置：

app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}));

# 选项

``` js
new FriendlyErrorsPlugin({
  // 编译成功提醒
  compilationSuccessInfo: {
    messages: ['您的应用程序运行在 http://localhost:3000'],
    notes: ['显示成功编译额外字符']
  },
  // 你可以听到由插件转换和排序的错误, 严重程度可以是“错误”或“警告” 
  onErrors: function (severity, errors) {
    // You can listen to errors transformed and prioritized by the plugin 
    // severity can be 'error' or 'warning' 
  },
  // should the console be cleared between each compilation? 
  // default is true 
  // 是否应该在每个编译之间清除控制台？默认是true
  clearConsole: true,
 
  // add formatters and transformers (see below) 
  // 添加格式化程序和变换器
  additionalFormatters: [],
  additionalTransformers: []
})
```

# 添加桌面提醒

该插件没有本地支持桌面通知，但很容易添加它们, 例如 node-notifier

var NotifierPlugin = require('friendly-errors-webpack-plugin');
var notifier = require('node-notifier');
var ICON = path.join(__dirname, 'icon.png');
 
new NotifierPlugin({
    onErrors: (severity, errors) => {
      if (severity !== 'error') {
        return;
      }
      const error = errors[0];
      notifier.notify({
        title: context.pkg.name,
        message: severity + ': ' + error.name,
        subtitle: error.file || '',
        icon: ICON
      });
    }
  })
]