var babel = require('babel-core');

var result = babel.transform("var [a, b] = [1, 2]", {}) // => { code, map, ast }

console.log('result', result)