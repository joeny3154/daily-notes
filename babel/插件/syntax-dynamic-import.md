https://babeljs.io/docs/plugins/syntax-dynamic-import/

# 作用
允许解析 `import()`

在 Webpack 2 中，我们可以使用动态 import语法来定义代码分块点 (split point)：
`import('./Foo.vue') // 返回 Promise`
如果您使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。


# 安装

npm install --save-dev babel-plugin-syntax-dynamic-import

# 使用

.babelrc

```
{
  "plugins": ["syntax-dynamic-import"]
}
```