
# 创建 observables

- 在外部产生新事件。

var myObservable = new Rx.Subject();
myObservable.subscribe(value => console.log(value));
myObservable.next('foo');

- 在内部产生新事件。


var observable = Rx.Observable.create(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  } catch (err) {
    observer.error(err); // delivers an error if it caught one
  }
});

**订阅 & 取消订阅**
// 在你订阅了之后，你将会得到一个Subscription对象，它表示正在进行的执行。
var subscription = observable.subscribe(value => console.log(value));
// unsubscribe()终止执行
subscription.unsubscribe();


可观察对象执行可以发送的三种类型的值:

"Next": 发送一个数字/字符串/对象等值。
"Error": 发送一个JS错误或者异常。
"Complete" 不发送值。

Next通知是最重要且最常见的类型:它们代表发送给观察者的确切数据，Error和Complete通知可能仅在可观察对象执行期间仅发生一次，但仅会执行二者之中的一个