http://cn.redux.js.org/docs/advanced/AsyncActions.html


import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts } from './actions'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  )
)

store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
)


# 异步 action

普通action返回一个带有type属性的对象，而异步返回一个函数
