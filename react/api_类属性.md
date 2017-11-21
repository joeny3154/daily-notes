React 属性
=====


- `React.PropTypes`

用于组件内部验证传入 Props 的类型，如果传入的类型不匹配，React 会打印出警告：

eg:

```
var Component = React.createClass({
    propTypes : {
        a : React.PropTypes.number.isRequired, //必须传入一个名为“a”、类型为number的props
        callback : React.PropTypes.func   //如果传入了名为“callback”的props，其类型必须是函数
    },
    render : function() {
        return this.props.a==1 ? <p onClick={this.props.callback}>123</p> : null
    }
})
```

类属性

- defaultProps

defaultProps 可以定义为组件类自身的属性，用来设置类的默认 props 。 这用于未定义的(`undefined`) props，但不用于设置为 `null`的 props 。

```
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
}
```

- displayName

displayName 字符串被用在调试信息中。JSX 自动设置这个值； 参阅深入 [JSX](http://www.css88.com/react/docs/jsx-in-depth.html)