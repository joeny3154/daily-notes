DllReferencePlugin
===========

这个插件是在 webpack 主配置文件中设置的， 这个插件把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。


context: (绝对路径) manifest (或者是内容属性)中请求的上下文
manifest: 包含 content 和 name 的对象，或者在编译时(compilation)的一个用于加载的 JSON manifest 绝对路径
content (optional): 请求到模块 id 的映射 (默认值为 manifest.content)
name (optional): dll 暴露的地方的名称 (默认值为 manifest.name) (可参考 externals)
scope (optional): dll 中内容的前缀
sourceType (optional): dll 是如何暴露的 (libraryTarget)
new webpack.DllReferencePlugin(options)
通过引用 dll 的 manifest 文件来把依赖的名称映射到模块的 id 上，之后再在需要的时候通过内置的 __webpack_require__ 函数来 require 他们

