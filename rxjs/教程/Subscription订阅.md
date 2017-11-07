Subscription订阅
==========

什么是订阅？

订阅是一个表示一次性资源的对象，通常是一个可观察对象的执行。订阅对象有一个重要的方法:unsubscribe，该方法不需要参数，仅仅去废弃掉可观察对象所持有的资源。

在以往的RxJS的版本中，"Subscription订阅"被称
为"Disposable"。

var observable1 = Rx.Observable.interval(400)
var observable2 = Rx.Observable.interval(300)

var subscription = observable1.subscribe(x => console.log('first: ' + x))
var childSubscription = observable2.subscribe(x => console.log('second: ' + x))

// 添加子订阅
subscription.add(childSubscription)

setTimeout(() => {
  subscription.unsubscribe()
}, 1000)

- add & remove 添加 & 移除 子订阅

订阅也有一个remove(otherSubscription)方法,用于解除被add添加的子订阅