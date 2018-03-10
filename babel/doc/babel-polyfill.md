
babel-polyfill
=====

`npm install babel-polyfill --save`

`babel-polyfill` 是为了模拟一个完整的ES2015 +环境，旨在用于应用程序而不是库/工具。

也就是说，它会让我们程序的执行环境，模拟成完美支持 es6+ 的环境，毕竟无论是浏览器环境还是 node 环境对 es6+ 的支持都不一样。它是以重载全局变量 （E.g: Promise）,还有原型和类上的静态方法（E.g：Array.prototype.reduce/Array.form），从而达到对 es6+ 的支持。不同于 babel-runtime 的是，babel-polyfill 是一次性引入你的项目中的，就像是 React 包一样，同项目代码一起编译到生产环境。

# 使用

结合 babel-register 去使用一下

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