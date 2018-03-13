babel-runtime
=====

[babel-external-helpers](./babel-external-helpers.md)提到, Babel 转译后的代码需要借助一些helper函数, 并且可能在多个文件中重复定义而导致编译后的代码体积变大。

通过生成`helpers.js`文件，直接引用后。再通过一个 `babel-plugin-external-helpers`去检测是否存在这个模块，而避免掉这个问题。

但这样做还存在一个问题，编译过程中可能只使用到了部分`helper`函数，直接引入`helpers.js`可能导致编译后的代码存在一些没有使用到的`helper`。

而使用`transform-runtime` 和`babel-plugin-transform-runtime`可以解决上述的问题。

这节我们先了解一下`babel-runtime`

`npm install babel-runtime --save`

`babel-runtime`中包含了`core-js`、`regenerator`和`helpers`, 文件结构：

```
- babel-runtime
  |- core-js/
  |- helpers/
  |- regenerator/
```

# `core-js`

`core-js` 几乎包含了所有 JavaScript 最新标准的垫片(polyfill)。但并没有实现 `generator`

``` js
// 比如，只不过需要单个引用
require('core-js/array/reduce');
require('core-js/object/values');
```

# `regenerator`

它是来自于 facebook 的一个库, 主要是实现了 `generator/yeild`， `async/await`。

tip: `core-js` 是`babel-runtime`安装时一同安装的

``` js
module.exports = { "default": require("core-js/library/fn/array/filter"), __esModule: true };
```

# `helpers`

[babel-external-helpers](./babel-external-helpers.md)`中介绍 `helpers`，
`babel-runtime` 里面的 `helpers` 就相当于我们上面通过 `babel-external-helpers` 生成的 `helpers.js`。只不过它把每个 `helper` 都单独放到一个文件夹里。

`babel-runtime`只是单独出所有helper模块，并且为`helper`提供了垫片（`core-js`, `regenerator`），但实际运用时我们需要做到自动识别所需要helper，并在到编译后的引入它们，这样就可以做到既不重复定义，又不会引入多余的helper模块。

而这一切可以通过`babel-plugin-transform-runtime`实现：[babel-plugin-transform-runtime](./plugins/babel-plugin-transform-runtime.md)