### 初始化state

es6下有两种写法：

- 写法1：
class Video extends React.Component {
  state = {
    loopsRemaining: this.props.maxLoops,
  }
}

- 写法2：

class Video extends React.Component {
  
}