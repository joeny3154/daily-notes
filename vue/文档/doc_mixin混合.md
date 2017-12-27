
混合
====

- 基础：混合对象可以包含任意组件选项，混合对象的选项将被混入该组件本身的选项

- 选项合并：有恰当的合并策略。如钩子函数混合为数组并先于组件自身钩子调用, 值为对象的选项混合为对象，键名冲突时取组件对象的键值对

- 全局混合：只应当应用于自定义选项

- 自定义选项的合并策略: 自定义逻辑合并，可以向 `Vue.config.optionMergeStrategies` 添加一个函数


# 基础

混合对象可以包含任意组件选项。当组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。

```
var myMixin = {

}

var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

# 选项合并

当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。

比如:

1. 同名钩子函数将混合为一个数组，因此都将被调用。混合对象的 钩子将在组件自身钩子之前调用

2. 值为对象的选项, 将被混合为同一个对象; 两个对象键名冲突时，取组件对象的键值对

3. Vue.extend() 也使用同样的策略进行合并。

# 全局混合

也可以全局注册混合对象。注意使用！ 一旦使用全局混合对象，将会影响到 所有 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。

**大多数情况下，只应当应用于自定义选项**，就像上面示例一样

```js
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption()
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

# 自定义选项合并策略

自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 `Vue.config.optionMergeStrategies` 添加一个函数：

```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return mergedVal
}
```
对于大多数对象选项，可以使用 methods 的合并策略：

```js
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```

更多高级的例子:

```js
const merge = Vue.config.optionMergeStrategies.computed
Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
  if (!toVal) return fromVal
  if (!fromVal) return toVal
  return {
    getters: merge(toVal.getters, fromVal.getters),
    state: merge(toVal.state, fromVal.state),
    actions: merge(toVal.actions, fromVal.actions)
  }
}
```