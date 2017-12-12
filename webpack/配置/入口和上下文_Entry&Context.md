

入口和上下文(Entry and Context)
==========

entry 对象是用于 webpack 查找启动并构建 bundle。

其**上下文**是入口文件所处的目录的绝对路径的字符串。

# context

`string`

基础目录，绝对路径，用于从配置中解析入口起点(entry point)和加载器(loader)

context: path.resolve(__dirname, "app")

默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory)。


# entry

`string | [string] | object { <key>: string | [string] }`

起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。

**动态加载的模块不是入口起点**。

简单规则：每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。


entry: {
  home: "./home.js",
  about: "./about.js",
  contact: "./contact.js"
}

当结合 [output.library](http://www.css88.com/doc/webpack2/configuration/output#output-library) 选项时：如果传入数组，则只导出最后一项。