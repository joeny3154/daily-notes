
transform-runtime vs babel-polyfill
======

`babel-runtime` 和 `babel-plugin-transform-runtime` 一般都是一起使用，下面统称为 `transform-runtime`

- `babel-polyfill` 
原理：通过向全局对象和内置对象的prototype上添加方法来达成目的。这意味着你一旦引入babel-polyfill，像Map，Array.prototype.find这些就已经存在了——全局空间被污染。

优点：

1. 提供了实例方法

缺点：

1. 污染原生的一些方法，polyfill 把原生的方法重写了

2. 一次性引入会大大增加体积。你只是用几个特性的话需要按需引用，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，可以直接引入

适用场景：库/工具

- `transform-runtime` 

原理：babel-runtime是一个模块，你可以把它作为依赖来达成ES2015的支持。利用 plugin 自动识别并引入

优点：

1. 需要哪个就引入哪个 polyfill，如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。

2. transform-runtime 不会污染原生的对象、方法，也不会对其他 polyfill 产生影响。

缺点：

1. 实例方法不能正常工作

适用场景：应用程序
