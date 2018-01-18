开发工具(Devtool)
======

http://www.css88.com/doc/webpack2/configuration/devtool/

此选项控制是否生成，以及如何生成 Source Map。

`devtool` string false

可选项：

`eval`、`cheap-eval-source-map`、`cheap-source-map`、`cheap-module-eval-source-map`、`cheap-module-source-map`、`eval-source-map`、`source-map`、`nosources-source-map`

其中一些值适用于开发环境，一些适用于生产环境。
对于开发环境，通常希望更快速的 Source Map，需要添加到 bundle 中以增加体积为代价，
但是对于生产环境，则希望更精准的 Source Map，需要从 bundle 中分离并独立存在。

# 对于开发环境

1. eval

每个模块都使用 eval() 执行，并且都有 //@ sourceURL。此选项会相当快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码，所以不能正确的显示显示行数。

2. inline-source-map

SourceMap 转换为 DataUrl 后添加到 bundle 中。

3. `eval-source-map`（vue-cli dev配置使用此项选）

每个模块使用 eval() 执行，并且 SourceMap 转换为 DataUrl 后添加到 eval() 中。初始化 SourceMap 时比较慢，但是会在重构建时提供很快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。

4. cheap-module-eval-source-map

就像 eval-source-map，每个模块使用 eval() 执行，并且 SourceMap 转换为 DataUrl 后添加到 eval() 中。"低开销"是因为它没有生成列映射(column map)，只是映射行数。



# 对于生产环境


1. `source-map` （vue-cli 生产配置使用`#source-map`）

生成完整的 SourceMap，输出为独立文件。由于在 bundle 中添加了引用注释，所以开发工具知道在哪里去找到 SourceMap。

2. hidden-source-map

和 source-map 相同，但是没有在 bundle 中添加引用注释。如果你只想要 SourceMap 映射错误报告中的错误堆栈跟踪信息，但不希望将 SourceMap 暴露给浏览器开发工具。

3. cheap-source-map

不带列映射(column-map)的 SourceMap，忽略加载的 Source Map。

4. cheap-module-source-map

不带列映射(column-map)的 SourceMap，将加载的 Source Map 简化为每行单独映射。

5. nosources-source-map

创建一个没有 sourcesContent 的 SourceMap。它可以用来映射客户端（译者注：指浏览器）上的堆栈跟踪，而不会暴露所有的源码。