

# Ajax 是什么? 如何创建一个Ajax？

ajax的全称：Asynchronous Javascript And XML。
 异步传输+js+xml。
 所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验。

 (1)创建XMLHttpRequest对象,也就是创建一个异步调用对象
 (2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息
 (3)设置响应HTTP请求状态变化的函数
 (4)发送HTTP请求
 (5)获取异步调用返回的数据
 (6)使用JavaScript和DOM实现局部刷新

 # Ajax 解决浏览器缓存问题？

 1、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。

  2、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

  3、在URL后面加上一个随机数： "fresh=" + Math.random();。

  4、在URL后面加上时间戳："nowtime=" + new Date().getTime();。

    5、如果是使用jQuery，直接这样就可以了 $.ajaxSetup({cache:false})。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。