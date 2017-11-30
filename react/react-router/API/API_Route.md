
Route 组件
=======

https://reacttraining.com/react-router/web/api/Route

# 三种渲染方法


- `<Route component>`
- `<Route render>`
- `<Route children>`

每个在不同的情况下都有用。***在一个 `<Route>` 中只能使用其中一个props***, 不能同时使用。看下面的解释，能了解为什么有3个选项。大部分时间你会使用`component`。

三种渲染方法都能得到相同的props

- `match`

- `location`

- `history`

eg: 

```
<Route path="/user/:username" component={User}/>

const User = ({ match, location, history }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```

# Route props 

- component
eg: `<Route path="/user/:username" component={User}/>`

当您使用 `componen` （而不是下面的 `render` 或者 `children` ）路由器使用从给定的组件 `React.createElement` 创建一个新的React元素。

这意味着，如果您为 `component` 属性提供内联函数(eg: `component={() => <div>Home</div>}`)，则每个渲染都会创建一个新组件。
这会导致现有的组件卸载和新的组件安装，而不是只更新现有的组件。当使用内联函数进行内联渲染时，使用下面的 `render` 或者 `children` prop 。

- `render`: func

eg: `<Route path="/home" render={() => <div>Home</div>}/>`

这可以方便地进行内联渲染和包装，而不需要上述的不必要的重新安装。

您可以传递一个函数，以便在 `location` 匹配时调用，而不是使用 `component` prop 创建一个新的React元素。该 render  prop接收所有相同的 `route props` 的 component render prop

- `children`: func

有时您需要渲染路径是否匹配位置。在这些情况下，您可以使用函数 `children` prop。它的工作原理与 render 除了被称为是否匹配一样。
该 `children` 渲染 `props` 接收所有 `route props` 作为 `component` 和 `render` 方法，当路由不匹配的URL时， `match` 为 `null` 。
这使您可以根据 route 是否匹配, 动态的调整您的用户界面。这里我们添加一个 `active` 类，如果路线匹配:

eg: 添加 `active` 类

```
<ul>
  <ListItemLink to="/somewhere"/>
  <ListItemLink to="/somewhere-else"/>
</ul>

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)

```

这对动画也是有用的：

eg: Animate

```
<Route children={({ match, ...rest }) => (
  {/* Animate will always render, so you can use lifecycles to animate its child in and out */}
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```

- `path`: string

路由匹配规则, 如果没有 `path`, 则总是匹配的。

- `exact`: bool 精准匹配

如果为true，则只有当路径完全匹配location.pathname时才匹配。

| path    | location.pathname   |  是否精准匹配(exact) | matches(是否匹配) |
| ------  | ------------------- | ------------------ | -------          |
| /one	  |  /one/two	          | true	             |  no              |
| /one	  |  /one/two	          | false	             |  yes             |

- `strict`: bool 严格模式

如果为true，则具有尾部斜线 `/` 的路径只会与尾部斜线匹配。 当location.pathname中有附加的URL段时，这不起作用。

eg: `<Route strict path="/one/" component={About}/>`

| path    | location.pathname   | matches(是否匹配) |
| ------  | ------------------- | -------          |
| /one/	  |  /one   	          |  no              |
| /one/	  |  /one/	            |  yes             |
| /one/	  |  /one/two	          |  yes             |

***警告：***

严格可以用来强制执行一个location.pathname没有结尾的斜杠，但为了做到这一点 `strict` 和 `exact` 必须设置: 

eg: `<Route exact strict path="/one" component={About}/>`

| path    | location.pathname   | matches(是否匹配) |
| ------  | ------------------- | -------          |
| /one	  |  /one   	          |  yes             |
| /one	  |  /one/	            |  no              |
| /one	  |  /one/two	          |  no              |

- `location`: object


一个<Route>元素尝试其匹配path到当前的 history location （通常是当前浏览器URL）。
然而，一个location不同的pathname也可以通过匹配。
如果需要将一个<Route>与当前历史记录位置以外的某个位置进行匹配，则这非常有用，如“ Animated Transitions”示例所示。

如果一个<Route>元素被包裹在一个<Switch>并且匹配传递给<Switch>（或者当前的历史位置）的位置，那么location传递给的prop <Route>将被<Switch>（这里给出的）所使用的prop 覆盖。
