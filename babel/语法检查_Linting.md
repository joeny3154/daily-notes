语法检查（Linting）
============

ESLint 是最流行的语法检查工具之一，因此我们维护了一个官方的 babel-eslint 整合软件包。

首先安装 eslint 和 babel-eslint。.

$ npm install --save-dev eslint babel-eslint

然后创建或使用项目现有的 .eslintrc 文件并设置 parser 为 babel-eslint。.

  {
+   "parser": "babel-eslint",
    "rules": {
      ...
    }
  }
现在添加一个 lint 任务到 npm 的 package.json 脚本中：

  {
    "name": "my-module",
    "scripts": {
+     "lint": "eslint my-files.js"
    },
    "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
    }
  }
接着只需要运行这个任务就一切就绪了。

$ npm run lint
详细信息请咨询 babel-eslint 或者 eslint 的文档。