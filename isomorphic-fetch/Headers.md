Headers
=====

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch


使用 Headers 的接口，你可以通过 Headers() 构造函数来创建一个你自己的 headers 对象。一个 headers 对象是一个简单的多名值对：


var content = "Hello World";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

也可以传一个多维数组或者对象字面量：

myHeaders = new Headers({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "ProcessThisImmediately",
});


它的内容可以被获取:

```
console.log(myHeaders.has("Content-Type")); // true
console.log(myHeaders.has("Set-Cookie")); // false
myHeaders.set("Content-Type", "text/html");
myHeaders.append("X-Custom-Header", "AnotherValue");
 
console.log(myHeaders.get("Content-Length")); // 11
console.log(myHeaders.getAll("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]
 
myHeaders.delete("X-Custom-Header");
console.log(myHeaders.getAll("X-Custom-Header")); // [ ]
```


虽然一些操作只能在 ServiceWorkers 中使用，但是它提供了更方便的操作 Headers 的 API。

如果使用了一个不合法的HTTP Header属性名，那么Headers的方法通常都抛出 TypeError 异常。如果不小心写入了一个不可写的属性，也会抛出一个 TypeError 异常。

除此以外的情况，***失败了并不抛出异常***。例如:

eg:

```
var myResponse = Response.error();// 失败
try {
  myResponse.headers.set("Origin", "http://mybank.com");
} catch(e) {
  console.log("Cannot pretend to be a bank!");
}
```


最佳实践是在使用之前检查 content type 是否正确，比如：

eg:

```
fetch(myRequest).then(function(response) {
  if(response.headers.get("content-type") === "application/json") {
    return response.json().then(function(json) {
      // process your JSON further
    });
  } else {
    console.log("Oops, we haven't got JSON!");
  }
});
```