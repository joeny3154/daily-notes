


zepto: http://www.css88.com/doc/zeptojs_api/#$.ajax

jquery: www.css88.com/jqapi-1.9/jQuery.ajax/

`error`： 要求为Function类型的参数，请求失败时被调用的函数。

该函数有3个参数，即 XMLHttpRequest对象、错误信息、捕获的错误对象(可选)。

ajax事件函数如下： function(XMLHttpRequest, textStatus, errorThrown){}

请求失败时调用此函数。

**参数**

有以下三个参数：

1. jqXHR对象(在 jQuery 1.4.x前为XMLHttpRequest)、
2. 描述发生错误类型的一个字符串
3. 捕获的异常对象。

如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能是"timeout", "error", "abort" ，和 "parsererror"。 

当一个HTTP错误发生时，errorThrown 接收HTTP状态的文本部分，比如： "Not Found"（没有找到） 或者 "Internal Server Error."（服务器内部错误）。 从jQuery 1.5开始, 在error设置可以接受函数组成的数组。每个函数将被依次调用。 注意：此处理程序在跨域脚本和JSONP形式的请求时不被调用。这是一个 Ajax Event。