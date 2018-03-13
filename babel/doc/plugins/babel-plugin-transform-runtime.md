
babel-plugin-transform-runtime
=====

`babel-runtime` 是为了减少重复代码而生的。 babel生成的代码，可能会用到一些`_extend()`， `classCallCheck()` 之类的helper函数，默认情况下，这些helper函数的代码会包含在编译后的文件中。如果存在多个文件，那每个文件都有可能含有一份重复的代码。
`babel-plugin-transform-runtime`能够将这些helper函数的代码转换成`require`语句，指向为对`babel-runtime`的引用，如 `require('babel-runtime/helpers/classCallCheck')`。这样`classCallCheck`的代码就不需要在每个文件中都存在了。

当然，最终你需要利用webpack之类的打包工具，将`runtime`代码打包到目标文件中。所以`babel-runtime`需要作为生产依赖（--save），`babel-plugin-transform-runtime`作为开发依赖项（--save-dev）进行安装。

# 安装

```
npm install --save-dev babel-plugin-transform-runtime
npm install --save babel-runtime
```

启用插件 `babel-plugin-transform-runtime`后,Babel 编译代码过程中需要用 `helper` 转化时就会引用`babel-runtime` 下的helper函数

babel transform 过程中需要用 `helper` 转化的时候，helper函数作为公共模块从 `babel-runtime/helpers` 中引用, 并插入到编译后文件的顶部。eg：

``` js
// 编译前
console.log(Object.values({ 1: 2 }));
```

```
node_modules/.bin/babel --plugins transform-runtime values.js
```

``` js
// 编译后
'use strict';

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

onsole.log((0, _values2.default)({ 1: 2 }));
```

# `babel-plugin-transform-runtime`配置

``` js
// 默认值
{
  "plugins": [
    ["transform-runtime", {
      "helpers": true, // 启用regenerator
      "polyfill": true, // 启用core-js 里面的 `polyfill`
      "regenerator": true,
      "moduleName": "babel-runtime" // 使用`babel-runtime`
    }]
  ]
}
```

`helpers` 设为 false，就相当于没有启用 `babel-plugin-external-helpers` 的效果，比如编译 async 的时候，用到了 asyncToGenerator 函数，每个文件还会重新定义一下。


# transform-runtime 不编译实例方法

``` js
// 编译前
const bool = 'foo'.includes('s')
const obj = Object.assign({}, { age: 30 })
// 编译后
import _Object$assign from 'babel-runtime/core-js/object/assign';
const bool = 'foo'.includes('s');
const obj = _Object$assign({}, { age: 30 });
```


tip: Babel 默认只转换新的JavaScript句法（syntax)，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

babel-runtime 适合 JavaScript **库和工具包**的实现, 原因：

1. 避免 babel 编译的`helper`函数在每个模块里重复出现，减小库和工具包的体积

2. 在没有使用 `babel-runtime` 之前，库和工具包一般不会直接引入 `polyfill`。
否则像 Promise 这样的全局对象会污染全局命名空间，这就要求库的使用者自己提供 `polyfill`。
这些 `polyfill` 一般在库和工具的使用说明中会提到，比如很多库都会有要求提供 es5 的 `polyfill`。在使用 `babel-runtime` 后，库和工具只要在 package.json 中增加依赖 `babel-runtime`，交给 `babel-runtime` 去引入 `polyfill` 就行了；



