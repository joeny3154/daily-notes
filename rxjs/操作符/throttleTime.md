
# throttleTime

var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
// 每秒最多只能点击一次的实现
.throttleTime(1000)
.scan(count => count + 1, 0)
.subscribe(count => console.log(`Clicked ${count} times`));


其他的流操作符是filter, delay, debounceTime, take, takeUntil, distinct, distinctUntilChanged 等等