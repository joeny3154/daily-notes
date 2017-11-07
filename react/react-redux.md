### `react-redux`

建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染;
这样你就不必为了性能而手动实现 React 性能优化建议 中的 shouldComponentUpdate 方法。

- `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

```
import {connect} from 'react-redux'

const ContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DumbComponent)

export default VisibleTodoList
```

- `mapStateToProps(state, [ownProps])`
用来把当前Redux store state 映射到展示组件的props中；

```
const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}
```

- `mapDispatchToProps(dispatch, [ownProps])`
接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法

```
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}
```
- `mergeProps`
```
function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
  })
}

export default connect(mapStateToProps, actionCreators, mergeProps)(TodoApp)
```
- `Provider`
