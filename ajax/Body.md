Body
=====


不管是请求还是响应都能够包含body对象. body也可以是以下任意类型的实例.


- ArrayBuffer

- ArrayBufferView (Uint8Array and friends)

- Blob/File

- string

- URLSearchParams

- FormData

Body 类定义了以下方法 (这些方法都被 Request 和Response所实现)以获取body内容. 这些方法都会返回一个被解析后的promise对象和数据.

- arrayBuffer()

- blob()

- json()

- text()

- formData()

比起XHR来，这些方法让非文本化的数据使用起来更加简单。

请求体可以由传入body参数来进行设置:

var form = new FormData(document.getElementById('login-form'));
fetch("/login", {
  method: "POST",
  body: form
})

request 和response (也包括fetch() 方法)都会试着自动设置content type.如果没有设置Content-Type值，发送的请求也会自动设值.
