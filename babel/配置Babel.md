

你可以通过安装**插件（plugins）或预设（presets，也就是一组插件）**来指示 Babel 去做什么事情。


### 创建一个配置文件

在项目的根路径下创建 .babelrc 文件


{
  "presets": [],
  "plugins": []
}


- babel-preset-es2015

$ npm install --save-dev babel-preset-es2015

- babel-preset-react

设置 React

$ npm install --save-dev babel-preset-react

{
    "presets": [
      "es2015",
+     "react"
    ],
    "plugins": []
}

- babel-preset-stage-x

以上每种预设都依赖于紧随的后期阶段预设。例如，babel-preset-stage-1 依赖 babel-preset-stage-2，后者又依赖 babel-preset-stage-3。


**安装你想要的阶段**

$ npm install --save-dev babel-preset-stage-2

{
    "presets": [
      "es2015",
      "react",
+     "stage-2"
    ],
    "plugins": []
  }


Babel 几乎可以编译所有时新的 JavaScript 语法，但对于 APIs 来说却并非如此