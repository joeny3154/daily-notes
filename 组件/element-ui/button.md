# button 组件

- 禁用状态

禁用状态下不触发事件，使用原生的button，设置`disabled`即可，button可能有loading的状态，此时也需要禁用。`:disabled="disabled || loading"`

禁用状态下的样式设置通过class去实现，添加一个class类：`is-disabled`

- class 设置

vue对多个样式的绑定可以有两种方式，数组语法和对象语法，这里可以结合使用：

``` js
:class="[
  type ? 'el-button--' + type : '',
  buttonSize ? 'el-button--' + buttonSize : '',
  {
    'is-disabled': buttonDisabled,
    'is-loading': loading,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle
  }
]"
```
- button内容填充

实际使用时`<el-button type="primary" icon="el-icon-search">搜索</el-button>` `el-button`标签内的内容将填充为button的内容，这通过`slot`来实现。

`slot`有 具名插槽 和 默认插槽：

``` html
<!-- 父组件 -->
<base-layout>
  <!-- 具名插槽内容 -->
  <h1 slot="header">Here might be a page title</h1>
  <!-- 默认插槽内容 -->
  <p>A paragraph for the main content.</p>
</base-layout>

<!-- base-layout -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
</div>
```

根据`vm.$slots`对应的`name`属性可获取具名插槽的内容，比如这样：`$slots.header`。`vm.$slots.default`可默认插槽的内容。
模板中使用：`<span v-if="$slots.default"><slot></slot></span>`

`vm.$slots`通常在使用**渲染函数**书写一个组件时十分有用：

``` js
Vue.component('blog-post', {
  render: function (createElement) {
    var header = this.$slots.header
    var body   = this.$slots.default
    var footer = this.$slots.footer
    return createElement('div', [
      createElement('header', header),
      createElement('main', body),
      createElement('footer', footer)
    ])
  }
})
```

- icon位置的设置

默认icon设置到左边，如果希望在右边，使用`slot`实现：
``` html
<i :class="icon" v-if="icon && !loading"></i>
<span v-if="$slots.default"><slot></slot></span>
```

使用时：

``` html
<el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
<el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
```

- 其他

添加原生的`autofocus` attribute可实现自动获得焦点
