
# 简单实现一个 `thunk` 中间件

eg: 

```
import { applyMiddleware, createStore } from 'redux'

const thunkMiddleware = store => {
  const dispatch = store.dispatch
  const getState = store.getState

  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    console.log(action)
    return next(action)
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
```


# 定义 异步 actions 

- 方式1：使用 `promise`


```
export default createPromisePost = (params) => {
  const request = () => {
    dispatch({
      type: CREATE_POST_REQUEST
    })
  }

  const success = (result) => {
    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: result
    })
  }

  const fail = (err) => {
    dispatch({
      type: CREATE_POST_FAIL,
      err
    })
  }

  dispatch(request())
  return axios.post('http://xxxxx', params)
    .then(result => dispatch(success(result)))
    .catch(err => dispatch(fail(err)))
}
```

- 方式2：使用 `async await`

```
export default createAsyncPost = (params) => {
  const request = () => {
    dispatch({
      type: CREATE_POST_REQUEST
    })
  }

  const success = (result) => {
    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: result
    })
  }

  const fail = (err) => {
    dispatch({
      type: CREATE_POST_FAIL,
      err
    })
  }

  dispatch(request())
  try {
    const result = await axios.post('http://xxxxx', params)
    dispatch(success(result))
  } catch(err) {
    dispatch(fail(result))
  }
}
```





