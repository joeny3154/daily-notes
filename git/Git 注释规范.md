
Git 注释规范
=====

新功能开发：

`git commit -m 'feat(专题模块): 提交专题模块代码'`

bugfix：
`git commit -m 'fix: 修复用户昵称搜索'`

如果有bug ID可写为：

`git commit -m 'fix(昵称模块): #1000331'`

更新文档：

`git commit -m 'docs: 更新readme'`

# 格式说明:

提交格式：<type>(<scope>): <subject>   (注意，冒号后面有空格)

包括三个字段：type（必需）、scope（可选）和subject（必需）

1. type（代表某次提交的类型说明）

  - feat：新功能（feature）

  - fix: 修复bug

  - merge: 合入代码

  - chore：构建过程或辅助工具的变动

  - docs: 修改文档，比如README, CHANGELOG, CONTRIBUTE等

  - style: 修改空格、格式缩进等，不改变代码逻辑

  - refactor：重构（即不是新增功能，也不是修改bug的代码变动）

  - perf: 优化相关，比如提升性能、体验

  - revert: 回滚到上一个版本

  - test：增加测试

2. scope（影响的范围）

  scope用括号来说明改动的模块或项目

3. subject（commit 的简短描述）

  尽量中文描述此次提交做了那些修改


# 其他要求：
 

0. 不要轻易的push，review一遍commit 之后再push（但如果已经push成功，请勿用随意修改造成commit hash改变的操作，比如 --ammend, --rebase等）

1. 不要出现无意义commit log, 包括但不限于以下例子:

git commit -am '1'
git commit -am '暂存'
git commit -am '更新代码暂时存储'
git commit -am '提测'
git commit -am 'fix'
git commit -am 'update'
git commit -am '更新'
git commit -am '优化'

2. 每个commit 粒度应该足够独立和小，不应该出现多个模块的修改合并在一起提交，在commit log里不要出现多个scope，包括但不限于以下例子:

git commit -am 'feat(share2, BucketSystem): 拆分 pdtu 前缀 policy 上报, 并编译相关页面'
git commit -am 'fix(历史记录、消息中心)：解决重复点击清空按钮，多次调用弹窗的bug'

3.  前后两条commit如果log是完全一致的，请使用ammend 进行合并, 命令为:

     git commit -a --ammend --no-edit