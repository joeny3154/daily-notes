

### babel-register


如果我们用 `node index.js` 来运行它是不会使用 `Babel` 来编译的。所以我们需要设置 `babel-register`。


$ npm install --save-dev babel-register
接着，在项目中创建 register.js 文件并添加如下代码：

require("babel-register");
require("./index.js");
这样做可以把 Babel 注册到 Node 的模块系统中并开始编译其中 require 的所有文件。

现在我们可以使用 register.js 来代替 node index.js 来运行了。

$ node register.js



### babel-node 来替代 node 运行所有的代码

{
    "scripts": {
-     "script-name": "node script.js"
+     "script-name": "babel-node script.js"
    }
}

要不然的话你需要写全 babel-node 的路径。

- node script.js
+ ./node_modules/.bin/babel-node script.js