### stage-0
包含stage-1, stage-2以及stage-3的所有功能，同时还另外支持如下两个功能插件

- transform-do-expressions
这个插件是为了方便在 jsx写if/else表达式而提出的
使用do表达式可以在JSX中添加逻辑：

<div className='myComponent'>
    {do {
      if(color === 'blue') { <BlueComponent/>; }
      else if(color === 'red') { <RedComponent/>; }
      else if(color === 'green') { <GreenComponent/>; }
    }}
  </div>

- transform-function-bind

提供过 :: 这个操作符来方便快速切换上下文this

func1.bind(obj) => obj::func1
func2.bind(this) => ::fun2
