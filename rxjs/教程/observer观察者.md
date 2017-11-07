
observer观察者
=====

什么是观察者？观察者是可观察对象所发送数据的消费者，观察者简单而言是一组回调函数 ， 分别对应一种被可观察对象发送的通知的类型:next, error和complete。下面是一个典型的观察者对象的例子:

var observer = {
  next:x=>console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification')
}

> 观察者不过是三个回调函数组成的对象，每个回调函数分别对应可观察对象的通知类型。


去使用观察者，需要订阅可观察对象:
observable.subscribe(observer)

**or**

observable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
)

当订阅一个可观察对象，你可能仅仅提供回调来作为参数就够了，并不需要完整的观察者对象，示例：

observable.subscribe(x => console.log('Observer got a next value: ' + x));