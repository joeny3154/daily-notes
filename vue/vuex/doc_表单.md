表单处理
====

当在严格模式中使用 Vuex 时，在属于 Vuex 的 `state` 上使用 `v-model` 会比较棘手

两种解决方式：

1. 不使用 `v-model` 语法糖

假设这里的 obj 是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，v-model 会试图直接修改 obj.message。在严格模式中，由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误:

`<input v-model="obj.message">`

**替换成：**

`<input :value="message" @input="updateMessage">`

给 `<input>` 中绑定 `value`，然后侦听 `input` 或者 `change` 事件，在事件回调中调用 `action`

**组件：**

```
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage(e) => {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```

**Vuex**

```
// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```


2. 使用带有 `setter` 的双向绑定计算属性

<input v-model="message">

```
computed: {
  message: {
    get() {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```