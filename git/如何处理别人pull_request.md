Github如何处理别人提交的pull requests
=====

**如果检测到可以直接合并：**

GitHub如果检测到Pull Request中包含的提交可以直接合并，会显示自动合并的提示信息。点击“Confirm Merge”按钮即可

**如果存在合并冲突**

1. 创建分支并切换到该分支，如xxx-master

git checkout -b xxx-master master

2. 拉取xxx的远端代码

git pull git://github.com/xxx/xxx.git master

3. 处理冲突

git status 查看装填

git diff 查看冲突

4. 提交到本地仓库，非远程

git add .
git commit -m "merge: 合并xxx的pull request"

5. merge到master

 git checkout master
 git merge xxx-master

6. 提交到远程

git push

此时，github的pull requests自动变为0