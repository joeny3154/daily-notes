

全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。


函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined