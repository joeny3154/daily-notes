
https://github.com/Jisuanke/tech-exp/issues/13

http://jack-nie.github.io/git/git-merge-multi-commits.html

1. 选择目标点

git rebase --interactive HEAD~2

git rebase -i commit_id

i: interactive

2. 

pick => s

s - squash：使用该 Commit，但会被合并到前一个 Commit 当中
f - fixup：就像 squash 那样，但会抛弃这个 Commit 的 Commit message

**注意：**

最上方的那一行 pick 需要保留，否则会出现`Cannot 'squash' without a previous commit`的错误提示

:wq

出现冲突：

git add .
git rebase --continue

取消操作

git rebase --abort

3. message


