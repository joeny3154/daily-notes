
- 请求取消

``` js
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  // something
});
// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');

```

- 请求拦截

比如：发送登录请求，接收请求前加一个单独的loading动画

``` js
axios.interceptors.request.use(function (config) {
  // 开启 loading
  startLoading()
  return config
});

axios.interceptors.response.use(function (response) {
  // 关闭 loading
  endLoading()
  return response
})
```