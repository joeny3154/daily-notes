
Yarn
=======

[官方文档](https://yarnpkg.com/lang/zh-hans/docs/usage/)

Yarn 对你的代码来说是一个包管理器

# 安装

- macOS

https://yarnpkg.com/zh-Hans/docs/install

# 使用
- 开始新项目
yarn init

- 添加依赖包

yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
Adding a dependency to different categories of dependencies

分别添加到 devDependencies、peerDependencies 和 optionalDependencies：

yarn add [package] --dev
yarn add [package] --peer 
yarn add [package] --optional

- 升级依赖包

yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

- 移除依赖包

yarn remove [package]

- 安装项目的全部依赖

yarn
或者

yarn install