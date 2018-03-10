babel-node
===== 

也是 babel-cli 下面的一个 command，主要是实现了 node **执行脚本**和**命令行写代码**的能力。举两个栗子就清楚了。

1. 执行脚本


``` js
// jsx.js
const React = require('react');
const elements = [1, 2, 3].map((item) => {
  return (
    <div>{item}</div>
  )
});

console.log(elements);
```

执行 jsx.js，会报错：

``` 
node jsx.js // SyntaxError: Unexpected token <
```

`npm i --save-dev babel-node babel-preset-react`

```
node_modules/.bin/babel-node --presets react jsx.js
```

`--presets react` 是参数，等同于

``` js
{
  "presets": ["react"]
}
```
再次执行正常。


2. node 命令行写代码

使用`nvm`安装一个较低node版本, 然后切换到这个版本，比如我本地有个`v4.2.2`版本，此版本不支持变量解构赋值：不能输出变量结果，出现`....`

`npm i --save-dev babel-preset-env`

运行 `node_modules/.bin/babel-node --presets env`

![babel-node](./images/babel-node.jpeg)

通过示例基本已经介绍了 `babel-node` 的用法了，就是方便我们平常开发时候，写一些脚本的。所以它不适用于生产环境。另外，`babel-node` 已经内置了 polyfill，并依赖 `babel-register` 来编译脚本。好，那 `babel-register` 是什么呢?

# [babel-register](./babel-register.md)

