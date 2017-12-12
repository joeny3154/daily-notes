finally()
=====

finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

```
server.listen(0)
  .then(function () {
    // run test
  })
  .finally(server.stop);
```

实现：

```
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```


上面代码中，不管前面的 Promise 是fulfilled还是rejected，都会执行回调函数callback。