如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块


$ npm install babel-core

var babel = require("babel-core")


var babel = require('babel-core');

- 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

- 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

- 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

- Babel AST转码
babel.transformFromAst(ast, code, options);

字符串形式的 JavaScript 代码可以直接使用 babel.transform 来编译。.

babel.transform("code();", options);
// => { code, map, ast }
如果是文件的话，可以使用异步 api：

babel.transformFile("filename.js", options, function(err, result) {
  result; // => { code, map, ast }
});
或者是同步 api：

babel.transformFileSync("filename.js", options);
// => { code, map, ast }
要是已经有一个 Babel AST（抽象语法树）了就可以直接从 AST 进行转换。

babel.transformFromAst(ast, code, options);
// => { code, map, ast }
对于上述所有方法，options 指的都是 http://babeljs.io/docs/usage/options/


