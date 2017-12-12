
v-model
======

<input v-model="something">

其实是下面的语法糖包装而成：

<input v-bind:value="something" v-on:input="something = $event.target.value">

# 组件上使用 v-model

eg:
<custom-input v-model="something"></custom-input>

相当于：

<custom-input
  :value="something"
  @input="value => { something = value }">
</custom-input>


一个带有 `v-model` 的组件，它应该如下（在 2.2.0+ 这是可配置的）：

1. 接收一个 value prop
2. 触发 input 事件，并传入新值

```
export default {
  template: `
    <span>
      <input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)">
    </span>
  `,
  props: ['value'],
  methods: {
    updateValue () {
      var formattedValue = value
        // 移除两侧的空白符
        .trim()
        // 保留 2 位小数
        .slice(
          0,
          value.indexOf('.') === -1
            ? value.length
            : value.indexOf('.') + 3
        )
      // 如果 value 还不是标准格式，
      // 手动将其覆盖以符合规范
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 向上触发 input 事件，并传递数字值
      this.$emit('input', Number(formattedValue))
    }
  }
}
```

# 自定义 `v-modal`

一个组件中，v-model 默认使用 value 作为 prop，以及默认使用 input 作为监听事件，
但是一些输入框类型，例如 checkbox 和 radio，可能会用到 value。在这种情况下，为了**避免冲突**，就会需要使用组件的 model 选项：

父组件：

<my-checkbox v-model="checked" value="some value"/>

子组价：

<template>
  <input type="checkbox" @change="updateValue($event.target.checked)">
</template>

<script>
  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean,
      value: String
    },
    methods: {
      updateValue (value) {
        console.log('value==>', value)
        this.$emit('change', value)
      }
    }
  }
</script>