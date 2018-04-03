
# 格式

- 请求报文格式：请求行、请求头、请求体

请求行： 请求方法、URL、协议版本

- 响应报文格式：响应行、响应头、响应体

响应行：协议版本、状态码、状态码描述

# 请求报文头属性

- `Accept`： (A ke sai te)报文头属性告诉服务端 客户端接受什么类型的响应；`Accept:text/plain`, 客户端能够接受的响应类型仅为纯文本数据

  - `Accept-Charset`： 通知服务端可以发送的编码格式

  - `Accept-Encoding`： 通知服务端可以发送的数据压缩格式

  - `Accept-Language`： 通知服务端可以发送的语言

  - `Accept-Ranges`	可以请求网页实体的一个或者多个子范围字段	Accept-Ranges: bytes

- `Cookie`: 客户端的Cookie就是通过这个报文头属性传给服务端; eg: `Cookie: $Version=1; Skin=new;jsessionid=5F4771183629C9834F8382E23BE13C4C`

- `Referer`: 引荐人(rui fo er)，表示这个请求是从哪个URL过来的，比如在google搜索页面进入一个商家的广告，鼠标一点发送一个请求报文到商家的网站，这个请求报文的`Referer`报文头属性值就是`http://www.google.com`。网页监控软件帮你监控流量，得到全国访问客户来源的分布等情况的报表和图表，其原理就是通过这个`Referer`及其它一些HTTP报文头工作的

- `Host`： 接受请求的服务器地址，可以是IP:端口号，也可以是域名 如：`blog.csdn.net`

- `Cache-Control`: 对缓存进行控制，如一个请求希望响应返回的内容在客户端要被缓存一年，或不希望被缓存就可以通过这个报文头达到目的
如以下设置，相当于让服务端将对应请求返回的响应内容不要在客户端缓存：`Cache-Control: no-cache`

- `User-Agent`： 发送请求的应用程序名称 `User-Agent: Mozilla/5.0 (Linux; X11)`

- `Connection`： 指定与连接相关的属性，如`Connection: Keep-Alive`

- `Authorization`	HTTP授权的授权证书	`Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`

- `Date`	请求发送的日期和时间	Date: Tue, 15 Nov 2010 08:12:31 GMT

- `Content-Length`	请求的内容长度	`Content-Length: 348`

- `Content-Type`	请求的与实体对应的MIME信息	`Content-Type: application/x-www-form-urlencoded`

- `If-Match`	只有请求内容与实体相匹配才有效	If-Match: “737060cd8c284d8af7ad3082f209582d”

- `If-Modified-Since`	如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码	If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT

- `If-None-Match`	如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变	If-None-Match: “737060cd8c284d8af7ad3082f209582d”

- `If-Range`	如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag	If-Range: “737060cd8c284d8af7ad3082f209582d”

- `If-Unmodified-Since`	只在实体在指定时间之后未被修改才请求成功	If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT

- `x-client-data`: `CIW2yQEIprbJAQjEtskBCKmdygEIqKPKAQ==`

- `Max-Forwards`	限制信息通过代理和网关传送的时间	Max-Forwards: 10

- `Pragma`	用来包含实现特定的指令	Pragma: no-cache

- `Proxy-Authorization`	连接到代理的授权证书	Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

- `Range`	只请求实体的一部分，指定范围	Range: bytes=500-999

- `TE`	客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息	TE: trailers,deflate;q=0.5

- `Upgrade`	向服务器指定某种传输协议以便服务器进行转换（如果支持）	Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11

- `Via`	通知中间网关或代理服务器地址，通信协议	Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)

- `Warning`	关于消息实体的警告信息	Warn: 199 Miscellaneous warning

- `Expect`	请求的特定的服务器行为	Expect: 100-continue

- `From`	发出请求的用户的Email	From: user@email.com

# 响应报文头属性 

- `Server`: web服务器软件名称 `Server:Apache-Coyote/1.1`

- `Date`: 生成响应的日期和时间；

- `Content-Type`: `text/html; charset=UTF-8`指定了MIME类型的HTML(text/html),编码类型是UTF-8 

  - `content-encoding`: gzip;内容编码方式。内容编码方式与字符编码方式不同，字符编码方式由Content-type首部或文档内部的信息确定，指出如何将字符编码为字节。内容编码方式则指出字节如何编码为其他字节。

  - `content-language`: zh-CN

  - `content-length`: 65527; 响应体的长度(响应内容的字节数)

- `Cache-Control`：响应输出到客户端后，服务端通过该报文头属告诉客户端如何控制响应内容的缓存。

