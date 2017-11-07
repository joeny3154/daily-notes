map vs flatMap vs flatMapLatest
=======
这里stream会返回一个Observable而不是数字。

let stream = Observable.interval(1000).take(10);
<!-- 延迟500毫秒 -->
return stream.map(n => Observable.timer(500).map(() => n));

**flatMap**

如果我想要拿到那些数字，我该怎么办
let stream = Observable.interval(1000).take(10);
return stream.flatMap(n => Observable.timer(500).map(() => n));

这里使用了flatMap而不是map。flatMap将响应数据“打平”，也就是说把映射后新的Observable转化为了数据流，订阅之后会获得这个新Observable发射的数据，而不是Observable本身。

flatMap有一个很适用的场景，就是搜索框。在用户输入一串字符后，将其发送到服务器并获取搜索结果，这里就涉及到两个Observable。

**flatMapLatest**
使用flatMap就可以直接获取到新的Observable返回的数据。但是这里存在一个问题，如果用户有多次输入，由于网络原因可能会发生前一次响应时间比后一次长的情况，这时后一次的结果就被覆盖了。
flatMapLatest可以解决这个问题。如果之前的Observable还没有未触发，而又收到了新的Observable，

flatMapLatest会取消之前的Observable，只处理最新收到的Observable，这样就保证了处理请求的先后顺序，flatMapLatest在RxJS 5.x中已更名为`switchMap`。

flatMapFirst 取消后续的操作