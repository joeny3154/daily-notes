### Promise 状态

- Promise有 3 个状态：`pending`, `fulfilled` 或 `rejected`；且必须处在其中之一。

- `fulfilled` 或 `rejected` 为终态，终态不可以改变，值也不能被改变。

### Promise 私有属性

- `_state`

`_state` 标识来保存promise的状态，`pending` 、`fulfilled` 、`rejected` 分别用 0、1、2表示；

- `_value`

`_value` 保存 promise 的值。

*如果是`rejected`状态，这个值理解为一个原因（reason），表示promise被拒绝解析的原因。*


`_deferreds`

``` js
function onFulfilled (value) { /* ... */ }
function onRejected (reason) { /* ... */ }
promise.then(onFulfilled, onRejected)
```
promise通过 `then` 方法来获取到值，并注册`onFulfilled`和`onRejected`，对应为promise 为 `fulfilled` 和 `rejected` 状态的回调函数。

当promise为 `pending` 状态时，因为不确定终态到底是 `fulfilled` 还是 `rejected` ，所以`onFulfilled`和`onRejected`都需要做暂存。

**使用`_deferreds`来保存`onFulfilled`、`onRejected`**

构造一个`deferred`对象来保存`onFulfilled`、`onRejected`和其他需要的信息, `then`一次就生成一个`deferred`添加到`_deferreds`属性上。

``` js
function Handler (onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.promise = promise
}
// 生成 deferred 对象
var deferred = new Handler(onFulfilled, onRejected, promise)
```

- `_deferredState`

同一`then`方法可被同一个 promise 调用多次，比如这样：

``` js
var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1)
  }, 1000)
})

function onFulfilled_1 (value) {}
function onRejected_1 (reason) {}

function onFulfilled_2 (value) {}
function onRejected_2 (reason) {}

promise.then(onFulfilled_1, onRejected_1)
promise.then(onFulfilled_2, onRejected_2)
```

如此就会产生多个`deferred`对象，这时`_deferreds`就为一个数组.

*当promise为终态的时候还需要遍历`_deferreds`，按照`then`注册的顺序处理
`deferred`对象。*

所以`_deferreds`可能为不同类型的值，定义一个`_deferredState`来标识`_deferreds`的状态，`_deferredState`可能有以下的值：

- `_deferredState = 0` 时：表示 `_deferreds` 初始为 `null`

- `_deferredState = 1` 时: 表示 `_deferreds` 保存了一个`deferred`对象，`_deferreds === deferred`

- `_deferredState = 2` 时：表示 `_deferreds` 保存了多个`deferred`对象，`[deferred1, deferred2, ... ]`

*也有些实现是初始`_deferreds`为一个`[]`, 这样也就不需要`_deferredState`*

### Promise 构造函数主体

``` js
'use strict';

function Promise (fn) {
  this._state = 1
  this._value = null
  this._deferreds = null
  this._deferredState = 1
  // 用于执行fn
  doResolve(fn, this)
}
```

补充上必要的验证

``` js
'use strict';

function Promise (fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new')
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function')
  }
  this._state = 1
  this._value = null
  this._deferreds = null
  this._deferredState = 1
  // 执行fn
  doResolve(fn, this)
}
```

以上代码基本实现了 Promise 构造函数的主体，但还需要实现`doResolve`。


### doResolve

`doResolve`中需要解决 3 个问题：

1. 定义`resolve` 和 `reject`函数供`fn`函数使用；

`resolve` 和 `reject`使用时只需要传递一个参数`value`，即`resolve(value)/reject(reason)`。
但实际`resolve` 和 `reject`想要实现对 promise 实例状态的改变，需要把当前 promise 实例也传递进去, 即`resolve(promise, value)`。

2. 需要保证`resolve`、`reject`两个函数中只有其中之一执行且仅执行一次。

声明一个`done`变量，当`done`的值为`true`时，就不允许再执行`resolve`和`reject`

3. `fn` 执行有可能出现错误，类似下面这样，而如果 `fn` 执行出错，应`throw`出`error`作为`reason`传递给 `reject`。

``` js
new Promise(function(resolve, reject) {
  throw new Error('...')
})
```

主要代码：

