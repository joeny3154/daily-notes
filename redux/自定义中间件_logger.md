
自定义 Logger Middleware
======

eg: 

```
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const logger = ({dispatch, getState}) => (next) => (action) => {
  console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
}


let store = createStore(reducers, [ 'Use Redux' ], applyMiddleware(logger))
```