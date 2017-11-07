
[animate githup](https://github.com/react-component/animate)
[animate 中文文档](https://github.com/react-component/animate/blob/master/docs/zh-cn/intro.md)

rc-animate
========

示例：

- 设置 `showProp`

当改变 enter 状态时，会自动根据 enter 的 true false 值，在 div 节点上加 fade-enter，fade-enter-active 或 fade-leave ，fade-leave-active 样式名

```
<Animate
  component=""
  showProp='data-show'
  transitionName="fade">
  <div data-show={this.state.enter} key="1" style={{
    display:this.state.enter?'block':'none',
    marginTop: '20px',
    width: '200px',
    height: '200px',
    backgroundColor: 'red'
    }}>
  </div>
</Animate>
```

- 不设置 `showProp`
就会根据 元素有没有 children (为null) 进行 enter leave 的动画

```
<Animate
  component=""
  transitionName="fade">
  {
    this.state.enter?<div key="1" style={{
    display:this.state.enter?'block':'none',
    marginTop: '20px',
    width: '200px',
    height: '200px',
    backgroundColor: 'red'
    }}>
  </div> : null
  }
</Animate>
```

那么当改变 enter 状态时，会自动根据 enter 的 true false 值，在 div 节点上加 fade-enter fade-enter-active 或 fade-leave fade-leave-active 样式名


### props

- component 
默认'span'
包装dom节点或子组件。 如果不为一个子组件包装设置为''

- componentProps
默认： {}
将传递给组件的额外props

- showProp	String		using prop for show and hide. 

- exclusive	Boolean		whether allow only one set of animations(enter and leave) at the same time.
在同一时间是否只允许一套动画（进入和离开）

- transitionName	String|Object		specify corresponding css, see ReactCSSTransitionGroup
动画名

transitionAppear	Boolean	false	whether support transition appear anim
支持过渡是否出现动画

transitionEnter	Boolean	true	whether support transition enter anim

transitionLeave	Boolean	true	whether support transition leave anim

onEnd	function(key:String, exists:Boolean)	true	animation end callback

- animation	Object	{}	to animate with js. see animation format below.
设置 animation 对象为 js 函数来实现 js 动画

```
animation={{
    enter:this.animateEnter,
    leave:this.animateLeave
  }}>

animateEnter(node, done){
    $(node).css('display', 'none');
    $(node).slideDown(1000, done);
    return {
      stop: function () {
        $(node).stop(true, true);
      }
    };
  },

animateLeave(node, done){
  $(node).css('display', '');
  $(node).slideUp(1000, done);
  return {
    stop: function () {
      $(node).stop(true, true);
    }
  };
},
```