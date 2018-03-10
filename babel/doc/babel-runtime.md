babel-runtime
=====

`npm install babel-runtime --save`

这个包很简单，就是引用了 `core-js` 和 `regenerator`，然后生产环境把它们编译到 `dist` 目录下，做了映射，供使用。

那么什么是 `core-js` 和 `regenerator` 呢。
首先我们要知道上面提到的 `babel-core` 是对**语法**进行 `transform` 的，但是它不支持 `build-ints`（Eg: promise，Set，Map），prototype function（Eg: array.reduce, string.trim），class static function （Eg：Array.form，Object.assgin），regenerator （Eg：generator，async）等等拓展的编译。

所以才要用到 `core-js` 和 `regenerator`。


# core-js

几乎包含了所有 JavaScript 最新标准 polyfill

core-js 是用于 JavaScript 的组合式标准化库，它包含 es5 （e.g: object.freeze）, es6的 promise，symbols, collections, iterators, typed arrays， es7+提案等等的 polyfills 实现。也就是说，它几乎包含了所有 JavaScript 最新标准的垫片(polyfill)。不过为什么它不把 generator 也实现了... 😁

``` js
// 比如，只不过需要单个引用
require('core-js/array/reduce');
require('core-js/object/values');
```

# `regenerator`

它是来自于 facebook 的一个库, 主要就是实现了 `generator/yeild`， `async/await`。

所以 `babel-runtime` 是单纯的实现了 core-js 和 regenerator 引入和导出，比如这里是 filter 函数的定义，做了一个中转并处理了 esModule 的兼容。

``` js
module.exports = { "default": require("core-js/library/fn/array/filter"), __esModule: true };
```
# helpers

还记得提 `babel-external-helpers` 的时候，介绍 `helpers` 了吗。`babel-runtime` 里面的 `helpers` 就相当于我们上面通过 `babel-external-helpers` 生成的 `helpers.js`(babel transform 时候需要使用的帮助函数，如`toArray`函数， jsx转化函数)。只不过它把每个 `helper` 都单独放到一个文件夹里。

```
- babel-runtime
  |- core-js/
  |- helpers/
  |- regenerator/
```

这样，配合 `transform-runtime` 使用的时候，需要用 `helper` 转化的时候，就从 `babel-runtime` 中直接引用了。

``` js
var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
```

可以单独引入, eg: `require('babel-runtime/core-js/object/values');`

不过这些模块都做了 esModule 的兼容处理，也就是上面引入的模块是`{ "default": require("core-js/library/fn/array/filter"), __esModule: true }`这样的，要使用还得加上 `.default`。所以我们期待的是，最好能有帮我们自动处理的插件，`babel-plugin-transform-runtime`就是用来做这个的。这个我们放到 plugin 去讲。