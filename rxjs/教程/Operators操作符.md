

操作符是可观察对象上定义的方法，例如.map(...),.filter(...),.merge(...)，等等。当
他们被调用，并不会去改变当前存在的可观察对象实例。相反，他们返回一个新的
可观察对象，而且新返回的subscription订阅对象逻辑上基于调用他们的我观察对
象。


一个操作符本质上是一个将某个可观察对象作为输入然后输出另一个可观察对象的
纯函数。对输出的新的可观察对象进行订阅的同时也会订阅作为输入的那个可观察
对象。下面的例子，我们创建一个自定义的运算符函数，将从作为输入的可观察对
象的每个值乘以10.

function multiplyByTen(input) {
var output =Rx.Observable.create(function(observer){
input.subscribe({
next: (v) => observer.next(10*v),
error: (err) => observer.error(err),
complete: () => observer.complete()
});
});
return output;
}
var input = Rx.Observable.from([1,2,3,4]);
var output = multiplyByTen(input);
output.subscribe(x=>console.log(x));

10
20
30
40

- 实例操作符 (instance operator)

Rx.Observable.prototype.multiplyByTen = function(){
  var input=this;
  return Rx.Observable.create(function subscribe(observer){
    input.subscribe({
      next: (v) => observer.next(10*v),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
}

注意：input并不是作为函数的参数，而是作为this所指代的那个对象。

var observable = Rx.Observable.from([1,2,3,4]).multiplyByTen();
observable.subscribe(x => console.log(x));

- 静态操作符 (static operator)

什么是静态操作符？不同于实力操作符，静态操作符是直接定义在类上的。一个静态操作符并不在其内部使用this，而是完全依赖于它的参数。

var observable = Rx.Observable.intervable(1000)

另一个构造操作符是create,我们在之前的例子中曾大量使用，一些合并操作符可能是静态的，例如:merge,combineLatest,concat,等等。

将这些操作符声明为静态的是有意义的，因为他们**接收多个可观察对象作为参数**，而不是一个，示例如下:

var observable1 = Rx.Observable.interval(1000);
var observable2 = Rx.Observable.interval(400);
var merged = Rx.Observable.merge(observable1, observable2);