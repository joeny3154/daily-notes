<NavLink>

`<Link>`当它与当前URL匹配时，它的特殊版本(`<NavLink>`)将为呈现的元素添加样式属性。

eg:

```
import { NavLink } from 'react-router-dom'
<NavLink to="/about">About</NavLink>
```


- `activeClassName`: string

active 状态时给予元素的类。给定的默认类是active。这将加入className道具。

eg:

```
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```

- `activeStyle`：object

处于活动状态的元素的样式。

eg: 

```
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
```

- `exact`：boolean

何时true，仅当位​​置完全匹配时才会应用 active 的类/样式。

eg: `<NavLink exact to="/profile">Profile</NavLink>`

- `strict`: boolean

何时true，pathname在确定位置是否与当前URL匹配时，将考虑位置上的尾部斜线。有关<Route strict>更多信息，请参阅文档

eg: `<NavLink strict to="/events/">Events</NavLink>`


- `isActive`：func

添加额外逻辑以确定 link 是否处于 active 状态的功能。如果您不想验证链接的路径名是否与当前的URL匹配，那么应该使用它pathname。

eg:

```
// only consider an event active if its event id is an odd number
<!-- 如果 eventID 是奇数，则激活 -->
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}

<NavLink to="/events/123" isActive={oddEvent}>Event 123</NavLink>
```

- `location`：object

在 isActive 比较当前的位置历史(history location)（通常为当前浏览器URL）。为了比较不同的位置，location可以通过一个。