``` js
function resolve (promise, value) {
  // ...
}

function reject (promise, reason) {
  // ...
}

function doResolve (fn, promise) {
  var done = false
  // 1. fn(resolve, reject)
  var _resolve = function (promise, value) {
    return function (value) {
      // 2. resolve/reject 仅执行一次
      if (done) return
      done = true
      resolve(promise, value)
    }
  }
  var _reject = function (promise, reason) {
    return function (reason) {
      if (done) return
      done = true
      reject(promise, reason)
    }
  }
  try {
    fn(_resolve, _reject)
  } catch (error) {
    // 3. fn 执行出错时， reject(error)
    reject(promise, error)
  }
}
```

现在重点需要完成`resolve`和`reject`方法的实现。

`resolve` 和 `reject` 主要是实现对Promise解析过程，函数主体内容主要就是将`value/reason`存在`_value`上，终态时执行`_deferreds`上的回调函数集。

其中`resolve`的实现比较复杂，其中有很多 promise/A+ 规范实现的细节，`reject`的实现相对简单，先行实现。

### reject(promise, reason)

将promise状态变为`rejected`, 并将`reason`的值传递给`_value`, 之后根据`_deferredState`的状态执行`_deferreds`。

``` js
function reject (self, reason) {
  self._state = 2
  self._value = reason
  // _deferreds 中保存了一个 deferred 对象
  if (self._deferredState === 1) {
    handle(self, self._deferreds)
    self._deferreds = null
  }
  // _deferreds 中保存了多个 deferred 对象
  if (self._deferredState === 2) {
    for (var i = 0; i < self._deferreds.length; i++) {
      handle(self, self._deferreds[i])
    }
    self._deferreds = null
  }
  // _deferreds 为 null 时就什么也不做
}
```

`_deferreds`保存的是`deferred`对象，根据 promise 的状态（`_state`） 判断到底是执行`deferred`对象中的`onFulfilled`还是 `onRejected`回调函数，这个的过程我们先通过`handle`函数抽象出来, `handle`函数的具体实现后面会讲到。`reject`代码如下：

### finale(promise)

不管是`resolve(promise, value)`还是`reject(promise, reason)`，处理`_deferreds`都是同样的执行过程。所以可以把这段代码独立出来, 通过`finale`独立出来：

``` js
function reject (self, reason) {
  self._state = 2
  self._value = reason
  finale(self)
}

function resolve (self, value) {
  // ...
  finale(self)
}

function finale(self) {
  // _deferreds 中保存了多个回调函数
  if (self._deferredState === 1) {
    handle(self, self._deferreds)
    self._deferreds = null
  }
  // _deferreds 中保存了多个回调函数
  if (self._deferredState === 2) {
    for (var i = 0; i < self._deferreds.length; i++) {
      handle(self, self._deferreds[i])
    }
    self._deferreds = null
  }
  // _deferreds 为 nulls时就什么也不做
}
```

### resolve(promise, value)

`resolve` 主要是实现对Promise解析过程，通过以一个`promise`和一个值做为参数的抽象过程，可表示为`[[Resolve]](promise, x)`

``` js
function resolve (promise, value) {
  // ...
  finale(self)
}
```

##### Promise解析过程

根据 promise/A+ 规范，Promise解析过程**主要**包含以下内容：

1. 如果promise 和 value 指向相同的值, 使用 TypeError 做为原因将 promise 拒绝

2. 如果 value 是一个promise, 采用其状态

3. 如果 value 是一个对象或一个函数

  1. 将 then 赋为 value.then， 如果在取 value.then 值时抛出了异常，则以这个异常做为原因将promise拒绝

  2. 如果 then 是一个函数， 以 value 为this调用then函数

  3. 如果 then 不是一个函数，则 以 value 为值 fulfill promise

4. 如果 value 不是对象也不是函数，则以 value 为值 fulfill promise

解析过程具体代码实现：

