React 实例方法
=====

- `setState(updater, [callback: function])`

setState() ***排队更改***组件的 state ，并通过更新 state 来告诉 React ，该组件及其子组件需要重新渲染。这是用于 响应事件处理程序 和 服务器响应 更新用户界面的主要方法。

记住 setState() 作为一个请求，而不是立即命令来更新组件。为了更好的感知性能，React 可能会延迟它，然后合并多个setState()更新多个组件。 React不保证 state 更新就立即应用(重新渲染)。


setState() 并不总是立即更新组件。它可能会 批量 或 延迟到后面更新。这使得在调用 setState() 之后立即读取 this.state 存在一个潜在的陷阱。 而使用 componentDidUpdate 或 setState 回调（setState(updater, callback)），在应用更新后，都将被保证触发。如果你需要根据先前的 state 设置 state，阅读下面的 updater 参数。

setState() 总是会导致重新渲染，除非 shouldComponentUpdate() 返回 false 。如果可变对象被使用，并且条件渲染逻辑不能在 shouldComponentUpdate() 中实现，只有当新 state 与先前 state 不同时调用 setState() 才能避免不必要的重新渲染。


在这个签名中，第一个参数是的一个 updater 函数：`(prevState, props) => stateChange`

prevState 是对先前 state 的引用。 它不会直接突变。 相反，应该根据输入的 prevState 和 props 构建一个新的对象来表示更改。 例如，假设我们想通过 props.step 在 state 中增加一个值：

```
this.setState((prevState, props) => {
  return {counter: prevState.counter + props.step};
});
```

updater 函数接收到的 prevState 和 props 保证都是最新的。updater 输出的与 prevState 的浅层合并。

传递给 setState() 的第二个参数是一个可选的回调函数，这个回调函数将在 setState 完成后执行，并且重新渲染组件。通常，这样的逻辑我们建议使用 `componentDidUpdate()` 。

您可以随意的传递 一个对象 作为 setState() 的第一个参数，而不是一个函数：`setState(stateChange, [callback])`

这将执行 stateChange 的浅合并到新的 state ，例如，调整购物车物品数量：`this.setState({quantity: 2})`

这种形式的 ***setState() 也是异步的，并且在同一周期内的多个调用可以被合并在一起执行批处理。***例如，如果您尝试在同一周期内多次增加项目数量，这将导致的结果相当于：

```
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

同一周期中，后续调用将覆盖先前调用的值，所以数量只会增加一次。如果下一个 state 取决于以前的 state ，我们推荐使用 updater 函数形式：

```
this.setState((prevState) => {
  return {counter: prevState.quantity + 1};
});
```

- `forceUpdate(callback: function)`

默认情况下，当组件的 state 或 props 改变时，组件将重新渲染。 如果你的 render() 方法依赖于一些其他数据，你可以告诉 React 组件需要通过调用 forceUpdate() 重新渲染。

***调用 forceUpdate() 会导致组件跳过 shouldComponentUpdate() ，直接调用 render()。*** 
这将触发子组件的正常生命周期方法，包括每个子组件的 shouldComponentUpdate() 方法。 如果标记（markup）更改，React 仍将更新 DOM 。

通常你应该尽量避免使用 forceUpdate() ，并且 render() 中的 this.props 和 this.state 应该是只读的。