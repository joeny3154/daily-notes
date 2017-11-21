
React API
=====

http://www.cnblogs.com/vajoy/p/4631292.html

# `React.createClass(config: object)`

创建一个`ReactClass`（组件类），参数是一个对象且必须带有 `render` 属性方法，
该方法必须返回一个封闭的容器（容器内可以有其它不限结构的容器）或 `null/false`（表示啥都不渲染）

# `React.createElement(type: string | ReactClass, [props: object], [children: ReactElement])`
创建一个指定类型的React元素，注意第三个参数CHILDREN可以是任意个React元素：

eg: 

```
var Component = React.createClass({
    render: function() {
        return this.props.a==1 ? <p>123</p> : null
    }
});

React.render(
    React.createElement('div', null,
        React.createElement( 'p', null,
            React.createElement('span', null, 'Hello,'),
            React.createElement('span', null, 'world,'),
            React.createElement( Component, {a : 1})
        )
    ), document.body
);

```

# `React.cloneElement(type: ReactClass (ReactElement), [props: object], [children: ReactElement])`

克隆并返回一个新的 ReactElement （内部子元素也会跟着克隆），新返回的元素会保留有旧元素的 props、ref、key，也会集成新的 props（只要在第二个参数中有定义）

eg: 克隆`DOMElement`

```
var Hello = React.createClass({
    render: function() {
        var span = <span a="1">VaJoy</span>;
        var newSpan = React.cloneElement(span, {b:'2'}, <em>xxxx</em>);
        return <div>Hello {span},{newSpan}</div>; //Hello VaJoy,CNBlog
    }
})

```

eg: 克隆`ReactClass`

```
var Li = React.createClass({
    render: function() {
        return <li>{this.props.i}</li>
    }
});
var Ul = React.createClass({
    deal : function(child, index){
        //注意下面这行换成 createElement 会报错！因为child是ReactElement而不是ReactClass或字符串
        return React.cloneElement(child, {i:index});
    },
    render: function() {
        return <ul>{this.props.children.map(this.deal)}</ul>;
    }
});

React.render((
    <Ul>
        <Li i="9" />
        <Li i="8" />
        <Li i="7" />
    </Ul>
), document.body);
```

# `React.createFactory(type: string | ReactElement)`

返回一个某种类型的`ReactElement`工厂函数，可以利用返回的函数来创建一个`ReactElement`（配置 props 和 children）：

# `React.unmountComponentAtNode(container: DOMElement)`

从 container 指定的 DOM 中移除已经挂载的 React 组件，清除相应的事件处理器和 state。如果在 container 内没有组件挂载，这个函数将什么都不做。如果组件成功移除，则返回 true；如果没有组件被移除，则返回 false

eg: 

```
var isUnmount = React.unmountComponentAtNode(document.body);
console.log(isUnmount);  //true
```

# `React.render(reactElement: ReactElement, container: DOMElement,  callback: function)`

渲染一个 ReactElement 到 container 指定的 DOM 中，并返回一个到该组件的引用。如果提供了可选的回调函数，则该函数将会在组件渲染或者更新之后调用

# `React.renderToString(reactElement: ReactElement)`

React为服务端提供的一个方法，可以直接输出 ReactElement 为 HTML 字符串，将这些标记发送（比如 res.write(HTMLString)）给客户端，可以获得更快的页面加载速度，并且有利于搜索引擎抓取页面，方便做 SEO（主要是百度不争气，谷歌早可以从内存中去抓最终生成的HTML内容了）

# `React.renderToStaticMarkup(reactElement: ReactElement)`

类似 React.renderToString ，但只生成纯粹的HTML标记字符串，不会包含类似 data-reactid 之类的React属性，从而节省字节数

# `React.isValidElement(any)`

判断参数是否一个合法的 ReactElement，并返回 Boolean 值

eg: 

```
var Component = React.createClass({
    render: function() {
        return this.props.a==1 ? <p>123</p> : null
    }
});

var com = <Component/>,
    com2 = '<Component/>';
console.log(React.isValidElement(com));  //true
console.log(React.isValidElement(com2));  //false

```

# `React.DOM.tag(attribute: object | null, children: string | ReactElement)`

常规是用于在非 JSX 下来创建 ReactElement，tag 表示相应的DOM类型（比如“div”、“p”）。另外首个参数可以定制相关的 DOM 属性（比如“name”），第二个参数表示 DOM 内的内容

eg: 

```
var div = React.DOM.div({name : 'div1'}, 'HELLO ', React.DOM.span(null, <em>WORLD</em>));
React.render(div, document.body)

<!-# 生成结果 -->

<div name="div1" data-reactid=".0">
  <span data-reactid=".0.0">HELLO</span>
  <span data-reactid=".0.1">
    <em data-reactid=".0.1.0">WORLD</em>
  </span>
</div>

```

# `React.initializeTouchEvents(sholdUserTouch: boolean)`

开启或关闭 React 的触摸事件机制，传入参数 true 使 React 能处理移动设备的触摸（ touch ）事件：

eg: 

```
React.initializeTouchEvents(true);
var Component = React.createClass({
    render : function() {
        return <p onTouchStart={this.props.callback}>123</p>
    }
});

var cb = function(){
    alert('touch!')
};

React.render(
    <Component callback={cb} />, document.body
)
```


# `React.Children`

为处理 `this.props.children` 这个封闭的数据结构提供了有用的工具。它有如下几个方法：

- 1. `React.Children.map(children: object, fn: function [, context: object])`

遍历子元素，映射为一个新的子元素集合（跟 ES5 的 Array.map 差不多）：

eg:

```
var Component = React.createClass({
    deal : function(child, index){
        console.log(child, index);
        return !!index && child;  //第一个li会被过滤掉，因为其索引为0
    },
    render : function() {
        return (
            <ul>
                {React.Children.map(this.props.children, this.deal)}
            </ul>)
    }
});

React.render(
    (
        <Component>
            <li>0</li>
            <li>1</li>
            <li>2</li>
        </Component>
    ), document.body
)
```

- 2. `React.Children.forEach(children: object , fn: function [, context: object])`

遍历子元素，对每一个子元素执行回调，但不像上述的 map 那样最终返回一个新的集合（跟 ES5 的 Array.forEach 差不多)

eg:

```
var Hello = React.createClass({
    render: function() {
        React.Children.forEach(this.props.children, function(child){
            console.log(child.props, child.key)
        });
        return <div>Hello {this.props.name}</div>;
    }
});

React.render(<Hello name="World">
    <li myProp="test"/>
    <li key="blah2" myProp="test2"/>
    <li key="blah3"/>
</Hello>, document.body);
```

- 3. `React.Children.count(children: object)`

返回子元素的总数

eg: 

```
var Component = React.createClass({
    render : function() {
        var nums = React.Children.count(this.props.children);
        return (<ul>
                    <li>一共有{nums}个子元素</li> //3
                    {this.props.children}
                </ul>)
    }
});

React.render(
    (
        <Component>
            <li>0</li>
            <li>1</li>
            <li>2</li>
        </Component>
    ), document.body
)
```

# `React.Children.only(children: object)`

返回仅有的一个子元素，否则（没有子元素或超过一个子元素）报错且不渲染任何东西

eg: 

```
 var Hello = React.createClass({
    render: function() {
        return <div>Hello {React.Children.only(this.props.children)}</div>;
    }
});

React.render(<Hello name="World">
    <span>World</span>
    <span>!</span> //会报错“onlyChild must be passed a children with exactly one child.”
</Hello>, document.body);
```