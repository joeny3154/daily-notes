babel-core
=====

babel-core 是对**语法**进行 transform 

可以看做 babel 的编译器。babel 的核心 api 都在这里面，比如 `transform`，主要都是处理转码的。
它会把我们的 js 代码，抽象成 `ast`，即 `abstract syntax tree` 的缩写，是源代码的抽象语法结构的树状表现形式。
我们可以理解为，它定义的一种分析 js 语法的树状结构。也就是说 es6 的新语法，跟老语法是不一样的，那我们怎么去定义这个语法呢。所以必须要先转成 ast，去发现这个语法的 kind，分别做对应的处理，才能转化成 es5.

# 主要 api：

``` js
var babel = require('babel-core');
var transform = babel.transform;
```

- `babel.transform(code: string, options?: Object)`

``` js
var babel = require('babel-core');
var result = babel.transform("var [a, b] = [1, 2]", {}) 
console.log('result', result) // {code: 'var [a, b] = [1, 2];', map: {...}, ast: {...}, ...}
```

- `babel.transformFile(filename: string, options?: Object, callback: Function)`

``` js
var path = require('path');
var babel = require('babel-core');

var result = babel.transformFile(path.resolve(__dirname) + "/test.js", {
  // presets: ['env'],
  // plugins: ['transform-runtime'],
}, function(err, result) {// { code, map, ast }
    console.log(result);
});
```
- `babel.transformFileSync(filename: string, options?: Object)`

同步方法。eg:

``` js
var result = babel.transformFileSync(path.resolve(__dirname) + "/test.js", {
  presets: ['env'],
  plugins: ['transform-runtime'],
});
console.log(result, 'res');
```

- `babel.transformFromAst(ast: Object, code?: string, options?: Object)`

ast 传入，解析为 code 代码。

# [options](https://github.com/babel/babel/tree/master/packages/babel-core)

