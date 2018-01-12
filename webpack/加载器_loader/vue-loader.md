
vue-loader 
====

详细文章移步[这里](https://vue-loader.vuejs.org/zh-cn/)

# 概要

- 作用

  `.vue`文件 -> JavaScript模块

- 组件细则-语言块

  - `<template>`: 内容将被提取为字符串，将编译并用作 Vue 组件的 template 选项
  - `<script>`: js (在检测到 babel-loader 或 buble-loader 配置时自动支持ES2015)
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

- template

- style


# Src 导入

用于分隔你的 .vue 文件到多个文件中，你可以通过 src 属性导入外部文件

<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>

src 导入遵循和 require() 一样的规则，这意味着你相对路径需要以 ./ 开始，你还可以从 NPM 包中直接导入资源，例如：

<!-- import a file from the installed "todomvc-app-css" npm package -->
<style src="todomvc-app-css/index.css">

