var path = require('path');
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));

/*
model 目录执行 node task.js  输出
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model/task.js
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model
*/


/*
app 目录执行 node app/model/task.js  输出
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model/task.js
/Users/wanjun/Desktop/markdown/nodeJs/example/app
/Users/wanjun/Desktop/markdown/nodeJs/example/app
*/