

No Match （没有路径匹配）
=======

eg: 

```
const NoMatchExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/old-match">Old Match, to be redirected</Link></li>
        <li><Link to="/will-match">Will Match</Link></li>
        <li><Link to="/will-not-match">Will Not Match</Link></li>
        <li><Link to="/also/will/not/match">Also Will Not Match</Link></li>
      </ul>
      <Switch>
        <Route path="/" exact render={() => <div>Home</div>}/>
        <Redirect from="/old-match" to="/will-match"/>
        <Route path="/will-match" component={WillMatch}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
)

const WillMatch = () => <h3>Matched!</h3>

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

export default NoMatchExample
```