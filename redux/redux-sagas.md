

### Effects

- `Fork` 执行一个非阻塞操作。
- `Take` 暂停并等待action到达。
- `Race` 同步执行多个 effect，然后一旦有一个完成，取消其他 effect。
- `Call` 调用一个函数，如果这个函数返回一个 promise ，那么它会阻塞 saga，直到promise成功被处理。
- `Put` 触发一个Action。
- `Select` 启动一个选择函数，从 state 中获取数据。

- `takeEvery(pattern, saga, ...args)` 会返回所有已出发的调用的结果。
  在发起的 action 与 pattern 匹配时派生指定的 saga
  takeEvery 允许处理并发的 action（译注：即同时触发相同的 action）, 尽管之前还有一个或多个 fetchData任务 尚未结束
  takeEvery 不会对多个任务的响应返回进行排序，并且也无法保证任务将会按照启动的顺序结束。

  如果我们只想得到最新那个请求的响应（例如，始终显示最新版本的数据）。我们可以使用 takeLatest 辅助函数

  takeEvery('*') * 代表通配符模式），我们就能捕获发起的所有类型的 action

- `takeLatest(pattern, saga, ...args)` 意味着我们将执行所有操作，然后返回最后一个(the latest one)调用的结果。如果我们触发了多个时间，它只关注最后一个(the latest one)返回的结果。



### Effect 

是一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息。
你可以把 Effect 看作是发送给 middleware 的指令，以执行某些操作（比如调用某些异步函数，发起一个 action 到 store

- Effect => Actions

put 和 call 返回文本对象

`put({type: 'INCREMENT'})`  => `{ PUT: {type: 'INCREMENT'} }`
`call(delay, 1000)`       => `{ CALL: {fn: delay, args: [1000]}}`


- call

call 和 apply 非常适合返回 Promise 结果的函数
yield call([obj, obj.method], arg1, arg2, ...) // 如同 obj.method(arg1, arg2 ...)
yield apply(obj, obj.method, [arg1, arg2, ...])
cps 可以用来处理 Node 风格的函数 例如，fn(...args, callback) 中的 callback 是 (error, result) => () 这样的形式

const content = yield cps(readFile, '/path/to/file')

- put 

function* fetchProducts(dispatch)
  const products = yield call(Api.fetch, '/products')
  yield put({ type: 'PRODUCTS_RECEIVED', products })
  // => dispatch({ type: 'PRODUCTS_RECEIVED', products })
}

- 错误处理

两种方式：

1. 在 try/catch 区块中处理错误

2. 让API服务返回一个正常的含有错误标识的值。例如， 你可以捕捉 Promise 的拒绝操作，并将它们映射到一个错误字段对象。

```
import Api from './path/to/api'
import { take, put } from 'redux-saga/effects'

function fetchProductsApi(url) {
  return Api.fetch(url)
    .then(res => {response: res})
    .catch(err => {error: err})
}

function* fetchProducts() {
  const result = yield call (fetchProductsApi, './products')
  const {response, error} = result
  if (response) {
    // 成功
    yield put({ type: 'PRODUCTS_RECEIVED', products: response })
  } else {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}
```