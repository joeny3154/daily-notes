

Axios中文说明

https://www.kancloud.cn/yunye/axios/234845


# api

axios(config)

# 配置的默认值 defaults

``` js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

# 拦截器 interceptors

``` js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

**移除拦截器**

``` js
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

# 错误处理


# 取消


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


``` js
function createCancelToken () {
  const CancelToken = axios.CancelToken
  return CancelToken.source()
}
const source = createCancelToken()

request.getDbHistoryDetail({ actionSid: sid }, { cancelToken: source.token }).then(({ data }) => {}）

this.cancelDetail = source
this.cancelDetail.cancel('Operation canceled by the user.');
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