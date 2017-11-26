

<Redirect>
=========

渲染一个<Redirect>将导航到一个新的位置。新位置将覆盖历史堆栈中的当前位置,例如服务器端重定向（HTTP 3xx）

eg:
```
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

- `to`: string

要重定向到的URL

<Redirect to="/somewhere/else"/>

- `to`: object

要重定向到的位置。

<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>


- `push`: bool

当为true时，重定向会将新条目推向历史，而不是替换当前的条目

<Redirect push to="/somewhere/else"/>

- `from`: string

要从中重定向的路径名。这只能用于匹配一个位置渲染<Redirect>内部的一个位置<Switch>。看到<Switch children>更多的细节

```
<Switch>
  <Redirect from='/old-path' to='/new-path'/>
  <Route path='/new-path' component={Place}/>
</Switch>
```