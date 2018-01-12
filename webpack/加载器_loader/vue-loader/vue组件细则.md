
vue-loader-组件细则 
====

详细文章移步[这里](https://vue-loader.vuejs.org/zh-cn/)

# 概要

- 作用

  `.vue`文件 -> JavaScript模块

- 语言块

  - `<template>`: 内容将被提取为字符串，将编译并用作 Vue 组件的 template 选项
  - `<script>`: 默认语言：js (在检测到 babel-loader 或 buble-loader 配置时自动支持ES2015)
  - `<style>`: 标签可以有 scoped 或者 module 属性

- Src 导入

  - 用于分割 `<template>`、`<script>` 和 `<style>`、自定义块到 多个外部文件
  - 导入遵循和 require() 一样的规则


# 作用

可以将用.vue格式(包含三种类型的顶级语言块`<template>`、`<script>` 和 `<style>`)编写的 Vue 组件转换为 JavaScript 模块

# Vue组件细则

- 提取语言块

解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 CommonJS 模块，module.exports 出一个 Vue.js 组件对象

- CSS 预处理器 

设置语言块的 lang 属性 `<style lang="sass">`

# 语言块

1. `<template>`

  - 默认语言：html。

  - 每个 .vue 文件最多包含一个 <template> 块。

  - 内容将被提取为字符串，将编译并用作 Vue 组件的 template 选项

2. `<script>`

  - 默认语言：js (在检测到 babel-loader 或 buble-loader 配置时自动支持ES2015)。

  - 每个 .vue 文件最多包含一个 `<script>` 块。

  - 该脚本在类 CommonJS 环境中执行 (就像通过 webpack 打包的正常 js 模块)，这意味这你可以 require() 其它依赖。在 ES2015 支持下，你也可以使用 import 和 export 语法。

  - 脚本必须导出 Vue.js 组件对象。也可以导出由 Vue.extend() 创建的扩展对象，但是普通对象是更好的选择。

3. `<style>`

  - 默认语言：css。

  - 一个 .vue 文件可以包含多个 `<style>` 标签。

  - `<style>` 标签可以有 scoped 或者 module 属性 (查看 CSS 作用域和 CSS Modules) 以帮助你将样式封装到当前组件。具有不同封装模式的多个`<style>`标签可以在同一个组件中混合使用。

  - 默认情况下，将会使用 style-loader 提取内容，并通过`<style>`标签动态加入文档的 `<head>` 中，也可以配置 webpack 将所有 styles 提取到单个 CSS 文件中。

# Src 导入

用于分隔你的 .vue 文件到多个文件中，你可以通过 src 属性导入外部文件

``` html
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

src 导入遵循和 require() 一样的规则，这意味着你相对路径需要以 ./ 开始，你还可以从 NPM 包中直接导入资源，例如：

<!-- import a file from the installed "todomvc-app-css" npm package -->
`<style src="todomvc-app-css/index.css">`

