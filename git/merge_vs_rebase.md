
https://www.jianshu.com/p/f23f72251abc



# marge

```
git checkout feature
git merge master
```

marge 特点：自动创建一个新的commit

优点：记录了真实的commit情况，包括每个分支的详情
缺点：因为每次merge会自动产生一个merge commit，所以在使用一些git 的GUI tools，特别是commit比较频繁时，看到分支很杂乱。

**合并时冲突解决方案**

修改后重新commit

# rebase

```
git checkout feature
git rebase master
```

rebase 特点：会合并之前的commit历史
优点：得到更简洁的项目历史，去掉了merge commit
缺点：如果合并出现代码问题不容易定位，因为re-write了history

**合并时冲突解决方案**

修改冲突部分

git add

git rebase --continue

（如果第三步无效可以执行  git rebase --skip）