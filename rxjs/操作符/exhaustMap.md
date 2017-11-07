map的变体2， 也是主要解决异步map的问题。

场景: 假设我们有一个上传文件的按钮，嗯，又是个按钮，而且操作比较重，这个场景是在一个上传操作执行的时候我们是不响应其他上传操作的，防止误点导致重复上传。

const Upload = () => { ... return some heavily ajax request ...}
const myObservable$ = Rx.Observable.fromEvent(dom, 'click')
    .exhaustMap(e => Rx.Observable.fromPromise(Upload()))

myObserable.subscribe((result) => {
  console.log(result)
})
exhaustMap 的作用是加入一个Observable到本流的处理单元中，并且在处理结束之前忽略其他到来的事件流。

exhaustMap 让我们防并发请求的逻辑中解耦了，可以非常优雅地解决这个问题。