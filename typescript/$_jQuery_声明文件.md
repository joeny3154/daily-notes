
### 声明语句

在 TypeScript 中，我们并不知道 $ 或 jQuery 是什么东西, 会报错： index.ts(1,1): error TS2304: Cannot find name 'jQuery'

```
declare var jQuery: (string) => any;
jQuery('#foo');
```
<!-- 编译结果是： -->

```
jQuery('#foo');
```

**declare 定义的类型只会用于编译时的检查，编译结果中会被删除**


### 声明文件

**约定声明文件以 .d.ts 为后缀。**

declare var jQuery: (string) => any;

然后在使用到的文件的开头，用「三斜线指令」表示引用了声明文件

/// <reference path="./jQuery.d.ts" />

jQuery('#foo');


### 第三方声明文件

当然，jQuery 的声明文件不需要我们定义了，已经有人帮我们定义好了：[jQuery in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jquery/index.d.ts)。

我们可以直接下载下来使用，但是更推荐的是使用工具统一管理第三方库的声明文件。

社区已经有多种方式引入声明文件，不过 [TypeScript 2.0 推荐使用 @types 来管理](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)。

@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：

```
npm install @types/jquery --save-dev
```

可以在[这个页面](http://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。