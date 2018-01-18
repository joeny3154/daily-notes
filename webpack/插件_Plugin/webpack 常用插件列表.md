
webpack 常用插件列表
=====

详解可[查看](https://doc.webpack-china.org/plugins/)

`AggressiveSplittingPlugin` 将原来的 chunk 分成更小的 chunk

`BabelMinifyWebpackPlugin` 使用 babel-minify进行压缩

`BannerPlugin` 在每个生成的 chunk 顶部添加 banner

`CommonsChunkPlugin` 提取 chunks 之间共享的通用模块

`ComponentWebpackPlugin` 通过 webpack 使用组件

`CompressionWebpackPlugin` 预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务

`ContextReplacementPlugin` 重写 require 表达式的推断上下文

`DefinePlugin` 允许在编译时(compile time)配置的全局常量

`DllPlugin` 为了极大减少构建时间，进行分离打包

`EnvironmentPlugin` DefinePlugin中 process.env 键的简写方式。

`ExtractTextWebpackPlugin` 从 bundle 中提取文本（CSS）到单独的文件

`HotModuleReplacementPlugin` 启用模块热替换(Enable Hot Module Replacement - HMR)

`HtmlWebpackPlugin` 简单创建 HTML 文件，用于服务器访问

`I18nWebpackPlugin` 为 bundle 增加国际化支持

`IgnorePlugin` 从 bundle 中排除某些模块

`LimitChunkCountPlugin` 设置 chunk 的最小/最大限制，以微调和控制 chunk

`LoaderOptionsPlugin` 用于从 webpack 1 迁移到 webpack 2

`MinChunkSizePlugin` 确保 chunk 大小超过指定限制

`NoEmitOnErrorsPlugin` 在输出阶段时，遇到编译错误跳过

`NormalModuleReplacementPlugin` 替换与正则表达式匹配的资源

`NpmInstallWebpackPlugin` 在开发时自动安装缺少的依赖

`ProvidePlugin` 不必通过 import/require 使用模块

`SourceMapDevToolPlugin` 对 source map 进行更细粒度的控制

`UglifyjsWebpackPlugin` 可以控制项目中 UglifyJS 的版本

`ZopfliWebpackPlugin` 通过 node-zopfli 将资源预先压缩的版本

`NamedModulesPlugin` 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。

代码热替换, HotModuleReplacementPlugin
生成html文件，HtmlWebpackPlugin
将css成生文件，而非内联，ExtractTextPlugin
报错但不退出webpack进程，NoErrorsPlugin
代码丑化，UglifyJsPlugin，开发过程中不建议打开
多个 html共用一个js文件(chunk)，可用CommonsChunkPlugin
清理文件夹，Clean
调用模块的别名ProvidePlugin，例如想在js中用$，如果通过webpack加载，需要将$与jQuery对应起来