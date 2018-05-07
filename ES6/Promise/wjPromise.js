// 0 - pending
// 1 - fulfilled
// 2 - rejected
// this._value = null;
// this._deferreds = null;

var asyncFn = (function () {
  if (process !== null && typeof process === 'object' && typeof(process.nextTick) === 'function') {
    return process.nextTick
  }
  if (typeof setImmediate === 'function') {
    return setImmediate
  }
  return setTimeout
})()

function resolve (promise, newValue) {
  if (promise._state !== 'pending') return
  // Promise A+ 规范 2.3.1: promise 和 value 指向同一对象
  if (newValue === promise) {
    return reject(promise, new TypeError('A promise cannot be resolved with itself.'))
  }
  // Promise A+ 规范 2.3.2: 如果 value 为 Promise，则使 promise 接受 value 的状态
  if (newValue && newValue instanceof Promise && newValue.then === promise.then) {
    var deferreds = promise._deferreds
    if (newValue._state === 'pending') {
      newValue._deferreds.push(...deferreds)
      console.log('newValue._deferreds', newValue._deferreds.length)
    } else {
      if (deferreds.length !== 0) {
        for(var i = 0; i < deferreds.length; i ++) {
          handleResolved(newValue, deferreds[i])
        }
      }
      newValue.deferreds = []
    }
    return
  }
  // Promise A+ 规范 2.3.3: value 是对象或函数
  if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
    try {
      var then = newValue.then
    } catch (e) {
      reject(promise, e)
    }
    if (typeof then === 'function') {
      try {
        then.call(newValue, function (value) {
          resolve(promise, value)
        }, function (value) {
          reject(promise, value)
        })
      } catch (e) {
        reject(promise, e)
      }
    }
    return
  }

  promise._state = 'fulfilled'
  promise._value = newValue
  if (promise._deferreds.length !== 0) {
    for (var i = 0; i < promise._deferreds.length; i ++) {
      handleResolved(promise, promise._deferreds[i])
    }
    promise._deferreds = []
  }

}

function reject (promise, newValue) {
  if (promise._state !== 'pending') return
  promise._state = 'rejected'
  promise._value = newValue

  if (promise._deferreds !== 0) {
    for (var i = 0; i < promise._deferreds.length; i ++) {
      handleResolved(promise, promise._deferreds[i])
    }
    promise._deferreds = []
  }
}

function Promise (fn) {
  this._state = 'pending'
  this._value = null
  this._deferreds = []
  // 立即执行
  try {
    fn(
      function (value) {
        return resolve(this, value)
      }.bind(this),
      function (value) {
        return reject(this, value)
      }.bind(this)
    )
  } catch (e) {
    reject(this, e)
  }
  
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  var newPromise = new Promise(function () {})
  var deferred = new Handler(onFulfilled, onRejected, newPromise)
  if (this._state === 'pending') {
    this._deferreds.push(deferred)
    return newPromise
  }

  handleResolved(this, deferred)
  return newPromise
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

function Handler (onFulfilled, onRejected, newPromise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.promise = newPromise
}

function handleResolved (promise, deferred) {
  asyncFn(function () {
    var callback = promise._state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected
    if (callback === null) {
      if (promise._state === 'fulfilled') {
        resolve(deferred.promise, promise._value)
      } else {
        reject(deferred.promise, promise._value)
      }
      return
    }
    try {
      var value = callback(promise._value)
    } catch (e) {
      reject(deferred.promise, e)
    }
    resolve(deferred.promise, value)
  })
}


Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value)
  })
}

function valuePromise (value) {
  var promise =  new Promise(function () {})
  promise._state = 'fulfilled'
  promise._value = value
  return promise
}
// Promise.resolve = function (value) {
//   if (value instanceof Promise) return value

//   if (value === undefined) return valuePromise(undefined)
//   if (value === null) return valuePromise(null)
//   if (value === 0) return valuePromise(0)
//   if (value === '') return valuePromise('')
//   if (value === true) return valuePromise(true)
//   if (value === false) return valuePromise(false)

//   if (typeof value === 'object' || typeof value === 'function') {
//     try {
//       var then = value.then
//       if (typeof then === 'function') {
//         return new Promise(then.)
//       }
//     } catch (e) {
//       return new Promise(function (resolve, reject) {
//         reject(e)
//       })
//     }
//   }
//   return valuePromise(value)
// }

module.exports = Promise
