使用cross-env解决跨平台设置NODE_ENV的问题
======

windows不支持NODE_ENV=development的设置方式。

# 使用方法：

安装`cross-env:npm install cross-env --save-dev`

在NODE_ENV=xxxxxxx前面添加cross-env就可以了。

eg: `"build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.conf.js --progress --hide-modules",`