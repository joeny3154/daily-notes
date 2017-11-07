第一个operator 介绍map, map是我们最常见的操作符了，用法也相当的简单，执行输入到输出的映射。

const myObservable$ = Rx.Observable.fromEvent(dom, 'click')
    .map((e) => ({event: e}))

myObservable$.subscribe((e) => {
  console.log(e)
})
使用事件流图来表示如下.

e-->-----------e -->----------e--->--------->

        map(e => ({event: e}))

({event: e})-->({event: e})->({event: e})--->
这里需要预先说明，RxJS的事件流为冷模式的, 也就如果一个observable对象没有subscribe, 那么他将不会处理事件流，只有subscribe后才会真正的开始工作。 可能乍一想没什么问题，不过如果你想借助一些其他operator执行一些副作用函数来解决你的问题，可能你的subscribe压根就没用，这时候如果你懒得subscribe，那么你的事件流将不会工作。