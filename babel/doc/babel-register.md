
babel-register
======

将自己`require` 改写了node的`require`， 在 `require` 其他模块的时候，如果模块是内置模块或者是`node_modules`内的模块，则使用node的`require`， 否则使用babel的`require`，自动编译模块。

`npm install babel-register --save-dev`

eg: node 中执行 jsx

``` js
// register.js 引入 babel-register，并配置。然后引入要执行代码的入口文件
require('babel-register')({ presets: ['react'] });
require('./test')
```

``` js
// test.js 
const React = require('react');
const elements = [1, 2, 3].map((item) => {
  return (
    <div>{item}</div>
  )
});
console.log(elements);
```

```
// 执行
$ node register.js
```

它的特点就是实时编译，不需要输出文件，执行的时候再去编译。所以它很适用于开发。常多用在 node 跑程序，做实时编译用的，通常会结合其他插件作编译器使用，比如 mocha 做测试的时候。

`babel-register` 这个包之前是在 `babel-core` 下面的，现在已从 `babel-core` 中废除。