

chunk-manifest-webpack-plugin
=======

作用： 结合长期缓存

https://github.com/soundcloud/chunk-manifest-webpack-plugin

# 安装


`npm install --save-dev chunk-manifest-webpack-plugin`

or 

`yarn add --dev chunk-manifest-webpack-plugin`


# 使用：

// in webpack.config.js or similar
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = {
  // your config values here
  plugins: [
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: false
    })
  ]
};

# 配置选项 Options

- filename

Where the manifest will be exported to on bundle compilation. This will be relative to the main webpack output directory. Default = "manifest.json"

- manifestVariable

What JS variable on the client webpack should refer to when requiring chunks. Default = "webpackManifest"

- inlineManifest

Whether or not to write the manifest output into the html-webpack-plugin. Default = false

```
// index.ejs
<body>
    <!-- app -->
    <%= htmlWebpackPlugin.files.webpackManifest %>
</body>
```