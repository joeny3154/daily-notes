
Preventing Transitions
=================

使用`Prompt`组件判断是否阻止跳转，常用于在用户数据未保存前，提示用户是否需要丢弃的操作，如果

**props: **

- `when`: boolean

- `message`: function(location: object): string

eg:

``` js
<Prompt when={this.state.isBlocking} message={location => (`Are you sure you want to go to ${location.pathname}`)}/>
```