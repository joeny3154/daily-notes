
同步一个 fork
=====

https://gaohaoyang.github.io/2015/04/12/Syncing-a-fork/

https://www.zhihu.com/question/28676261


fork别人仓库后，如何拉去别人仓库的更新？具体步骤：

1. 给 fork 配置一个 remote

- 主要使用 git remote -v 查看远程状态。

``` shell
git remote -v
# origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
```

- 添加一个将被同步给 fork 远程的上游仓库

``` shell
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```

如果已经存在，需要先删除：

```
$ git remote rm upstream
$ git remote add upstream https://github.com/Foo/repos.git
```

- 再次查看状态确认是否配置成功

``` shell
git remote -v
# origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
# upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
# upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
```

2. 从上游仓库 fetch 分支和提交点，传送到本地，并会被存储在一个本地分支 upstream/master 


``` shell
git fetch upstream
# remote: Counting objects: 75, done.
# remote: Compressing objects: 100% (53/53), done.
# remote: Total 62 (delta 27), reused 44 (delta 9)
# Unpacking objects: 100% (62/62), done.
# From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
#  * [new branch]      master     -> upstream/master
```

- 切换到本地主分支: `git checkout master`

- 把 upstream/master 分支合并到本地 master 上，这样就完成了同步，并且不会丢掉本地修改的内容。 `git merge upstream/master`
