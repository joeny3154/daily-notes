

this.props.location
=============

- `length` - (number) 数量）历史堆栈中的条目数量

- `action` - (string) 当前action（PUSH，REPLACE，或POP）

- `location` - (object) 当前位置。可能有以下属性：

  - `pathname` - (string) URL的路径

  - `search` - (string) URL查询字符串

  - `hash` - (string) URL hash 片段

  - `state` - (string) 特定于位置的状态，例如push(path, state)当这个位置被压入堆栈时。仅在浏览器和内存历史记录中可用。

- `push(path, [state])` - (function) 将新条目推入历史堆栈

- `replace(path, [state])` - (function) 替换历史堆栈上的当前条目

- `go(n)` - (function) 通过n条目移动历史堆栈中的指针

- `goBack()` - (function) 相当于 go(-1)

- `goForward()` - (function) 相当于 go(1)

- `block(prompt)` - (function) 守卫导航



```
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // will be true
    const locationChanged = nextProps.location !== this.props.location

    // INCORRECT, will *always* be false because history is mutable.
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}

<Route component={Comp}/>
```