
thunkMiddleware
======

http://ohyayanotherblog.ghost.io/redux-thunk-middleware-and-async-await/


# 定义中间件

eg:

```
<!-- 未完成 -->

import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'

const thunk = ({dispatch, getState}) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    console.log(action)
    return next(action)
  }
}

const store = createStore(reducers, applyMiddleware(thunk))
```

# 使用

const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'

const asyncThunkTest = (params) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_POSTS_REQUEST })

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const json = await response.json()

      dispatch({ type: FETCH_POSTS_SUCCESS, payload: json })
    } catch (err) {
      dispatch({ type: FETCH_POSTS_FAILURE, error: err })
    }
  }
}
