

custom link 自定义链接 
======

自定义link dom结构和样式等

自定义传递的props供内部的 `<Route/>` 使用，eg: ` <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home"/>`

```
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const CustomLinkExample = () => (
  <Router>
    <div>
      <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home"/>
      <OldSchoolMenuLink to="/about" label="About"/>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
)


const OldSchoolMenuLink = ({label, to, activeOnlyWhenExact}) => {
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <div className={match ? 'active' : ''}>
      {match ? '> ' : ''}<Link to={to}>{label}</Link>
    </div>
  )}/>
}


```