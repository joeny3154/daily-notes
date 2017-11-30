
Request 对象
======

# 自定义请求对象(request)

除了传给 fetch() 一个资源的地址，你还可以通过使用 Request() 构造函数来创建一个 request 对象，然后再作为参数传给 fetch()：


eg: 

```
var myHeaders = new Headers();

var myInit = { 
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

var myRequest = new Request('flowers.jpg', myInit);

fetch(myRequest).then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
```

Request() 和 fetch() 接受同样的参数。你甚至可以传入一个已存在的 request 对象来创造一个拷贝：`var anotherRequest = new Request(myRequest,myInit);`

这个很有用，因为 request 和 response bodies 只能被使用一次（译者注：这里的意思是因为设计成了 stream 的方式，所以它们只能被读取一次）。创建一个拷贝就可以再次使用 request/response 了，当然也可以使用不同的 init 参数。