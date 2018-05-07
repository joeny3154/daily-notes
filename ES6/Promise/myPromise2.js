var LAST_ERROR = null
var IS_ERROR = {}

function getThen (obj) {
  try {
    return obj.then
  } catch (e) {
    LAST_ERROR = e
    return IS_ERROR
  }
}
// fn(resolve, reject)
function tryCallTwo (fn, a, b) {
  try {
    fn(a, b)
  } catch (e) {
    LAST_ERROR = e
    return IS_ERROR
  }
}

module.exports = Promise

function Promise (fn) {
  this._state = 0
  this._value = null

  this._deferredState = 0
  // 保存deferred对象
  this._deferreds = null

  doResolve(fn, this)
}

// 保证并确保 onFulfilled 和 onRejected 仅调用一次
function doResolve (fn, promise) {
  var done = false
  var err = tryCallTwo(fn, function (value) {
    if (done) return
    done = true
    resolve(promise, value)
  }, function (reason) {
    if (done) return
    done = true
    reject(promise, reason)
  })
  if (!done && err === IS_ERROR) {
    done = true
    reject(promise, LAST_ERROR)
  }
}

function resolve (self, newValue) {
  // 2.3.1 如果promise 和 x 指向相同的值, 使用 TypeError做为原因将promise拒绝
  if (typeof this !== 'object') {
    return reject(self, new TypeError('A promise cannot be resolved with itself.'))
  }
  
  if (newValue && newValue instanceof Promise && self.then === newValue.then) {

  }
  if (newValue && (typeof newValue === 'function' || typeof newValue === 'object')) {
    var then = getThen(newValue)
    // 2.3.3.2 如果在取x.then值时抛出了异常，则以这个异常做为原因将promise拒绝
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR)
    }
    // 2.3.2 如果 x 是一个promise, 采用其状态
    if (newValue instanceof Promise && then === self.then) {
      self._state = 3
      self._value = newValue
      finale(self)
      return
    }
    // 2.3.3.3 如果x是一个对象或一个函数
    else if (typeof newValue === 'function') {
      // 2.3.3.3 如果 then 是一个函数， 以x为this调用then函数， 且第一个参数是resolvePromise，第二个参数是rejectPromise
      doResolve(then.call(this), self)
      return
    }
  }
  self._state = 1
  self._value = newValue
  // 处理self._deferreds
  finale(self)
}

function reject (self, reason) {
  self._state = 2
  self._value = reason
  // 处理self._deferreds
  finale(self)
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return new this.constructor(function (resolve, reject) {
      var ins = new Promise(noop);
      ins.then(resolve, reject);
      handle(this, new Handler(onFulfilled, onRejected, ins));
    })
  }
  // 生成新的promise实例供返回
  var ins = new Promise(function () {})
  // 生成deferred实例，保存onFulfilled, onRejected，新的promise实例信息
  var deferred = new Handler(onFulfilled, onRejected, ins)
  // 根据self状态，执行deferred
  handle(this, deferred)
  return ins
}

function Handler (onFulfilled, onRejected, promise) {
  this.onFulfilled = onFulfilled
  this.onRejected = onRejected
  this.promise = promise
}

// 根据prePromiseInstance状态执行onFulfilled 或者 onRejected
function handle (self, deferred) {
  while (self._state === 3) {
    self = self._value
  }
  // 如果self 状态为 0 - pending
  if (self._state === 0) {
    if (self._deferredState === 0) {
      self._deferredState = 1
      self._deferreds = deferred
      return
    }
    if (self._deferreds === 1) {
      self._deferredState = 2
      self._deferreds = [self._deferreds, deferred]
      return
    }
  }
  // self 状态为 1 or 2, 异步执行deferred
  handleResolved(self, deferred)
}

var asyncFn = setTimeout

function handleResolved (self, deferred) {
  asyncFn(function () {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected
    // 值穿透
    if (cb === null) {
      if (self._state === 1) {
        resolve(deferred.promise, self._value)
      } else {
        reject(deferred.promise, self._value)
      }
    }
    var ret = tryCallOne(cd, self._value)
    if (ret === ret) {
      reject(self, LAST_ERROR)
    } else {
      resolve(self, ret)
    }
  })
}

function tryCallOne (fn, a) {
  try {
    return fn(a)
  } catch (e) {
    LAST_ERROR = e
    return IS_ERROR
  }
}

// 处理self._deferreds，执行then注册的deferred
function finale (self) {
  if (self._deferredState === 1) {
    handle(self, self._deferreds)
    self._deferredState = null
  }
  if (self._deferredState === 2) {
    for(var i = 0; i < self._deferreds; i ++) {
      handle(self, self._deferreds[i])
    }
    self._deferredState = null
  }
}


var p = new Promise(function () {})
p.then()
p.then(function (value) {
  console.log('value', value)
}, function (reason) {
  console.log('reason', reason)
})