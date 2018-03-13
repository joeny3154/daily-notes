babel-external-helpers
=======

`babel-cli` 中的一个`command`(命令)，用来生成一段代码，包含 babel 所有的 helper 函数。

# 什么是 helpers?

Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数，例如: `{ [name]: 'JavaScript' }` 转译后的代码如下所示：

``` js
'use strict';
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var obj = _defineProperty({}, 'name', 'JavaScript');
```

类似上面的`_defineProperty`就是一个帮助函数, `_defineProperty` 可能会重复出现在一些模块里，会导致每一个模块都定义一份, 导致编译后的代码体积变大。

所以 babel 提供了这个命令，用于生成一个包含了所有 helpers 的 js 文件，用于直接引用。然后再通过一个 `plugin`去检测是否存在这个模块，存在就不需要重新定义了。

# 使用：

1. 执行 babel-external-helpers 生成 helpers.js 文件

`node_modules/.bin/babel-external-helpers > helpers.js`

注意：示例代码的包都是装到项目中的，也就是本地。同样你可以全局安装直接执行。

2. 安装 plugin

`npm install --save-dev babel-plugin-external-helpers`

3. 然后在 babel 的配置文件加入`external-helpers`插件

``` js
{
  "plugins": ["external-helpers"]
}
```

4. 入口文件引入 `helpers.js`

``` js
require('./helpers.js');
```

如此可以减少很多代码量的。

*tip*: 使用 `transform-runtime`就不需要生成 `helpers.js` 文件了，详见[babel-runtime](./babel-runtime.md)。
