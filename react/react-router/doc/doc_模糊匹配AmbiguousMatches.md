

Ambiguous Matches 模糊匹配
===============

使用`Switch`可以清除任何模糊的匹配， 而呈现第一个路由匹配

有时你想拥有一个静态路径的白名单像“/about”和“/company”，但也允许动态像“/：user”这样的模式。 问题在于“/about”是不明确的，会匹配“/about”和“/：user”。
大多数路由器都有一个算法来决定你做什么它会匹配，因为他们只允许你匹配一个“route”。
React Router 让你在多个地方匹配目的（侧边栏，面包屑等）。 

所以，当你要清除任何模糊的匹配，而不匹配“/about”改为“/：user”，只需将<Route>包装在一个<Switch>。 ***它将呈现第一个匹配***。


```
import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AmbiguousExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/about">About Us (static)</Link></li>
        <li><Link to="/company">Company (static)</Link></li>
        <li><Link to="/kim">Kim (dynamic)</Link></li>
        <li><Link to="/chris">Chris (dynamic)</Link></li>
      </ul>
      <Switch>
        <Route path="/about" render={() => <h2>About</h2>}/>
        <Route path="/company" render={() => <h2>Company</h2>}/>
        <Route path="/:user" component={User}/>
      </Switch>
    </div>
  </Router>
)
const User = ({ match }) => (
  <div>
    <h2>User: {match.params.user}</h2>
  </div>
)

export default AmbiguousExample
```