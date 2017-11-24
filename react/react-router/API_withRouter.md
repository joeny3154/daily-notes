
withRouter
=========

经 `withRouter` 高阶组件后你可以访问 `history` 对象的属性和最近`<Route>`的 `match`。

`withRouter` 每当路线改变时都会重新渲染它的组件，`props`和 `<Route>`道具一样：`{ match, location, history }`。


```
import { withRouter } from 'react-router'

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    return (
      <div>You are now at {location.pathname}</div>
    )
  }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const ShowTheLocationWithRouter = withRouter(ShowTheLocation)
```

```
// This gets around shouldComponentUpdate
withRouter(connect(...)(MyComponent))

// This does not
connect(...)(withRouter(MyComponent))
```