

[Classnames](http://www.jianshu.com/p/9cf57787360d)


### 使用：

import classNames from 'classnames';

classNames('foo', 'bar'); // => 'foo bar'

```
let alertCls = classNames('prefixCls', {
    [`${prefixCls}-${type}`]: true,
    [`${prefixCls}-close`]: !this.state.closing,
    [`${prefixCls}-with-description`]: !!description,
    [`${prefixCls}-no-icon`]: !showIcon,
    [`${prefixCls}-banner`]: !!banner,
  }, className);
```