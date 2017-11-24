

url参数
=====

# 基本

定义参数规则： `<Route path="/:id" component={Child}/>`

传递参数： 有两种方式

- <link>组件

`<Link to="/netflix">Netflix</Link>`

- js方式

# 传递参数

***传递多个参数： ***

eg: 
```
<Route location={location} key={location.key} path="/:h/:s/:l" component={HSL} />

<Link to="/10/90/50">Red</Link>

```

# 获取参数

通过`props.match.params`获取，比如：`this.props.match.params.id`

多个参数：

```
const {match: {params}} = this.props
const {h, s, l} = params

```

eg: 

```
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


<Router>
  <div>
    <h2>Accounts</h2>
    <ul>
      <li><Link to="/netflix">Netflix</Link></li>
      <li><Link to="/zillow-group">Zillow Group</Link></li>
      <li><Link to="/yahoo">Yahoo</Link></li>
      <li><Link to="/modus-create">Modus Create</Link></li>
    </ul>

    <Route path="/:id" component={Child}/>
  </div>
</Router>

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

```