
Redux middleware
======

http://cn.redux.js.org/docs/api/applyMiddleware.html

它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点;

可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。

middleware 的函数签名是 `({ getState, dispatch }) => next => action`

eg:

```
const middleware = store => next => action => {
  ...
}
```

# 详解

- `store`

`const { getState, dispatch } = store`

- `next()`

`next(action): action`

`next` 方法会调用 `middleware` 链中下一个 middleware 的 `dispatch`。`next(action)`之后调用`getState()`会返回最新的状态，可查看下面的示例：

eg:

```
const thunkMiddleware = ({getState, dispatch}) => next => action => {
  // dispatch 之前状态
  console.log('prev state =>', getState())
  console.log('action =>', action)

  // 调用 middleware 链中下一个 middleware 的 dispatch。
  let returnValue = next(action)

  // dispatch 之后最新状态
  console.log('next state =>', getState())

  // 一般会是 action 本身，除非后面的 middleware 修改了它。
  return returnValue
}
```