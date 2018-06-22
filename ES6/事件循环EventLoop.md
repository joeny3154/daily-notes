Event Loop

https://juejin.im/post/5b067e66f265da0de45237cd


# 主线程

js是单线程，主线程

# 任务队列

分为 microtask 和 macrotask

通常我们会称之为微任务和宏任务。 microtask 这一名词在js中是个比较新的概念，我们通常是在学习 ES6 的 Promise 时才初次接触到。

执行优先级上，主线程任务 > microtask > macrotask。

典型的 macrotask 有 setTimeout 和 setInterval，以及只有 IE 支持的 setImmediate，还有 MessageChannel等 ES6的 Promise 则是属于 microtask

# node原生就支持 process.nextTick(fn)和setImmediate(fn)方法，并且会被当做microtask顺序执行


# 消息队列和事件循环

异步过程中，工作线程在异步操作完成后需要通知主线程。那么这个通知机制是怎样实现的呢？答案是利用消息队列和事件循环。

用一句话概括：

工作线程将消息放到消息队列，主线程通过事件循环过程去取消息。

消息队列：消息队列是一个先进先出的队列，它里面存放着各种消息。

事件循环：事件循环是指主线程重复从消息队列中取消息、执行的过程。

实际上，主线程只会做一件事情，就是从消息队列里面取消息、执行消息，再取消息、再执行。当消息队列为空时，就会等待直到消息队列变成非空。而且主线程只有在将当前的消息执行完成后，才会去取下一个消息。这种机制就叫做事件循环机制，取一个消息并执行的过程叫做一次循环。

# 运行时

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop





# 先理解几个概念

- 同步任务 & 异步任务

同步任务（synchronous），另一种是异步任务（asynchronous）。

同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

- heap 堆

对象被分配在一个堆中，即用以表示一个大部分非结构化的内存区域。

- stack 栈

执行栈（execution context stack）

所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

函数调用形成了一个栈帧。

- queue 队列

任务队列（task queue）

一个 JavaScript 运行时包含了一个待处理的消息队列。每一个消息都有一个为了处理这个消息相关联的函数。

在事件循环时，runtime （运行时）总是从最先进入队列的一个消息开始处理队列中的消息。正因如此，这个消息就会被移出队列，并将其作为输入参数调用与之关联的函数。为了使用这个函数，调用一个函数总是会为其创造一个新的栈帧（ stack frame），一如既往。

函数的处理会一直进行直到执行栈再次为空；然后事件循环（event loop）将会处理队列中的下一个消息（如果还有的话）。

先进先出的数据结构，排在前面的事件，优先被主线程读取

microtask 和 macrotask

# 添加消息至队列

- IO设备的事件

IO设备完成一项任务，就在"任务队列"中添加一个事件

- 用户事件

在浏览器里，当一个事件出现且有一个事件监听器被绑定时，消息会被随时添加。如果没有事件监听器，事件会丢失。所以点击一个附带点击事件处理函数的元素会添加一个消息。其它事件亦然。

所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

- 定时器

setTimeout

调用 setTimeout 函数会在一个时间段过去后在队列中添加一个消息。这个时间段作为函数的第二个参数被传入。如果队列中没有其它消息，消息会被马上处理。但是，如果有其它消息，setTimeout消息必须等待其它消息处理完。因此第二个参数仅仅表示最少的时间 而非确切的时间。

- xml


# Node.js的Event Loop

Node.js还提供了另外两个与"任务队列"有关的方法：process.nextTick和setImmediate。它们可以帮助我们加深对"任务队列"的理解。

- nextTick

process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。

由于process.nextTick方法指定的回调函数，总是在当前"执行栈"的尾部触发，所以不仅函数A比setTimeout指定的回调函数timeout先执行，而且函数B也比timeout先执行。这说明，如果有多个process.nextTick语句（不管它们是否嵌套），将全部在当前"执行栈"执行。

- setImmediate

我们由此得到了process.nextTick和setImmediate的一个重要区别：多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。事实上，这正是Node.js 10.0版添加setImmediate方法的原因，否则像下面这样的递归调用process.nextTick，将会没完没了，主线程根本不会去读取"事件队列"！

``` js
process.nextTick(function foo() {
  process.nextTick(foo);
});
```

事实上，现在要是你写出递归的process.nextTick，Node.js会抛出一个警告，要求你改成setImmediate。

另外，由于process.nextTick指定的回调函数是在本次"事件循环"触发，而setImmediate指定的是在下次"事件循环"触发，所以很显然，前者总是比后者发生得早，而且执行效率也高（因为不用检查"任务队列"）。

# 参考

[运行时概念](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

[再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)