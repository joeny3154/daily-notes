
Bundle Renderer 所需的构建工件(build artifact)构建工件（serverBundle）生成
======

# 概要



- 服务器配置，是用于生成传递给 createBundleRenderer 的 `server bundle`
  
  使用`vue-server-renderer/server-plugin` 生成`vue-ssr-server-bundle.json`

- 生成客户端构建清单(client build manifest)

  1. 使用`vue-server-renderer/client-plugin` 生成`vue-ssr-client-manifest.json`
  2. plugins配置中添加`new webpack.optimize.CommonsChunkPlugin({name: 'manifest', minChunks: Infinity})`

- 客户端清单(client manifest)： CommonsChunkPlugin

# 服务器配置(Server Config) `webpack.server.config.js`