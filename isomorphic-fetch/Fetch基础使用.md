

# 安装

`yarn add isomorphic-fetch es6-promise`

`npm install --save isomorphic-fetch es6-promise`

# 使用

eg: 基本使用 
```
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
 
fetch('//offline-news-api.herokuapp.com/stories')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });
```

eg: 自定义请求对象

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

# Fetch API


Fetch API  提供了一个 JavaScript接口，用于访问和操纵HTTP管道的部分，例如请求和响应。它还提供了一个全局 fetch()方法，该方法提供了一种简单，合乎逻辑的方式来跨网络异步获取资源。


fetch 规范与 jQuery.ajax() 主要有两种方式的不同，牢记：

当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。
相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ）， **仅当网络故障时或请求被阻止时，才会标记为 reject**。

默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）.


# 检测是否成功

如果遇到网络故障，fetch() promise 将会 reject，带上一个 TypeError 对象。

经常遇到遇到比如权限问题或类似问题——比如 404，但这些都不是一个网络故障，promise 不会是 reject，想要精准判断 fetch() 是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是不是为 true。类似一下代码：

eg:

```
fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    response.blob().then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      myImage.src = objectURL;
    });
  } else {
    console.log('Network response was not ok.');
  }
})
.catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});
```

# request

**自定义请求(request)对象:**

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

# Headers 对象

[查看Headers](./Headers.md)

# Response 对象

[查看Response](./Response.md)

# Body

[查看Body](./Body.md)
