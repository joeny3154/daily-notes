

`const renderer = require('vue-server-renderer').createRenderer()`


# createRenderer({template}): renderer

使用网页模板

const renderer = createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

# renderer.renderToString

``` js
renderer.renderToString(app, context, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})
```

`context`: 渲染上下文对象, 可以模板插值

``` js
const context = {
  title: 'hello',
  meta: `
    <meta ...>
    <meta ...>
  `
}
```

``` html
<html>
  <head>
    <!-- 使用双花括号(double-mustache)进行 HTML 转义插值(HTML-escaped interpolation) -->
    <title>{{ title }}</title>
    <!-- 使用三花括号(triple-mustache)进行 HTML 不转义插值(non-HTML-escaped interpolation) -->
    {{{ meta }}}
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```


此外，模板支持一些高级特性，例如：

在使用 *.vue 组件时，自动注入「关键的 CSS(critical CSS)」；
在使用 clientManifest 时，自动注入「资源链接(asset links)和资源预加载提示(resource hints)」；
在嵌入 Vuex 状态进行客户端融合(client-side hydration)时，自动注入以及 XSS 防御。