``` js
function resolve(self, value) {
  // 1 如果 promise 和 value 指向相同的值, 使用 TypeError 做为原因将 promise 拒绝
  if (value === self) {
    return reject(self, new TypeError('A promise cannot be resolved with itself.'))
  }
  // 3 如果 value 是一个对象或一个函数
  if (value && (typeof value === 'object' || typeof value === 'function')) {
    // 3.1 将 then 赋为 value.then，如果在取 value.then 值时抛出了异常，则以此异常做为原因将promise拒绝
    try {
      var then = value.then
    } catch (error) {
      reject(self, error)
    }
    // 2 如果 value 是一个promise, 采用其状态
    if (then === self.then && value instanceof Promise) {
      self._state = 3
      self._value = newValue
      finale(self)
      return
    }
    // 3.2 如果 then 是一个函数， 以 vlaue 为 this 调用then函数
    else if (typeof then === 'function') {
      doResolve(then.bind(value), self)
      return
    }
    // 3.3 如果 then不是一个函数，则 以 value 为值fulfill promise
  }

  // 4 、3.3 如果 value 不是对象也不是函数，则以 value 为值 fulfill promise
  self._state = 1
  self._value = newValue

  // 执行 _deferreds
  finale(self)
}
```

*重点说明一下 `2` 和 `3.2` 步骤的解析过程*。

**2步骤： 如果 value 是一个promise, 采用其状态**

这里我们的做法是通过设置`_state`的值等于 `3` 来标识 value 是一个 promise 的状态，并且把 `value` 保存在`_value`中。

回忆一下之前的内容，提到抽象出了一个`handle`函数去处理`deferred`对象，意在根据`deferred.promise`的状态（`_state`） 确定到底是执行`deferred`对象中的`onFulfilled`函数还是 `onRejected`函数。
`handle`的实现需要考虑到这个解析步骤即可：

只需要在`handle`函数实现的过程中增加对`promise._state === 3`的判断, 并将当前 Promise 实例引用指向`_value`即可 获取value（另一个Promise 实例）的状态，即`promise = promise._value`。

`handle`的具体代码实现如下：

``` js
function handle (self, deferred) {
  // 当 _state = 3, 获取其状态（此时value instanceof Promise，self._value 中保存了value）, 
  while (self._state === 3) {
    self = self._value
  }
  // promise状态为 pending 时，添加 deferred 至 _deferreds
  if (self._state === 0) {
    // _deferreds 为 null 时
    if (self._deferredState === 0) {
      self._deferredState = 1
      self._deferreds = deferred
      return
    }
    // _deferreds 为 单个deferred时，按then的注册顺序构建数组
    if (self._deferredState === 1) {
      self._deferredState = 2
      self._deferreds = [self._deferreds, deferred]
      return
    }
    // self._deferredState === 2, _deferreds 为 [deferred1, deferred2, ...]，直接push添加
    self._deferreds.push(deferred)
    return
  }
  // promise 为 终态时，直接执行 deferred
  handleResolved(self, deferred)
}

function handleResolved (self, deferred) {
  // 执行 deferred.onFulfilled 或 deferred.onRejected
}
```

*如果`promise`实例为终态时，就不再保存`deferred`到`_deferreds`, 而是直接执行 `deferred`, 即`handleResolved`函数要做的事。*

**`3.2步骤：如果 then 是一个函数， 以 value 为 `this` 调用then函数`**

这里实际就是对`thenable`对象的解析过程。`thenable`就是一个包含了`then`方法的对象或函数, 比如：

``` js
let thenable = {
  then: function(resolve, reject) {
    resolve(1)
  }
}

// or

function thenable () {}
thenable.then = function (resolve, reject) {
  resolve(1)
}
```

可以看出 `thenable` 对象的 `then` 方法相当于 `new promise(fn)` 中`fn`。

回忆之前执行`fn`的过程是交给了`doResolve(fn, promise)`函数, 所以 **3.2步骤** 分解为：

先保证`then`方法调用时 `this` 指向 `thenable`： `then.bind(value)`；

然后类似对`fn`的操作: `doResolve(then.bind(value), self)`。

结合`resolve`和`doResolve`的代码一起看就很清楚了：

``` js
let thenable = {
  // ... : 省略其他方法与属性
  then: function(resolve, reject) {
    // ...
    resolve(1)
  }
}

function resolve(self, value) {
  // ...
  // 3 如果 value 是一个对象或一个函数
  if (value && (typeof value === 'object' || typeof value === 'function')) {
    if (then === self.then && value instanceof Promise) {
      // ...
      return
    }
    // 3.2 如果 then 是一个函数， 以x为 this 调用then函数
    else if (typeof then === 'function') {
      doResolve(then.bind(value), self)
      return
    }
    // 如果 then不是一个函数，则 以x为值fulfill promise
  }
  // ...
}

function doResolve (fn, promise) {
  var done = false
  var _resolve = function (promise, value) {
    return function (value) {
      if (done) return
      done = true
      resolve(promise, value)
    }
  }
  var _reject = function (promise, reason) {
    return function (reason) {
      if (done) return
      done = true
      reject(promise, reason)
    }
  }
  try {
    fn(_resolve, _reject)
  } catch (error) {
    reject(promise, error)
  }
}
```

