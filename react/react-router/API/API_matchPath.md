

matchPath
=======

这使您可以<Route>使用除正常渲染周期外使用的相同的匹配代码，例如在服务器上呈现之前收集数据依赖关系。

eg:

```
import { matchPath } from 'react-router'

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
})
```
- pathname

第一个参数是你想要匹配的路径名。如果你在Node.js服务器上使用它，那就是了req.url。

- props

第二个参数是匹配的 props，它们与匹配的props Route接受相同：

eg:

```
{
  path, // like /users/:id
  strict, // optional, defaults to false
  exact // optional, defaults to false
}
```