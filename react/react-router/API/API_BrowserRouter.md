
BrowserRouter
========
`<Router>` 使用 HTML5 history API（ pushState，replaceState和popstate事件），让您的UI 与 URL 同步。

eg: 

```
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```

- `basename`：string

所有位置的基础 url。如果您的应用程序是从服务器上的子目录提供的，则需要将其设置为子目录。格式正确的基本名应该有一个前导斜杠，但不能有斜线

```
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // 渲染为: <a href="/calendar/today">
```

- `getUserConfirmation`：func(message: string, callback: func): void

用于确认导航的功能。默认使用 `window.confirm`

eg: 
```
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation}/>
```

- `keyLength`：数字

location.key 的长度。默认为6。

eg: `<BrowserRouter keyLength={12}/>`

- `children`: node

只能包含一个子元素，否则会报错，可以使用`div`包裹

eg: 

```
<BrowserRouter>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/topics" component={Topics}/>
  </div>
</BrowserRouter>
```