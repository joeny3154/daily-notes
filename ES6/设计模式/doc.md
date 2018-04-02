http://www.alloyteam.com/2012/10/commonly-javascript-design-pattern-observer-mode/

``` js
// 首先定义一个可观察对象
var Observable = function() {  
   //只有一个用于收集订阅者的对象,这个地方要写成公共对象
   // 不能用var subscribers = {}, 这样会写成私有对象
   this.subscribers = {};  
} ;
// Observable 对象原型上上的3个方法: subscribe, unsubscribe, publish
Observable.prototype = {
  constructor: Observable,

  // subscribe @param1 type  @param2 fn
  subscribe: function(type, fn) {
   
  // 首先查看对象subscribers上是否存在type属性
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    // 将订阅者加入到 subscribers 中
    // subscriber is just a function，订阅者仅仅是一个函数而已
    this.subscribers[type].push(fn);
  },
    // unsubscribe 取消订阅 @param1 type  @param2 fn
  unsubscribe: function(type, fn) {
    // 先判断subscribers中存不存在type这个属性，不存在直接返回
    if (!this.subscribers[type]) {
        return;
    }
    // 存在type,将要取消订阅的订阅者找出，从订阅者名单中删除掉
    var listeners = this.subscribers[type], i, len = listeners.length;
    for (i = 0; i < len; i++) {
        if (listeners[i] === fn) {
            // 将取消订阅的观察者observer移除
            listeners.splice(i, 1);
            return;
        }
    }
  },
  // publish: 发布 @param1 type  @param2 eventArgs(事件信息)
  publish: function(type, event) {
   // 判断观察者对象集合subscribers中存不存在type属性，不存在则表示为订阅，直接返回
   if (!this.subscribers[type]) {
      return;
   }
   // 先判断对象event中存不存在type这个属性，不存在就创建该属性
    if (!event[type])  {
        event[type] = type;
    }
   // 找到该事件对应的观察者，并发布通知
    var  listeners = this.subscribers[type],
          i,
          len = listeners.length;
    for (i = 0; i < len; i++) {
        listeners[i](event);
    }
  }
}

```
``` js
function Pubsub(){
    //存放事件和对应的处理方法
  this.handles = {};
}
Pubsub.prototype={
  //传入事件类型type和事件处理handle
  on: function (type, handle) {
    if(!this.handles[type]){
        this.handles[type] = [];
    }
    this.handles[type].push(handle);
  },
  emit: function () {
      //通过传入参数获取事件类型
    var type = Array.prototype.shift.call(arguments);
    if(!this.handles[type]){
        return false;
    }
    for (var i = 0; i < this.handles[type].length; i++) {
      var handle = this.handles[type][i];
      //执行事件
      handle.apply(this, arguments);
    }
  },
  off: function (type, handle) {
    handles = this.handles[type];
    if(handles){
      if(!handle){
        handles.length = 0;//清空数组
      } else {
        for (var i = 0; i < handles.length; i++) {
            var _handle = handles[i];
            if(_handle === handle){
                handles.splice(i,1);
            }
          }
        }
    }
  }
}
```