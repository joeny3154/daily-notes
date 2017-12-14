
websocket
=====

[阮一峰 websocket](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

[WebSocket - Web API 接口| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

# 为什么需要 WebSocket?

HTTP 协议有一个缺陷：通信只能由客户端发起,HTTP 协议做不到服务器主动向客户端推送信息。

这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用"轮询"：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。

轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。


# 特点

**最大特点**，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话

1. 建立在 TCP 协议之上，服务器端的实现比较容易。
2. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
3. 数据格式比较轻量，性能开销小，通信高效。
4. 可以发送文本，也可以发送二进制数据。
5. 没有同源限制，客户端可以与任意服务器通信。
6. 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。 `ws://example.com:80/some/path`

![websocket](../img/websocket.jpg)


eg:客户端的简单示例

```
var ws = new WebSocked('wss://echo.websocket.org')

ws.onopen = function(evt) {
  console.log('Connection open ...')
  ws.send('Hello WebSockets!')
}

ws.onmessage = function(evt) {
  console.log('Received Message:' + evt.data) // "Received Message: Hello WebSockets!"
}

ws.onclose = function(evt) {
  console.log('Connection closed.')
}
```

# 客户端API

### WebSocket 构造函数

WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例: `var ws = new WebSocket('ws://localhost:8080');`

执行上面语句之后，客户端就会与服务器进行连接。
实例对象的所有属性和方法清单，参见[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

### webSocket.readyState

属性返回实例对象的当前状态，共有四种:

> - CONNECTING：值为0，表示正在连接。
> 
> - OPEN：值为1，表示连接成功，可以通信了。
>
> - CLOSING：值为2，表示连接正在关闭。
>
> - CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

eg: 
```
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```
### webSocket.onopen

用于指定连接成功后的回调函数

eg:

```
ws.onopen = function () {
  ws.send('Hello Server!');
}

<!-- 要指定多个回调函数，可以使用addEventListener方法。 -->

ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```

### webSocket.onclose

用于指定连接关闭后的回调函数

eg: 

```
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
```

### webSocket.onmessage

用于指定收到服务器数据后的回调函数

eg: 

```
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```

**动态判断收到的数据类型:**注意，服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）。

eg:

```
ws.onmessage = function(event) {
  if(typeof event.data === 'string') {
    console.log("Received data string");
  }

  if(event.data instanceof ArrayBuffer) {
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```

**指定收到的二进制数据类型：**除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型。

eg:

```
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```

### webSocket.send()

用于向服务器发送数据。

- 发送文本

`ws.send('your message');`

- 发送Bolb 对象

```
var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);
```

- 发送 ArrayBuffer 对象

```
// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```

### webSocket.bufferedAmount

表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

eg:

```
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

### webSocket.onerror

实例对象的onerror属性，用于指定报错时的回调函数

eg:

```
socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener("error", function(event) {
  // handle error event
});
```