
babel-polyfill
=====

使用它之后意味着你可以使用 `built-ins` (eg: Promise、WeakMap), 静态方法（eg: Array.from、Object.assign), 实例方法（eg: Array.prototype.includes), 和 generator functions。

# 使用

`npm install babel-polyfill --save`

因为这是一个polyfill（它会在源代码之前运行），所以我们需要它是一个`dependency`，而不是一个`devDependency`

`babel-polyfill` 是为了模拟一个完整的ES2015 +环境，意图是用于应用程序，而不是库(library)/工具(tool)。


eg: 结合 babel-register

``` js
// index.js
require('babel-core/register')({});
require('babel-polyfill'); // 是的，你要手动引入。
require('./async');
```

``` js
// async.js
async function a() {
  console.log('begin');
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000)
  })
  console.log('done');
}
a();
```

```
$ node index.js
```

注意：`babel-polyfill` 只是为当前环境全局下注入垫片，ES6 语法（E.g: arrow func，esModules）还是要加入 `plugins` 去 transform 的


# 在Node / Browserify / Webpack中的用法

要包含polyfill，您需要将它填入应用程序入口点的顶部， 确保在所有其他代码/需要语句之前调用它。

使用`webpack.config.js`时，添加`babel-polyfill`到`entry`数组中：

``` js
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

# 浏览器中的使用

可从npm版本的`dist/polyfill.js`文件中获得`babel-polyfill`。这需要包含在所有编译的Babel代码之前。您可以将其预先加入到您的编译代码中，或者将其包含在<script>之前的代码中。

如果你用于工具/库(tool/library), 并且不会修改全局变量, 请选择`transform-runtime`插件。但你将无法使用上面提到的实例方法, 如`Array.prototype.includes`。