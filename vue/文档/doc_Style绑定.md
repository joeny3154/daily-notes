绑定内联样式
====

# 对象语法

<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

eg: 样式对象

<div v-bind:style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

# 数组语法

v-bind:style 的数组语法可以将多个**样式对象**应用到同一个元素上：

<div v-bind:style="[baseStyles, overridingStyles]"></div>

# 自动添加前缀

当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

# 多重值

<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex