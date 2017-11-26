

this.props.location
========

location 代表了应用现在的位置，您想要的位置，甚至是原来的位置。 它看起来像这样：

```
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

# 路由器将在几个地方为您提供一个 `location` 对象：

`Route component`: `this.props.location`
`Route render`: ({ location }) => ()
`Route children`: ({ location }) => ()
`withRouter`:  this.props.location

不应该使用`history.location`，因为它是可变的。`location`对象永远不会发生变化，所以您可以在生命周期钩子中使用它来确定何时导航，这对于数据抓取和动画非常有用。eg:

```
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // navigated!
  }
}
```


# 您可以提供位置而不是字符串到导航的各个位置：

- Web Link to(网站链接)

- Native Link to(本地链接到)

- Redirect to(重定向到)

- `history.push` 

- `history.replace`

eg:

```
<!-- 通常使用到的 -->
<Link to="/somewhere"/>
const location = {
  pathname: '/somewhere'
  state: { fromDashboard: true }
}
<Link to={location}/>
<Redirect to={location}/>

history.push(location)
history.replace(location)
```

通常你只是使用一个字符串，但是如果你需要添加一些“`location state`”，只要应用返回到特定的location就可以使用，你可以使用一个 `location` 对象。如果你想基于导航历史记录而不是仅仅路径（如模态）来分支UI，这是非常有用的。


最后，您可以将 `location` 传递给以下组件：

- <Route/>
- <Switch/>

这将阻止他们在路由器的状态下使用实际位置。这对动画和等待导航非常有用，或者任何时候你想欺骗一个组件在不同于真实位置的位置渲染。


eg: 

```
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

eg:

```
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // navigated!
  }
}
```

eg:

```

```