
什么是调度者？调度者控制着何时启动一个订阅和何时通知被发送。它有三个组件构成


- 一个调度者是一个数据结构。它知道如何根据优先级或其他标准存储和排列任
务。
- 一个调度者是一个执行上下文。它表示何处何时任务被执行(例如:
immediately(立即), or in another callback mechanism(回调机制) such as
setTimeout or process.nextTick, or the animation frame)

- 一个调度者具有虚拟的时钟。它通过调度器上的getter方法now()提供了“时间”的概念。 在特定调度程序上调度的任务将仅仅遵守由该时钟表示的时间。

> 调度者使得你可以确定可观察对象在什么执行上下文中给观察者发送通知

下面的例子，我们使用常见的的可观察对象，它同步的发送三个数值1/2/3。使用
observeOn操作符指定用于传递这些值的异步调度程序。


var observable = Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
})
.observeOn(Rx.Scheduler.async);

console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');

输出：
just before subscribe
just after subscribe
got value 1
got value 2
got value 3
done

未使用.observeOn(Rx.Scheduler.async)输出：

just before subscribe
got value 1
got value 2
got value 3
done
just after subscribe
