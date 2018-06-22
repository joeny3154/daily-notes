

https://github.com/vuejs/babel-plugin-transform-vue-jsx#difference-from-react-jsx

vue jsx
====

# 使用jsx

`babel-plugin-transform-vue-jsx `

``` 
npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-env\
  --save-dev
```

`.babelrc`

```
{
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
}
```

# `h`的自动注入

从版本3.4.0开始，会自动在任何方法中注入`const h = this.$createElement`，并在使用JSX的ES2015语法中声明getter（不是函数或箭头函数），因此可以删除（h）参数。

``` jsx
Vue.component('jsx-example', {
  render () { // h will be injected
    return <div id="foo">bar</div>
  },
  myMethod: function () { // h will not be injected
    return <div id="foo">bar</div>
  },
  someOtherMethod: () => { // h will not be injected
    return <div id="foo">bar</div>
  }
})

@Component
class App extends Vue {
  get computed () { // h will be injected
    return <div id="foo">bar</div>
  }
}
```

# 与 React JSX 的不同

Vue JSX 中 createElement 的第二个参数 data 与 React 中的有些不同，它是个嵌套的对象并且每个顶层的属性由不同的模块处理，提供不同的功能

### jsx 完整的属性列表

``` js
render (h) {
  return h('div', {
    // Component props
    props: {
      msg: 'hi'
    },
    // normal HTML attributes
    // 普通HTML属性 
    attrs: {
      id: 'foo'
    },
    // DOM props
    domProps: {
      innerHTML: 'bar'
    },
    // Event handlers are nested under "on", though
    // modifiers such as in v-on:keyup.enter are not
    // supported. You'll have to manually check the
    // keyCode in the handler instead.
    // 事件处理程序嵌套在“on”下,例如v-on中的修饰符：keyup.enter不是支持的。 您必须手动检查改为处理程序中的keyCode。
    on: {
      click: this.clickHandler
    },
    // For components only. Allows you to listen to
    // native events, rather than events emitted from
    // the component using vm.$emit.
    // 仅限于组件。 允许您监听原生事件，而不是使用vm.$emit从组件发出的事件。
    nativeOn: {
      click: this.nativeClickHandler
    },
    // class is a special module, same API as `v-bind:class`
    class: {
      foo: true,
      bar: false
    },
    // style is also same as `v-bind:style`
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // other special top-level properties
    // 其他特殊顶级属性 
    key: 'key',
    ref: 'ref',
    // assign the `ref` is used on elements/components with v-for
    // 赋予`ref`用于元素/组件上v-for 
    refInFor: true,
    slot: 'slot'
  })
}
```

对应 jsx:

``` jsx
render (h) {
  return (
    <div
      // normal attributes or component props.
      // 普通属性或组件props
      id="foo"
      // DOM properties are prefixed with `domProps`
      // DOM属性的前缀是“domProps”
      domPropsInnerHTML="bar"
      // event listeners are prefixed with `on` or `nativeOn`
      // 事件监听器的前缀使用 on 或者 nativeOn
      onClick={this.clickHandler}
      nativeOnClick={this.nativeClickHandler}
      // other special top-level properties
      class={{ foo: true, bar: false }}
      style={{ color: 'red', fontSize: '14px' }}
      key="key"
      ref="ref"
      // assign the `ref` is used on elements/components with v-for
      // 赋值`ref`用于v-for的元素/组件
      refInFor
      slot="slot">
    </div>
  )
}
```

# 组件：

如果自定义元素以小写字母开头，则它将被视为字符串ID并用于查找已注册的组件。 

如果它以大写字母开头，它将被视为一个标识符，它可以让你做到: 无需通过组件选项注册Todo选项

``` jsx
import Todo from './Todo.js'

export default {
  render (h) {
    return <Todo/> // 无需通过组件选项注册Todo选项
  }
}
```


支持JSX扩展，并且此插件将智能地合并嵌套的数据属性。 例如：

``` jsx
const data = {
  class: ['b', 'c']
}
const vnode = <div class="a" {...data}/>
```

等效于

`{ class: ['a', 'b', 'c'] }`

# vue 指令


请注意，当使用JSX时，几乎所有内置的Vue指令都不受支持，唯一的例外是v-show，它可以与v-show={value}语法一起使用。

在大多数情况下，有明显的编程等价物，例如

`v-if`只是一个三元表达式

`v-for`只是一个`array.map()`表达式等。

对于自定义指令，您可以使用`v-name={value}`语法。但是请注意，使用此语法 **不支持指令参数和修饰符** 。
有两种解决方法：

1. 通过一个对象value，如`v-name={{ value, modifier: true }}`

2. 使用原始vnode指令数据格式：

``` js
const directives = [
  { name: 'my-dir', value: 123, modifiers: { abc: true } }
]

return <div {...{ directives }}/>
```