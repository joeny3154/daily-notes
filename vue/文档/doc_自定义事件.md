

使用 $on(eventName) 监听一个事件
使用 $emit(eventName) 触发一个事件

注意，Vue 事件系统，不同于浏览器的 EventTarget API。虽然它们之间具有类似的事件机制，但是 $on 和 $emit 并非 addEventListener 和 dispatchEvent 的别名


# 为组件绑定原生事件(Binding Native Events to Components)

希望某个组件的根元素能够监听到原生事件。在这种场景中，你可以在 v-on 后面添加 .native 修饰符。例如：
<my-component v-on:click.native="doTheThing"></my-component>


# .sync 修饰符(双向props)

<comp :foo.sync="bar"></comp>

为 props 重新引入了 .sync 修饰符，但是这次只是原有语法的语法糖(syntax sugar)包装而成，其背后实现原理是，在组件上自动扩充一个额外的 v-on 监听器：

<comp :foo="bar" @update:foo="val => bar = val"></comp>

对于子组件，如果想要更新 foo 的值，则需要显式地触发一个事件，而不是直接修改 prop：

this.$emit('update:foo', newValue)
