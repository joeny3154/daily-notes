vue-cli相关知识梳理

## 一、`webpack`与`webpack-dev-server`

在了解`vue-cli`之前，首先先简单了解一下`webpack`与`webpack-dev-server`;

### 1.`webpack`

javascript模块系统中有遵循多种规范的模块，像最原始的一个js文件一个模块，commonJS模块，AMD模块...还有现在比较新的ES6 模块，这么多风格的模块系统解决模块的定义、依赖和导出各不一样，而需要使用对应的模块所需要的实现方式也不一样，比如commonJS是同步模块，需要环境中提供require方法，exports 或 module.exports对象才能够正常使用，像nodeJS环境；而AMD模块用define方法指定依赖的模块，使用require方法引用模块，需要正常使用遵循AMD规范的模块就需要使用比如RequireJS去加载.....最头疼的问题是，不同规范的js模块不能完全兼容，比如我用RequireJS能正常使用遵循AMD规范的js模块，如果有一个模块是另一个规范写的，就很可能使用不了！而webpack很好的解决了这个问题，还顺带把CSS、图片、字体等资源编译成js模块一起当做模块处理了！

简单来理解就是：不管你的js模块遵循的什么规范，而你只要用了webpack，这些模块就通通能用。

### 2.`webpack-dev-server`

webpack 最开始是js模块的打包和编译功能,而 webpack-dev-server 是协助开发的，是有node.js Express实现的一个简单的资源服务器；使用它可以监听到资源文件变动并拿到webpack编译好的资源文件，通过webpack-dev-middleware实现资源更新,刷新页面的功能。


**小插曲**：`middleware(中间件)`与`webpack-dev-middleware`

`middleware(中间件)`：先了解node.js中间件（middleware）的概念，简单说，中间件就是处理HTTP请求的**函数**。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。
后续vue-cli会看到很多中间件，后面再解释！

`webpack-dev-middleware`也是一个中间件。如果我们没有使用`webpack-dev-server`，只使用webppack的话，那么在命令行输入`webpack`命令也可以实现手动编译，或者使用`wbpack --watch`命令还可以监听文件变动自动编译，但是这种方式是直接将编译后的结果形成文件写进了磁盘，等待编译完成，手动刷新浏览器获取最新的编译好的资源文件，但编译需要时间，我们需要观察是否已经编译成功，然后再去手动刷新浏览器页面去看最新的结果；而使用`webpack-dev-server`就不需要那么做，`webpack-dev-server`中使用了`webpack-dev-middleware`这个中间件，它能是将编译结果（bundle）放到了内存中！一旦原始文件发生变动，就会马上停止再向内存中提供旧的bundle资源，而会延迟请求的回应直到编译完成，编译完成后自动刷新浏览器，不再需要去观察是否已经编译完成和手动刷新浏览器！

------------------------ 忙成狗，先挖坑，慢慢填-------------------------

## 二、`vue-cli`简介：

## 三、`vue-cli`中`webpack`配置详解

**首先需要思考的问题？**

- 什么是生产环境，什么是开发环境？

### 1.`/build/webpack.base.conf.js`详解

### 2.`/build/webpack.dev.conf.js`详解

### 2.`/build/webpack.prod.conf.js`详解


## 四、`vue-cli`中`/build/dev-server.js`详解

**需要思考的问题？**

- 使用vue-cli搭建的资源服务器比单纯使用webpack + webpack-dev-server新增了哪些功能？

### 1.`/build/dev-server.js`中`compiler` 与 `compilation`是什么，有什么用？

### 2.`/build/dev-server.js`中`webpack-dev-middleware`是什么，有什么用？

### 3.`/build/dev-server.js`中`webpack-hot-middleware`是什么，有什么用？

### 4.`/build/dev-server.js`中`http-proxy-middleware`是什么，有什么用？


------ 表达有误的地方希望能留言指出，帮我进步 ---------------

-----------------------未完待续--------------------------------