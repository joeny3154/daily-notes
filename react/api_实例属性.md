

- `props`

`this.props` 包含此组件的调用者定义的 props

特别要说明的是，`this.props.children` 是一个特殊的 props ，通常由JSX表达式中的子标签定义，而不是标签本身。

- state

state(状态) 包含该组件的的特定数据，该数据可能随时间而变化。 状态是用户定义的，它应该是一个纯粹的 JavaScript 对象。

如果你不在 render() 中使用它，它就不应该是 state 。 例如，您可以直接在实例上放置定时器ID。

有关 state(状态) 的详细信息，请参阅 [状态(State) 和生命周期](http://www.css88.com/react/docs/state-and-lifecycle.html) 。

***注意：***永远不要直接改变 `this.state` ，因为调用 setState() 之后可能会覆盖你所做的这个改变。 把 `this.state` 看作是不可变的。
