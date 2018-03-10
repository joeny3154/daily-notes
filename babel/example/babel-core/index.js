var path = require('path');
var babel = require('babel-core');

var result = babel.transformFile(path.resolve(__dirname) + "/transform.js", {
  // presets: ['env'],
  // plugins: ['transform-runtime'],
}, function(err, result) {// { code, map, ast }
    console.log(result);
});