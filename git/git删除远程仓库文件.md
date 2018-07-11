git删除远程仓库文件
====

https://www.jianshu.com/p/de75a9e3d1e1

预览将要删除的文件

git rm -r -n --cached 文件/文件夹名称 

加上 -n 这个参数，执行命令时，是不会删除任何文件，而是展示此命令要删除的文件列表预览。
确定无误后删除文件

git rm -r --cached 文件/文件夹名称
提交到本地并推送到远程服务器

git commit -m "提交说明"
git push origin master
修改本地 .gitignore 文件 并提交

  git commit -m "提交说明"
  git push origin master

作者：醒着的码者
链接：https://www.jianshu.com/p/de75a9e3d1e1
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。