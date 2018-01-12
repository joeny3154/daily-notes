# 有作用域的 CSS

# 概要

- `scoped`属性

  通过使用 PostCSS 来实现转换（元素上添加自定义属性，例如`data-v-f3f3eg9`，css中选择器与**特性选择器**组合使用，例如`.example[data-v-f3f3eg9]`）

- 混用本地和全局样式

- 子组件的根元素

  子组件的根节点会同时受其父组件有作用域的 CSS 和子组件有作用域的 CSS 的影响

- 深度作用选择器

  使用 >>> 操作符; 像 SASS 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 操作符取而代之

- 动态生成的内容

  通过 v-html 创建的 DOM 内容不受作用域内的样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式

# 详解

### `scoped`

当 `<style>` 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素, **通过使用 PostCSS 来实现以下转换**

``` html
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

转换结果：

``` html
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### 混用本地和全局样式

在一个组件中同时使用有作用域和无作用域的样式

``` html
<style>
/* 全局样式 */
</style>

<style scoped>
/* 本地样式 */
</style>
```

### 子组件的根元素

  使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件有作用域的 CSS 和子组件有作用域的 CSS 的影响。

### 深度作用选择器

  使用 >>> 操作符，scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件