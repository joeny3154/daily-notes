

babel 知识梳理
====

- 拆分成几个核心包，`babel-core`,`babel-node`,`babel-cli`...

- 没有了默认的转换，现在你需要手动的添加 `plugin`。也就是插件化

- 添加了 `preset`，也就是预置条件。

- 增加了`.babelrc` 文件，方便自定义的配置。

### [babel-core](./babel-cli.md)

### [babel-core](./babel-cli.md)

### [babel-external-helpers](./babel-external-helpers.md)

### [babel-node](./babel-node.md)

### [babel-register](./babel-register.md)

### [babel-runtime](./babel-runtime.md)

### [babel-polyfill](./babel-polyfill.md)

### plugins

提起 `plugins` 需要 babel 编译的过程。babel 编译分为三步：

`parser`：通过 babylon 解析成 AST。

`transform[s]`：All the plugins/presets ，进一步的做语法等自定义的转译，仍然是 AST。

`generator`： 最后通过 babel-generator 生成 output string。

所以 plugins 是在第二步加强转译的，所以假如我们自己写个 plugin，应该就是对 ast 结构做一个遍历，操作。

### [babel-plugin-transform-runtime](./plugins/babel-plugin-transform-runtime.md)

### [transform-runtime vs babel-polyfill](./plugins/transform-runtime对比babel-polyfill.md)

### presets

各种配置 plugin 实在是费劲，es6+ 编译要加入好多 plugins，
比如为了在 node 中使用 esmodule，要把 esmodule 转化成 commomjs，使用 transform-es2015-modules-commonjs，
还有 asyncToGenerator，React jsx转化等等，不仅要装好多，还要配好多。

`presets` 其实是一组`plugins`，你也可以理解为是套餐... 主要有

- env

- es2015

- react

- lastet

- stage-x 具体的语法属于哪个 stage 可参照tc39

大部分的 presets 我觉得都不需要介绍了，官网上写的比较详细。而且 babel-preset-lastet 已经废弃，被 babel-preset-env 代替。

``` json
{ "presets": ["latest"] } === { "presets": ["env"] }
```
### [babel-preset-env](./presets/babel-preset-env.md)

### [参考链接](./参考链接.md)