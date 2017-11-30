


Route Config
========

使用javaScript 对象（非`<Route/>`组件嵌套的方式）描述一个 route config

eg: 路由配置

```
const routes = [
  { path: '/sandwiches',
    component: Sandwiches
  },
  { path: '/tacos',
    component: Tacos,
    routes: [
      { path: '/tacos/bus',
        component: Bus
      },
      { path: '/tacos/cart',
        component: Cart
      }
    ]
  }
]

const RouteWithSubRoutes = (route) => {
   <Route path={route.path} render={props => (
    // 通过子路由保持嵌套
    <route.component {...props} routes={route.routes}/>
  )}/>
}

const RouteConfigExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/tacos">Tacos</Link></li>
        <li><Link to="/sandwiches">Sandwiches</Link></li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>
)

```


注意：

- 子路由嵌套 `<route.component {...props} routes={route.routes}/>`

- 其他参数设置: 直接在 `routes` 对应项中添加对应属性即可，然后设置到`<Route/>`
