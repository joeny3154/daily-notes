
### this使用, Binding to methods
http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html


```

increaseQty: function () {
  // ... 
  this.setState({...})
}
// 正确
onClick = {this.increaseQty.bind(this)}

// 错误
onClick = {this.increaseQty.bind(this)}
Uncaught TypeError: Cannot read property 'setState' of undefined
```
这是因为当我们以这种方式调用一个函数时，绑定到这不是一个类本身，它是未定义的。 这是默认的JavaScript行为，是非常预期的。 与此相反，如果您使用React.createClass（），则所有方法都将自动绑定到对象的实例。 对于一些开发人员来说，这可能是反直觉的。

React团队在为React组件实施ES6类的支持时，决定不自动绑定。 

现在我们来看一下如何使用ES6类从JSX中调用类方法的各种方法：


- 方法1：使用`Function.prototype.bind()`

```
export default class CartItem extends React.Component {
  render () {
    <Button onClick={this.increaseQty.bind(this)}/>
  }
}
```

- 方法2：constructor中定义function

```
export default class CartItem extends React.Component {
  constructor (props) {
    super(props)
    this.increaseQty = this.increaseQty.bind(this)
  }

  render() {
        <button onClick={this.increaseQty}>+</button>
    }
}
```

- 方法3：使用箭头函数和construtor

```
export default class CartItem extends React.Component {
  constructor (props) {
    super(props)
    this.increaseQty = () => this.increaseQty()
  }

  render() {
        <button onClick={this.increaseQty}>+</button>
    }
}
```
- 方法4： 使用箭头函数和es2015 class属性
```
export default class CartItem extentds React.Component {
  increaseQty = () => {
    // ...
  }
  render() {
      <button onClick={this.increaseQty}>+</button>
  }
}
```
- 方法5：使用ES2015 +函数绑定语法
```
export default class CartItem extends React.component {
  coustructor (props) {
    super(props)
    this.increaseQty = ::this.increaseQty
  }
  render() {
      <button onClick={this.increaseQty}>+</button>
  }
}
```

- 使用ES2015 +函数绑定语法 就地绑定
```
export default class CartItem extends React.Component {
    render() {
        <button onClick={::this.increaseQty}>+</button>
    }
}
```
### 方法如何传参数

```
<button onClick={(ev, arg1, arg2,……) => {this.handleClick(ev, arg1, arg2,……)}}/> 

handleClick(ev, arg1, arg,……) {
    //code
}
```