stage-2
========

- syntax-trailing-function-commas

这个插件可以支持函数的最后一个参数后面允许加逗号，代码如下：

- transform-object-reset-spread

这个插件支持解释扩展运算符，代码如下

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }