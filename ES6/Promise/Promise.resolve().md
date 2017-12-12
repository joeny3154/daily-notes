有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。


const jsPromise = Promise.resolve($.ajax('/whatever.json'));
上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。

Promise.resolve等价于下面的写法。

Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))


Promise.resolve方法的参数分成四种情况。

1. 参数是一个 Promise 实例

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

2. 参数是一个thenable对象

thenable对象指的是具有then方法的对象，比如下面这个对象。

```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

Promise.resolve 方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

上面代码中，thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。

3. 参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。

const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello

上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

4. 不带有任何参数