### handleResolved

上面提到如果`promise`实例为终态时（`fulfilled`/`rejected`），`handle (self, deferred)`就再添加`deferred`到`_deferreds`, 而是直接调用`handleResolved`执行`deferred`对象（`deferred.onFulfilled/onRejected`)

由于标准中明确说明 `onFulfilled` 和 `onRejected` 异步执行，在事件循环开始之后被调用。

> In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack.

所以还需要把这个过程包装成异步：

``` js
function handleResolved (self, deferred) {
  asyncFn(function () {
    // ...
  })
}
```

`asyncFn`的实现可以使用 [asap](https://github.com/kriskowal/asap.git) ，这里简单的使用`setTimeout(fn, 0)`代替。

*asap：as soon as possible, 尽快执行的意思*

``` js
var asap = require('asap/raw')
function handleResolved (self, deferred) {
  asap(function () {
    var callback = self._state === 1 ? deferred.onFulfilled : deferred.onRejected
    if (callback === null) {
      // 值穿透
      if (self._state === 1) {
        resolve(deferred.promise, self._value)
      } else {
        reject(deferred.promise, self._value)
      }
      return
    }
    try {
      var value = callback(self._value)
      resolve(deferred.promise, value)
    } catch (error) {
      reject(deferred.promise, error)
    }
  })
}
```

**`Promise.prototype.then`注册的 `onFulfilled`、`onRejected` 函数需要异步执行的原因？**

由于promise内部执行的是同步操作还是异步操作是不确定的，这会导致`onFulfilled` 和 `onRejected` 内部如果存在外部引用就会存在不确定，比如：

``` js
var a = 1
var promise = new myPromise(function (resolve, reject) {
  // 同步
  resolve()
  // 或者 异步
  // setTimeout(resolve, 0)
})
promise.then(function (value) {
  a = 2
})

console.log(a)
```

假如未规定`onFulfilled`、`onRejected`为异步执行，则这里`console.log(a)`可能存在两种值: promise 内部同步操时，输出 `a` 的值为 `2`; promise 内部是异步操作，输出 `a` 的值为 `1`。

为屏蔽这种不确定性，规范指出 `onFulfilled` 和 `onRejected` 方法必须异步执行。

### Promise.prototype.then(onFulfilled, onRejected)

Promise必须提供一个`then`方法来获取其值或原因，Promise的then方法接受两个参数`promise.then(onFulfilled, onRejected)`

`then`主要有以下规范

1. 参数均可选。`onFulfilled` 和 `onRejected` 都是可选参数，且必须被当做函数调用，如果不是函数，都将被忽略。

2. 可以被同一个 promise 调用多次。`then` 方法可以被同一个 promise 调用多次。在 promise状态变为 `fulfilled` 或 `rejected` 后，对应的 `onFulfilled` 或 `onRejected` 函数须按照其注册顺序依次执行，且执行次数不能超过一次。

3. 参数`onFulfilled` 和 `onRejected` 只允许被异步执行。

`onFulfilled` 和 `onRejected` 被包装在`deferred`对象中，`deferred`的执行过程是交由`handleResolved`函数去完成的，为何只允许被异步执行在`handleResolved`实现过程中已经说明，不再赘述。

4. `then` 必须返回一个新的promise实例。即`promise2 = promise1.then(onFulfilled, onRejected)`

**为何`then`链式调用必须返回一个新的promise实例，而不是直接返回`this`呢？**

``` js
var promise2 = promise1.then(function (value) {
  return Promise.reject(1)
})
```

上面如果`promise1`为 `fulfilled` 后将会执行`onFulfilled`，`onFulfilled`返回需要返回一个一个状态为`rejected`的 promise,。
由于 promise 状态一旦变为终态不能再更改，所以如果返回`this`, 即`promise2 === promise1`，则`promise2` 无法转为`rejected`状态，这就产生了矛盾。

由上，我们也可以知道`then`执行流程大致：

1. 实例化一个新的 promise 对象并返回（保持`then`链式调用）；

2. 构造 `deferred` 对象用于存储`onFulfilled`、`onRejected` 和 新的`promise`实例；

3. 判断当前 `promise` 状态，如果为`pending` 状态保存`deferred`到`_deferreds`中，否则执行`deferred`中的`onFulfilled`或`onRejected`。

``` js
function noop () {}

Promise.prototype.then = function (onFulfilled, onRejected) {
  var promise = new Promise(noop)
  handle(this, new Handler(onFulfilled, onRejected, promise))
  return promise
}

// 结合 handle 看一下更清楚
function handle (self, deferred) {
  // resolve(x), x 为 promise时，获取其状态
  while (self._state === 3) {
    self = self._value
  }
  // promise 为 非终态时，添加 deferred 至 self._deferreds
  if (self._state === 0) {
    // ... 
    return
  }
  // promise 为 终态时，直接执行 deferred
  handleResolved(self, deferred)
}
```

# es6 扩展

### Promise.prototype.catch

`promise` 内部错误都会以 `error` 作为 `reason` 被 reject，即 `reject(reason)`

``` js
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
```

### Promise.reject

`Promise.reject(reason)`方法会返回一个新的 Promise 实例，该实例的状态为`rejected`

``` js
Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value)
  })
}
```

### Promise.resolve

将传入的值转为 Promise 对象

``` js
function valuePromise (value) {
  var promise = new Promise(noop)
  promise._state = 1
  promise._value = value
  return promise
}

Promise.resolve = function (value) {
  if (value instanceof Promise) return value

  if (value === null) return valuePromise(null)
  if (value === undefined) return valuePromise(undefined)
  if (value === true) return valuePromise(true)
  if (value === false) return valuePromise(false)
  if (value === 0) return valuePromise(0)
  if (value === '') return valuePromise('')

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then
      if (typeof then === 'function') {
        return new Promise(then.bind(value))
      }
    } catch (error) {
      return new Promise(function (resolve, reject) {
        reject(error)
      })
    }
  }
  return valuePromise(value)
}
```

### Promise.all

将多个 Promise 实例包装成一个新的 Promise 实例

``` js
const p = Promise.race([p1, p2 /* , ... */])
```

主要有以下特征：

1. 只有所有的Promise 实例的状态都变成`fulfilled`，p的状态才会变成`fulfilled`，此时 `p1、p2` ... 的返回值组成一个数组，传递给`p`的`then`方法注册的回调函数

2. 只要多个实例中有一个状态变为`rejected`，`p`的状态就变成`rejected`，此时率先被`reject`的实例的返回值，会传递给`p`的`then`方法注册的回调函数。

3. 如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`返回新实例的`catch`方法

``` js
Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr)

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([])
    var remaining = args.length

    function res (i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        // Promise 实例
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._state === 3) {
            val = val._value
          }
          // fulfilled => args[i] = val
          if (val._state === 1) return res(i, val._value)
          if (val._state === 2) reject(val._value)
          val.then(function (val) {
            res(i, val)
          }, reject)
          return
        }
        // thenable 对象
        else {
          var then = val.then
          if (typeof then === 'function') {
            // 如果 then 是一个函数， 以 value 为 this 调用then函数
            var p = new Promise(then.bind(val))
            p.then(function (val) {
              res(i, val)
            }, reject)
            return
          }
        }
      }
      // 非 promise/thenable
      args[i] = val
      if (--remaining === 0) {
        resolve(args)
      }
    }

    for (var i = 0; i < args.length; i ++) {
      res(i, args[i])
    }
  })
}
```

### Promise.race

Promise.race方法是将多个 Promise 实例，包装成一个新的 Promise 实例

``` js
const p = Promise.race([p1, p2 /* , ... */])
```

多个Promise 实例谁率先改变状态，`p`的状态就跟着改变。

所以使用`Promise.resolve`包装后调用`then`方法，以`resolve`、`reject`作为 `onFulfilled` 和 `onRejected`即可。率先执行`onFulfilled`或`onRejected`的改变`p`的状态

``` js
Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function (value){
      Promise.resolve(value).then(resolve, reject)
    })
  })
}
```

# 参考

[when/promise源码](https://github.com/then/promise)
