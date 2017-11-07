Subject主题
======

什么是Subject？Subject是允许值被多播到多个观察者的一种特殊的Observable。然而纯粹的可观察对象是单播的(每一个订阅的观察者拥有单独的可观察对象的执行)。

每一个Subject都是一个observable可观察对象，给定一个Subject后，你可以订阅它，提供的观察者将会正常的开始接收值。从观察者的角度来看，它不能判断一个可观察对象的执行时来自于单播的Observable还是来自于一个Subject.在Subject的内部，subscribe并不调用一个新的发送值得执行。它仅仅在观察者注册表中注册给定的观察者，类似于其他库或者语言中的addlistener的工作方式。


- 每一个`Subject`都是一个`Observer`**观察者对象**

它是一个拥有`next()`/`error()`/`complete()`方法的对象。要想Subject提供一个新的值，只需调用next()，它将会被多播至用来监听Subject的观察者。

```
var subject = new Rx.Subject()
subject.subscribe({
  next: (v) => console.log(observerA: ' + v)
})

subject.subscribe({
  next: (v) => console.log(observerB: ' + v)
})

subject.next(1);
subject.next(2);

输出：

observerA: 1
observerB: 1
observerA: 2
observerB: 2

- 由于Subject也是一个**观察者**

这就意味着你可以提供一个Subject当做observable.subscribe()的参数，如下:

var subject = new Rx.Subject();
subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

var observable = Rx.Observable.from([1, 2, 3]);
observable.subscribe(subject); // You can subscribe providing a Subject

输出如下:

observerA: 1
observerB: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3