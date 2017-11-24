
output.publicPath
=======

http://www.css88.com/doc/webpack2/configuration/output/

对于***按需加载(on-demand-load)***或***加载外部资源(external resources)（如图片、文件等）***来说，`output.publicPath` 是很重要的选项。
如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。

***作用：*** 此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」

相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析。
相对于服务的 URL(Server-relative URL)，
相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。

该选项的值是以 runtime(运行时) 或 loader(加载器载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，此选项的值都会以/结束。

默认值是一个空字符串 ""。

简单规则如下：

`output.path` 中的 URL 以 HTML 页面为基准。

```
path: path.resolve(__dirname, "public/assets"),
publicPath: "https://cdn.example.com/assets/"
```

对于以下配置：

```
publicPath: "/assets/",
chunkFilename: "[id].chunk.js"
```

对于一个 chunk 请求，看起来像这样 /assets/4.chunk.js。

对于一个输出 HTML 的 loader 可能会像这样输出：`<link href="/assets/spinner.gif" />`

或者在加载 CSS 的一个图片时：`background-image: url(/assets/spinner.gif);`

对于一个 chunk 请求，看起来像这样 `/assets/4.chunk.js`。

`webpack-dev-server` 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。
注意，参数中的 [hash] 将会被替换为编译过程(compilation) 的 hash。详细信息请查看[指南 - 缓存](http://www.css88.com/doc/webpack2/guides/caching)

> `publicPath: "https://cdn.example.com/assets/"`, // CDN（总是 HTTPS 协议）
>
> `publicPath: "//cdn.example.com/assets/"`, // CDN (协议相同)
>
> `publicPath: "/assets/"`, // 相对于服务(server-relative)
>
> `publicPath: "assets/"`, // 相对于 HTML 页面
>
> `publicPath: "../assets/"`, // 相对于 HTML 页面
>
> `publicPath: ""`, // 相对于 HTML 页面（目录相同）
