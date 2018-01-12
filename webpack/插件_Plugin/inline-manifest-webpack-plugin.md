inline-manifest-webpack-plugin
====

它可以将 manifest 转为内联在 html 内的 inline script，因为 manifest 经常随着构建而变化，写入到 html 中便不需要每次构建再下载新的 manifest 了，从而减少了一个小文件请求。此插件依赖 html-webpack-plugin 和 manifest 公共块，因此我们要配置 HtmlWebpackPlugin 且保持 manifest 的命名：


``` js
{
  module: {
    rules: [{
      test: /\.ejs$/,
      loader: 'ejs-loader'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest', 'libs', 'vendor'].reverse()
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/page1/index.ejs',
      chunks: ['manifest', 'libs', 'vendor', 'page1']
    }),
    new InlineManifestWebpackPlugin()
  ]
}

```