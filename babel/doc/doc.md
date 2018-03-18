

babel 知识梳理
====

- 拆分成几个核心包，`babel-core`,`babel-node`,`babel-cli`...

- 没有了默认的转换，现在你需要手动的添加 `plugin`。也就是插件化

- 添加了 `preset`，也就是预置条件。

- 增加了`.babelrc` 文件，方便自定义的配置。

### [babel-core](./babel-core.md)

### [babel-cli](./babel-cli.md)

### [babel-external-helpers](./babel-external-helpers.md)

### [babel-node](./babel-node.md)

### [babel-register](./babel-register.md)

### [babel-runtime](./babel-runtime.md)

### [babel-polyfill](./babel-polyfill.md)

### plugins

babel 编译分为三步：

`parser`：通过 babylon 解析成 AST。

`transform[s]`：All the plugins/presets ，进一步的做语法等自定义的转译，仍然是 AST。

`generator`： 最后通过 babel-generator 生成 output string。

所以 plugins 是在第二步加强转译的。

### [babel-plugin-transform-runtime](./plugins/babel-plugin-transform-runtime.md)~

### [transform-runtime vs babel-polyfill](./plugins/transform-runtime对比babel-polyfill.md)

### presets

`presets` 其实是一组`plugins`，你也可以理解为是套餐... 主要有

- env

- es2015

- react

- lastet

- stage-x

### [babel-preset-env](./presets/babel-preset-env.md)

### [参考链接](./参考链接.md)