
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码

为了解决这个问题，我们使用一种叫做 **Polyfill（代码填充，也可译作兼容性补丁**） 的技术。 简单地说，polyfill 即是在当前运行环境中用来复制（意指模拟性的复制，而不是拷贝）尚不存在的原生 api 的代码。 能让你提前使用还不可用的 APIs，Array.from 就是一个例子。


Babel 用了优秀的 `core-js` 用作 polyfill，并且还有定制化的 `regenerator` 来让 generators（生成器）和 async functions（异步函数）正常工作。


要使用 Babel polyfill，首先用 npm 安装它：

$ npm install --save babel-polyfill

然后只需要在脚本头部，加入如下一行代码。顶部导入 polyfill 就可以了：

import "babel-polyfill";

import 'babel-polyfill';
// 或者
require('babel-polyfill');