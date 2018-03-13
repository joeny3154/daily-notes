
babel-preset-env
=====

`babel-preset-env`的工作方法和`babel-preset-latest`（已弃用）很像，但`babel-preset-env`将基于你指定的运行环境，自动的确定babel插件及polyfills，转译ES2015及此版本以上的语言

# 配置

``` js
{
  "presets": [
    [
      "env",
      {
        "targets": { // 配支持的环境
        //  browserslist查询语法 https://github.com/ai/browserslist
        // 支持浏览器的最新的2个版本以及safari 7+
          "browsers": [ // 浏览器
            "last 2 versions",
            "safari >= 7"
          ],
          "node": "current"
        },
        "modules": true,  //设置ES6 模块转译的模块格式 默认是 commonjs，转译为常见的模块格式：amd、commonjs、systemjs、umd, 不转译：false
        "debug": true, // debug，编译的时候 console
        "useBuiltIns": false, // 是否开启自动支持 polyfill
        "include": [], // 总是启用哪些 plugins
        "exclude": []  // 强制不启用哪些 plugins，用来防止某些插件被启用
      }
    ]
  ],
  plugins: [
    "transform-react-jsx" //如果是需要支持 jsx 这个东西要单独装一下。
  ]
}
```

# useBuiltIns

env 会自动根据我们的运行环境，去判断需要什么样的 polyfill，而且，打包后的代码体积也会大大减小，但是这一切都在使用 useBuiltIns，而且需要你安装 babel-polyfill，并 import。它会启用一个插件，替换你的import 'babel-polyfill'，不是整个引入了，而是根据你配置的环境和个人需要单独的引入 polyfill。 我尝试了一下是否真的有效，下面是我的对比实验过程：

**step1**: 首先是这样一段测试编译的代码，有 jsx，Object.values，async。env 的配置除了 useBuiltIns 都跟上面的配置一样。然后通过 webpack + babel-loader 打包，生成 build.js

``` js
require('./async');
// import 'babel-polyfill';

const React = require('react');
const elements = [1, 2, 3].map((item) => {
  return (
    <div>{item}</div>
  )
});

console.log(elements);

async function a() {
  console.log('begin');
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000)
  })
  console.log('done');
}
a();

console.log(Object.values({ 1: 2 }));

console.log(Array.isArray([]));
```

**step2**: 然后通过设置不同的参数，打包，获取 build.js，并执行。得到下表

![useBuiltIns不同设置对照表](./images/babel-preset-env.jpeg)

**step3**: 然后... 我又试了一下 env 下，使用 transform-runtime。在不加 useBuiltIns，不引入 babel-polyfill 的情况下。build.js 体积234k，执行通过。

这样好像体积更小啊。别忘了，我们的 `babel-polyfill` 是配置了**执行环境**的，**通过环境看你需要哪些 polyfill**。而 **`transform-runtime`是发现我们代码需要什么 `polyfill`去引入的**，所以会少很多了。所以，又回到了[transform-runtime对比babel-polyfill](../plugins/transform-runtime对比babel-polyfill.md)。


# debug

开启debug后，编译结果会通过console.log()打印以下信息的日志：目标环境, 启用的变换, 启用的插件, 启用的polyfill，eg:

```
Using targets:
{
  "chrome": "59",
  "android": "4.4.3",
  "edge": "14",
  "firefox": "54",
  "ie": "10",
  "ios": "10",
  "safari": "7",
  "node": "4.8.4"
}

Modules transform: commonjs

Using plugins:
  check-es2015-constants {"android":"4.4.3","ie":"10","safari":"7","node":"4.8.4"}
  transform-es2015-arrow-functions {"android":"4.4.3","ie":"10","safari":"7","node":"4.8.4"}
  transform-es2015-block-scoped-functions {"android":"4.4.3","ie":"10","safari":"7"}
  transform-es2015-block-scoping {"android":"4.4.3","ie":"10","safari":"7","node":"4.8.4"}
  ...
Using polyfills:
  es6.typed.array-buffer {"android":"4.4.3","ie":"10","safari":"7","node":"4.8.4"}
  es6.typed.int8-array {"android":"4.4.3","ie":"10","safari":"7","node":"4.8.4"}
  es6.typed.uint8-array {"android":"4.4.3","ie":"10","safari":"7","node":"4.8.4"}
  es6.typed.uint8-clamped-array {"android":"4.4.3","ie":"10","safari":"7","node":"4.8.4"}
  es6.typed.int16-array {"android":"4.4.3","ie":"10","safari":"7","node":"4.8.4"}
  ...
```