`Cache-Control: max-age=3600`是让客户端对响应内容缓存3600秒，也即在3600秒内，如果客户再次访问该资源，直接从客户端的缓存中返回内容给客户，不要再从服务端获取（当然，这个功能是靠客户端实现的，服务端只是通过这个属性提示客户端“应该这么做”，做不做，还是决定于客户端，如果是自己宣称支持HTTP的客户端，则就应该这样实现）

- `ETag`

一个代表响应服务端资源（如页面）版本的报文头属性，如果某个服务端资源发生变化了，这个ETag就会相应发生变化。它是`Cache-Control`的有益补充，可以让客户端“更智能”地处理什么时候要从服务端取资源，什么时候可以直接从缓存中返回响应。 <br>
Spring 3.0还专门为此提供了一个`org.springframework.web.filter.ShallowEtagHeaderFilter`（实现原理很简单，对JSP输出的内容MD5，这样内容有变化ETag就相应变化了），用于生成响应的ETag，因为这东东确实可以帮助减少请求和响应的交互。`ETag: "737060cd8c284d8af7ad3082f209582d" `

- `Location`: 我们在JSP中让页面Redirect到一个某个A页面中，其实是让客户端再发一个请求到A页面，这个需要Redirect到的A页面的URL，其实就是通过响应报文头的Location属性告知客户端的，如下的报文头属性，将使客户端redirect到iteye的首页中：`Location: http://www.iteye.com`

- `Set-Cookie`: 服务端可以设置客户端的Cookie，其原理就是通过这个响应报文头属性实现的：`Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1`

- `Connection`: `keep-alive`: 表示是否需要持久连接

- `Keep-Alive`: `timeout=20`

- `Expires`	响应过期的日期和时间	Expires: Thu, 01 Dec 2010 16:00:00 GMT

- `Accept-Ranges`	表明服务器是否支持指定范围请求及哪种类型的分段请求	Accept-Ranges: bytes

- `Age`	从原始服务器到代理缓存形成的估算时间（以秒计，非负）	Age: 12

- `Allow`	对某网络资源的有效的请求行为，不允许则返回405	Allow: GET, HEAD

- `Cache-Control`	告诉所有的缓存机制是否可以缓存及哪种类型	Cache-Control: no-cache

- `Content-Encoding`	web服务器支持的返回内容压缩编码类型。	Content-Encoding: gzip

- `Content-Language`	响应体的语言	Content-Language: en,zh

- `Content-Length`	响应体的长度	Content-Length: 348

- `Content-Location`	请求资源可替代的备用的另一地址	Content-Location: /index.htm

- `Content-MD5`	返回资源的MD5校验值	Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==

- `Content-Range`	在整个返回体中本部分的字节位置	Content-Range: bytes 21010-47021/47022

- `Content-Type`	返回内容的MIME类型	Content-Type: text/html; charset=utf-8

- `Date`	原始服务器消息发出的时间	Date: Tue, 15 Nov 2010 08:12:31 GMT

- `Last-Modified`	请求资源的最后修改时间	Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT

- `Location`	用来重定向接收方到非请求URL的位置来完成请求或标识新的资源	Location: http://www.zcmhi.com/archives/94.html

- `Pragma`	包括实现特定的指令，它可应用到响应链上的任何接收方	Pragma: no-cache

- `Proxy-Authenticate`	它指出认证方案和可应用到代理的该URL上的参数	Proxy-Authenticate: Basic

- `refresh`	应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）	Refresh: 5; url=http://www.zcmhi.com/archives/94.html

- `Retry-After`	如果实体暂时不可取，通知客户端在指定时间之后再次尝试	Retry-After: 120

- `Server`	web服务器软件名称	Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)

- `Set-Cookie`	设置Http Cookie	Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1

- `Trailer`	指出头域在分块传输编码的尾部存在	Trailer: Max-Forwards

- `Transfer-Encoding`	文件传输编码	Transfer-Encoding:chunked

- `Vary`	告诉下游代理是使用缓存响应还是从原始服务器请求	Vary: *

- `Via`	告知代理客户端响应是通过哪里发送的	Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)

- `Warning`	警告实体可能存在的问题	Warning: 199 Miscellaneous warning

- `WWW-Authenticate`	表明客户端请求实体应该使用的授权方案	WWW-Authenticate: Basic

https://www.nowcoder.com/questionTerminal/bd263fdaa09740399ce6425f557c731a?orderByHotValue=1&mutiTagIds=639&page=5&onlyReference=false