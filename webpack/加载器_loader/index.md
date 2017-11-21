加载器
======

http://www.css88.com/doc/webpack2/loaders/

webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。

loader 通过在 require() 语句中使用 loadername! 前缀来激活，或者通过 webpack 配置中的正则表达式来自动应用 - [查看配置](http://www.css88.com/doc/webpack2/concepts/loaders#configuration)。


# 常用加载器

### Files 类

- `raw-loader` 加载文件原始内容（utf-8）[详见](http://www.css88.com/doc/webpack2/loaders/raw-loader)

- `val-loader` 将代码作为模块执行，并将 exports 转为 JS 代码 [详见](http://www.css88.com/doc/webpack2/loaders/val-loader)

- `url-loader` 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL [详见](http://www.css88.com/doc/webpack2/loaders/url-loader)

- `file-loader` 将文件发送到输出文件夹，并返回（相对）URL [详见](http://www.css88.com/doc/webpack2/loaders/file-loader)

### JSON 类

- `json-loader` 加载 JSON 文件（默认包含）

- `json5-loader` 加载和转译 JSON 5 文件

- `cson-loader` 加载和转译 CSON 文件


### 转换编译

- `script-loader` 在全局上下文中执行一次 JavaScript 文件（如在 script 标签），不需要解析

- `babel-loader` 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5

- `traceur-loader` 加载 ES2015+ 代码，然后使用 Traceur 转译为 ES5

- `typescript-loader` 像 JavaScript 一样加载 TypeScript

- `coffee-loader` 像 JavaScript 一样加载 CoffeeScript


### 模板

- `html-loader` 导出 HTML 为字符串，需要引用静态资源

- `pug-loader` 加载 Pug 模板并返回一个函数

- `jade-loader` 加载 Jade 模板并返回一个函数

- `markdown-loader` 将 Markdown 转译为 HTML

- `posthtml-loader` 使用 PostHTML 加载并转换 HTML 文件

- `handlebars-loader` 将 Handlebars 转移为 HTML


### 样式

- `style-loader` 将模块的导出作为样式添加到 DOM 中

- `css-loader` 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码

- `less-loader` 加载和转译 LESS 文件

- `sass-loader` 加载和转译 SASS/SCSS 文件

- `stylus-loader` 加载和转译 Stylus 文件

- `postcss-loader` 使用 PostCSS 加载和转译 CSS/SSS 文件


### 清洁(lint)和测试(test)


- `mocha-loader` 使用 mocha 测试（浏览器/NodeJS）

- `eslint-loader` PreLoader，使用 ESLint 清理代码

- `jshint-loader` PreLoader，使用 JSHint 清理代码

- `jscs-loader` PreLoader，使用 JSCS 检查代码样式

- `coverjs-loader` PreLoader，使用 CoverJS 确定测试覆

### 框架

- `vue-loader` 加载和转译 Vue 组件

- `polymer-loader` 使用选择预处理器(preprocessor)处理，并且 require() 类似一等模块(first-class)的 Web 组件

- `angular2-template-loader` 加载和转译 Angular 组件