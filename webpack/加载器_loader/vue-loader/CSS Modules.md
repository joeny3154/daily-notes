CSS Modules
=====

# 概要

- 基础方式

  1. 在 `<style>` 上添加 `module` 属性,css-loader 打开 CSS Modules 模式，生成的 CSS 对象, 并为组件注入一个名叫 $style 的**计算属性**

  2. `<template>`可以与其他计算属性一样使用 `$style`

  3. 组件内通过`this.$style`引用此计算属性，例如 `created () { console.log(this.$style.red) } // _1VyoJ-uZOjlOxP7jWUy19_0`

- 自定义注入名称

  通过设置 `module` 属性来为它们定义注入后计算属性的名称。
  
  例如`<style module="a">`, 使用: `<p :class="a.red">Home</p>`

- 配置 css-loader Query

  CSS Modules 处理是通过 `css-loader`, 可以使用 `vue-loader` 的 cssModules 选项去为 `css-loader` 添加 `query` 配置

# 详解


### 基础使用

``` html
<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
```

`css-loader` 将打开 CSS Modules 模式，生成的 CSS 对象将为组件注入一个名叫 `$style` 的计算属性

``` html
<template>
  <p :class="[$style.red, $style.bold]">
    This should be red
  </p>
</template>
```
浏览器控制台可以看到

``` css
._1KAwz2HZeWRpSco_pRPmk2_1 {
    font-weight: bold;
}
._2M_MLUKCwUicHsfKq_szed_0 {
    color: red;
}
```

### 自定义注入名称

``` html
<style module="a">
  /* identifiers injected as a */
</style>

<style module="b">
  /* identifiers injected as b */
</style>
```

上面写法将添加计算属性 `a`、`b` 于组件中

### 配置 css-loader Query

CSS Modules 处理是通过 css-loader实现，可以使用 vue-loader 的 cssModules 选项去为 css-loader 添加 query 配置

`css-loader` 默认 `query` 配置如下：
``` js
{
  modules: true,
  importLoaders: true,
  localIdentName: '[hash:base64]'
}
```

**使用 `vue-loader` 的 cssModules 选项去为 `css-loader` 添加 `query` 配置:**

``` js
// webpack 2
module: {
  rules: [
    {
      test: '\.vue$',
      loader: 'vue-loader',
      options: {
        cssModules: {
          localIdentName: '[path][name]---[local]---[hash:base64:5]',
          camelCase: true
        }
      }
    }
  ]
}
```
