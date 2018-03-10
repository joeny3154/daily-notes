babel-external-helpers
=======

babel-cli 中的一个`command`(命令)，用来生成一段代码，包含 babel 所有的 helper 函数。


# 什么是 helpers?

`babel` 有很多帮助函数，例如 toArray函数， jsx转化函数。这些函数是 `babel transform` 的时候用的，都放在 `babel-helpers`这个包中。
如果 babe 编译的时候检测到某个文件需要这些 helpers，在编译成模块的时候，会放到模块的顶部。eg:

``` js
(function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () {  }; } // 模块顶部定义 helper

// some code 
// async 语法已经被 transform-async-to-generator 转化，再利用 helper 函数包装，消费 generator。
const func = (() => {
  var _ref = _asyncToGenerator(function* () {
    console.log('begin');
    yield new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
    console.log('done');
  });
})

})
```

但是如果多个文件都需要提供，会重复引用这些 `helpers`，会导致每一个模块都定义一份，代码冗余。所以 babel 提供了这个命令，用于生成一个包含了所有 helpers 的 js 文件，用于直接引用。然后再通过一个 `plugin`，去检测全局下是否存在这个模块，存在就不需要重新定义了。

# 使用：

1. 执行 babel-external-helpers 生成 helpers.js 文件

`node_modules/.bin/babel-external-helpers > helpers.js`

注意：示例代码的包都是装到项目中的，也就是本地。同样你可以全局安装直接执行。

2. 安装 plugin

`npm install --save-dev babel-plugin-external-helpers`

3. 然后在 babel 的配置文件加入

``` js
{
  "plugins": ["external-helpers"]
}
```

4. 入口文件引入 `helpers.js`

这样就可以啦，还是可以减少很多代码量的。另外如果使用了 `transform-runtime`，就不需要生成 `helpers.js` 文件了，这个在后面的 `babel-runtime` 再说。
