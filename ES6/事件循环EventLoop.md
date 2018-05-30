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