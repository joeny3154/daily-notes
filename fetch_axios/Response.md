
Response 对象
==========

如上述, Response 实例是在fetch()处理完promises之后返回的.

它的实例也可用通过JavaScript来创建, 但只有在ServiceWorkers中才真正有用,当使用respondWith()方法并提供了一个自定义的response来接受request时:

var myBody = new Blob();

addEventListener('fetch', function(event) {
  event.respondWith(new Response(myBody, {
    headers: { "Content-Type" : "text/plain" }
  });
});


Response() 构造方法接受两个可选参数—response的数据体和一个初始化对象(与`Request()`所接受的init参数类似.)


你会用到的最常见的response属性有:

- `Response.status` — 整数(默认值为200) 为response的状态码.
- `Response.statusText` — 字符串(默认值为"OK"),该值与HTTP状态码消息对应.
- `Response.ok` — 如上所示, 该属性是来检查response的状态是否在200-299(包括200,299)这个范围内.该属性返回一个Boolean值.


注意: 静态方法error()只是返回了一个错误的response. 与此类似地, redirect() 只是返回了一个可以重定向至某URL的response. 这些也只与Service Workers才有关.