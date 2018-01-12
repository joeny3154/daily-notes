
# 

`__dirname`: 

当前模块的文件夹名称，等同于 __filename 的 path.dirname() 的值。

console.log(__dirname)
console.log(path.driname(__filename))

`__filename`:

当前模块的文件名称---解析后的绝对路径

console.log(__filename);
// Prints: /Users/mjr/example.js

# 测试

目录结构：

```
app/
|-> lib/
    |-> common.js
    |-> model/
        |-> task.js
        |-> test.js
```

task.js

``` js
var path = require('path');
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
```

```
<!-- model 目录执行 node task.js  输出 -->
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model/task.js
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model
```

```
<!-- app 目录执行 node app/model/task.js  输出 -->
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model
/Users/wanjun/Desktop/markdown/nodeJs/example/app/model/task.js
/Users/wanjun/Desktop/markdown/nodeJs/example/app
/Users/wanjun/Desktop/markdown/nodeJs/example/app
```