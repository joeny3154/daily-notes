CommonJS规范
=====

http://javascript.ruanyifeng.com/nodejs/module.html


# 实例

```
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX

var example = require('./example.js');
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

# module 对象

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。
加载某个模块，其实是加载该模块的module.exports属性。

1. `module.exports` 属性

2. `exports` 变量

Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

var exports = module.exports;

**注意：**

1. 不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。
`exports = function(x) {console.log(x)};`
上面这样的写法是无效的，因为exports不再指向module.exports了

2. 下面的写法也是错误的

下面代码中，hello函数是无法对外输出的，因为module.exports被重新赋值了

exports.hello = function() {
  return 'hello';
};
module.exports = 'Hello world';


3. 如果一个模块的对外接口，就是一个单一的值，不能使用exports输出，只能使用module.exports输出。



# CommonJS模块的特点如下。

- 所有代码都运行在模块作用域，不会污染全局作用域。

- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

- 模块加载的顺序，按照其在代码中出现的顺序。


# require 命令

require方法用于加载模块。

