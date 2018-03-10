
babel-register
======

`npm install babel-register --save-dev`

babel-node 可以通过它编译代码，可以了解到，它其实就是一个编译器。我们同样可以在代码中引入它 `require('babel-register')`，并通过 node 执行我们的代码。

它的原理是通过改写 node 本身的 `require`，添加钩子，然后在 `require` 其他模块的时候，就会触发 `babel` 编译。也就是你引入`require('babel-register')`的文件代码，是不会被编译的。只有通过 `require` 引入的其他代码才会。我们是不是可以理解，`babel-node` 就是在内存中写入一个临时文件，在顶部引入 `babel-register`，然后再引入我们的脚本或者代码？

举个栗子，还是 node 中执行 jsx，要通过 babel 编译。我们可以把 jsx 的代码 a.js 编译完输出到一个 b.js，然后 node b.js 也是可以执行的。但是太麻烦，不利于开发。让我们看一下通过 register 怎么用：

``` js
// register.js 引入 babel-register，并配置。然后引入要执行代码的入口文件
require('babel-register')({ presets: ['react'] });
require('./test')
```

``` js
// test.js 这个文件是 jsx...
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

它的特点就是实时编译，不需要输出文件，执行的时候再去编译。所以它很适用于开发。总结一下就是，多用在 node 跑程序，做实时编译用的，通常会结合其他插件作编译器使用，比如 mocha 做测试的时候。

值得一提的是，`babel-register` 这个包之前是在 `babel-core` 下面的，所以也可以 `require('babel-core/register')` 去引入，跟`require('babel-register')`是一样的。但是，babel 的团队把 register 独立出来了，现在已从 `babel-core` 中废除。