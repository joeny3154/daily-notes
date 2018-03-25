


### 生命周期钩子的 this 上下文指向调用它的 Vue 实例

不要在选项属性或回调上使用箭头函数，比如 

`created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`

因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例


### 生命周期

- create: beforeCreate、created

- mount: beforeMount、Mounted

- update: beforeUpdate、updated

- destroy: beforeDestroy、destroyed

### 计算属性: 模板中放入太多的逻辑会让模板过重且难以维护

### 计算属性 vs 方法

`<p>Reversed message: "{{ reversedMessage() }}"</p>`

计算属性是基于它们的依赖进行缓存的,而调用方法将总会再次执行函数

### 计算属性 vs 侦听属性

侦听属性`watch`：当需要在数据变化时执行异步或开销较大的操作时最适合使用

### key 作用

1. 用 key 管理可复用的元素：通常会复用已有元素而不是从头开始渲染，例如，切换的登录方式，复用input，将不会清除用户已经输入的内容

2. 列表渲染中用key标识，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素
`<div v-for="item in items" :key="item.id"></div>`

###  `v-if` vs `v-show`

v-if： 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；同时是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块

v-show：不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换；`v-show` 不支持 `<template>` 元素，也不支持 `v-else`

非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。


### 更新检测

- 不能检测: 1. 对象属性的添加或删除 2. 数组的长度修改， 利用索引直接设置一个项

- 数组更改检测
Vue 不能检测以下变动的数组

当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`, `vm.items[1] = 'x'`

解决：`Vue.set/vm.$set(vm.items, indexOfItem, newValue)`, eg: `Vue.set(vm.items, 1, 'x')`

当你修改数组的长度时，例如：`vm.items.length = newLength` `vm.items.length = 2`

解决： `vm.items.splice(newLength)`

- 对象更改检测: Vue 不能检测对象属性的添加或删除

``` js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```
vm.$set(vm.userProfile, 'age', 27)

需要为已有对象赋予多个新属性，比如使用 Object.assign() 

在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：

``` js
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

``` js
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

### 事件绑定

``` html
<button v-on:click="greet('msg', $event)">Submit</button>
<button v-on:click="greet">Greet</button>
```

``` js
methods: {
  greet: function (event) {
    // `this` 在方法里指向当前 Vue 实例
    alert('Hello ' + this.name + '!')
    // `event` 是原生 DOM 事件
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

### 自定义事件

使用 $on(eventName) 监听事件
使用 $emit(eventName, optionalPayload) 触发事件

.sync 修饰符

### `v-model`

<input v-model="something">

相当于

``` html
<input 
  :value="something"
  @input="something = $event.target.value"

>
```

# keep-alive

如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：

``` html
<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>
```