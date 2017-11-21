DllPlugin
======

这个插件是在一个额外的独立的 webpack 设置中创建一个只有 dll 的 bundle(dll-only-bundle)。 这个插件会生成一个名为 manifest.json 的文件，这个文件是用来让 DLLReferencePlugin 映射到相关的依赖上去的。

context (optional): manifest 文件中请求的上下文(context)(默认值为 webpack 的上下文(context))
name: 暴露出的 DLL 的函数名 (TemplatePaths: [hash] & [name] )
path: manifest json 文件的绝对路径 (输出文件)