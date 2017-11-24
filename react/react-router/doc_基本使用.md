
基本使用
=====


https://reacttraining.com/react-router/web/example/basic

独立到一个模块：

eg: 

```
import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from '../containers/Home'
import About from '../containers/About'
import Topics from '../containers/Topics'

export default (props) => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
```

注意：

- 1. `<Router>`只能有一个子元素，，否则会报错，可以设置一个`<div>`包含住所有`<Route>`组件


# 子路由

只要在`<BrowserRouter/>`内部，`<Route path={`${match.url}/:topicId`} component={Topic}/>`