预读取 DNS
===
``` html
<meta http-equiv="x-dns-prefetch-control" content="on" />
<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
```

`X-DNS-Prefetch-Control` 头控制着浏览器的 DNS 预读取功能。 DNS 预读取是一项使浏览器主动去执行域名解析的功能，其范围包括文档的所有链接，无论是图片的，CSS 的，还是 JavaScript 等其他用户能够点击的 URL。

因为预读取会在后台执行，所以 DNS 很可能在链接对应的东西出现之前就已经解析完毕。这能够减少用户点击链接时的延迟。

### 语法

X-DNS-Prefetch-Control: on 
X-DNS-Prefetch-Control: off

### 参数

on
启用 DNS 预解析。在浏览器支持 DNS 预解析的特性时即使不使用该标签浏览器依然会进行预解析。
off
关闭 DNS 预解析。这个属性在页面上的链接并不是由你控制的或是你根本不想向这些域名引导数据时是非常有用的。

### 示例

1. 打开和关闭 DNS 预读取

你可以通过在服务器端发送 X-DNS-Prefetch-Control 报头，或是在文档中使用值为 http-equiv 的 <meta> 标签：

<meta http-equiv="x-dns-prefetch-control" content="off">

您可以通过将 content 的参数设置为“on”来改变设置。

2. 强制查询特定主机名

你可以通过使用 rel 属性值为 link type 中的 dns-prefetch 的 <link> 标签来对特定域名进行预读取：

`<link rel="dns-prefetch" href="http://www.spreadfirefox.com/">`

在这个例子中，Firefox将预解析域名"www.spreadfirefox.com"。

而且，<link> 元素也可以使用不完整的 URL 的主机名来标记预解析，但这些主机名前必需要有双斜线：

`<link rel="dns-prefetch" href="//www.spreadfirefox.com">`

强制对域名进行预读取在有的情况下很有用, 比如, 在网站的主页上，强制在整个网站上频繁引用的域名的预解析，即使它们不在主页本身上使用。即使主页的性能可能不受影响，这将提高整体站点性能。

https://developer.mozilla.org/zh-CN/docs/Controlling_DNS_prefetching