

### 动画设置

维护`closing`状态，通过Animate组件设置showProp props实现动画效果

### 关闭后销毁dom

维护`closed`状态，通过`this.state.closed` state 返回 null 销毁dom

```
return this.state.closed ? null : (
  <div>
    
  </div>
)
```

### 是否有关闭按钮

closable 通过传入props, 声明 closeIcon 变量为无状态组件 or null

```
const closeIcon = closable ? (
  <a onClick={this.handleClose} className={`${prefixCls}-close-icon`}>
    {closeText || <Icon type="cross" />}
  </a>
) : null

```

### 关闭功能和关闭后的cb
handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  let dom = ReactDOM.findDOMNode(this) as HTMLElement;

  // `offsetHeight`： 返回元素的可见高度（包括padding、border、滑动条）
  dom.style.height = `${dom.offsetHeight}px`;
  // 重复一次后才能正确设置 height
  dom.style.height = `${dom.offsetHeight}px`;

  // 添加 `fade-leave` ，`fade-leave-active` 样式名
  this.setState({
    closing: false,
  });
  // noop：空操作
  (this.props.onClose || noop)(e);
}

### 传递函数作为propsd时，需要设置默认操作 or 设置空操作函数

```
// 空操作
function noop() { }

(this.props.onClose || noop)(e);
```

