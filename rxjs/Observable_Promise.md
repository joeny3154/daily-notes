

// promise的火力增强版


// promise 解决回调地狱

// 缺陷：连续的值

- `Promise` 写法
let promise = new Promise(resolve => {
  setTimeout(() => {
    resolve('-----promise timeout-----')
  }, 2000)
})
promise.then(value => console.log(value))

- `Observable` 写法

```
let stream1$ = new Observable(observer => {
  let timeout = setTimeout(() => {
    // 可以发射多个值
    observer.next('Observable timeout')
  }, 1000)
  return () => {
    clearInterval(timeout)
  }
})

let disposable = stream1$.subscribe(value => console.log(value))
```

### 不同点


- 1. `Observable` 是可以中途取消的，而 `Promise` 一旦触发就不能取消

```
setTimeout(() => {
  disposable.unsubscribe()
}, 1000)
```

- 2. `Observable` 可以持续发射很多值，而 `Promise` 只能发射一个值就结束了


```
let stream2$ = new Observable(observer => {
  let count = 0
  let interval = setInterval(() => {
    // 可以发射多个值
    observer.next('Observable timeout')
  }, 1000)
  return () => {
    clearInterval(interval)
  }
})

let disposable = stream2$.subscribe(value => console.log(value))
```

- 3. `Observable` 提供了很多的工具函数，最常用的 `filter` 和 `map`

```
stream2$
  .filter(value => value % 2 == 0)
  .subscribe(value => console.log(value))

stream2$
  .map(value => value * value)
  .subscribe(value => console.log(value))
```


# Observables vs Promises

https://zhangchen915.gitbooks.io/angular2-training/content/content/Observables/observables_vs_promises.html

Promises和Observables都为我们提供了抽象，帮助我们处理应用程序的异步性质。 然而，两者之间存在重要的区别：
如前面的例子所示，Observables可以定义异步行为的建立和分解。
Observables是可取消的
此外，可以使用API提供的重试操作符之一重试Observable，例如retry和retryWhen。 另一方面，Promises需要调用者访问返回promise的原始函数，以便具有重试能力。
⚡️Observables 就是 Promise 的超集