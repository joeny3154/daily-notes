

<Link>
=====

eg:

```
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>

```

- to: string

要链接到的路径名或位置。

eg: `<Link to="/courses"/>`

- to: object

location 对象

eg:

```
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```

- replace: bool

eg: `<Link to="/courses" replace />`

