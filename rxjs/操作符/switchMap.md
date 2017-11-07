switchMap 基本功能和map一样， 如果我们的变换函数是个同步函数他们的功能完全一样，switchMap是为了解决异步变换而出现的。

假设我们的界面上有个刷新按钮，点一下就会重新获取一个大表格的数据，这些数据请求由于网络原因可能比较慢，所以时间都比较久。有个问题是如果我们点击了刷新按钮，在数据还没有返回之前又点击了一次, 这时候传统的方法直接渲染请求结果可能导致不正确的现象，因为可能数据实时变化导致历史数据显示到了屏幕上。

我们借助RxJS来帮我们实现这个功能。 用到的operator为switchMap.

const Refresh = () => { ... return some heavily ajax request ... }
const myObservable$ = Rx.Observable.fromEvent(dom, 'click')
    .switchMap(() => Rx.Observable.fromPromise(Refresh()))

myObservable.subscribe((newContent) => {
    // trigger rerender
})
当我们点击事件触发后，执行switchMap的函数体，这里我们创建了一个Rx.Observable.fromPromise将我们的ajax的promise转换成Observable, switchMap会将此事件流加入到这个流处理中进行等待(在ajax返回之前不会触发subscribe调用)。 此时我们又点击了一次按钮之后switchMap发现有新的事件到来，而现在还有一个流没执行结束，switchMap会放弃旧的流转而执行新的操作。由此来达到我们只处理最新的需求。