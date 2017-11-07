http://cn.rx.js.org/manual/overview.html#h15

什么是Subject？ 在RxJS中，Subject是一类特殊的Observable，它可以向多个Observer多路推送数值。普通的Observable并不具备多路推送的能力（每一个Observer都有自己独立的执行环境），而Subject可以共享一个执行环境。

Subject是一种可以多路推送的可观察对象。与EventEmitter类似，Subject维护着自己的Observer。

每一个Subject都是一个**Observable（可观察对象）** 对于一个Subject，你可以订阅（subscribe）它，Observer会和往常一样接收到数据。从Observer的视角看，它并不能区分自己的执行环境是普通Observable的单路推送还是基于Subject的多路推送。

Subject的内部实现中，并不会在被订阅（subscribe）后创建新的执行环境。它仅仅会把新的Observer注册在由它本身维护的Observer列表中，这和其他语言、库中的addListener机制类似。

每一个Subject也可以作为**Observer（观察者）** Subject同样也是一个由next(v)，error(e)，和 complete()这些方法组成的对象。调用next(theValue)方法后，Subject会向所有已经在其上注册的Observer多路推送theValue。


console.log('just before subscribe');
observable.subscribe({
next: x => console.log('got value ' + x),
error: err => console.error('something wrong occurred: ' + err),
complete: () => console.log('done'),
});
console.log('just after subscribe');