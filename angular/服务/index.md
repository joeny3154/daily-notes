
https://segmentfault.com/a/1190000008130871

# 命令
ng g s 路径/服务


# 定义服务

import {Injectable} from "@angular/core";
import {Http, Jsonp} from "@angular/http";
import "rxjs/add/operator/map";
@Injectable()
export class HttpServer {
  constructor(public jsonp: Jsonp, public http: Http) {

  }
 /*
  *   url: 服务器api接口地址
  *   params: 传递参数对象
  */
  // get方法
  httpGet(url, params) {
    return this.http.get(url, {search: params}).map(res=>res.json);
  }
  // post方法
  httpPost(url, params) {
    return this.http.post(url, {search: params}).map(res=>res.json);
  }
  // 跨域请求
  jsonpGet(url, params) {
    return this.jsonp.get(url, {search: params}).map(res=>res.json());
  }
}


# 导入
import {HttpServer} from "./http.server.ts";
...
providers: [HttpServer]
...

# 使用

import {URLSearchParams} from "@angular/http";
...

constructor(
  private httpService: HttpService
) { 

// 使用服务
// 设置参数
var params = new URLSearchParams();
params.set("callback", "JSONP_CALLBACK");
// 调用jsonpGet方法，跨域请求数据
httpServer.jsonpGet("http://localhost:3000/users", params).subscribe(res=> {
  console.log(res);
});

### 注意

1. 服务需要在constructor(public httpServer: HttpServer)参数中初始化, this.httpServer.httpGet()

2. 服务有两种引入方式，如果在全局引入，那么组件中还要引入文件路径，不用写，providers:[]