CommonJS规范
=====


http://javascript.ruanyifeng.com/nodejs/module.html

# module 对象

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。
加载某个模块，其实是加载该模块的module.exports属性。

1. `module.exports` 属性

2. `exports` 变量


# require 命令

require方法用于加载模块。

