

`$event`所有标准 DOM 事件对象都有一个target属性， 引用触发该事件的元素

<input (keyup)="onKey($event)">

target是<input>元素， event.target.value返回该元素的当前内容


### $event的类型

- any类型
$event转换为any类型。 这样简化了代码，但是有成本。 没有任何类型信息能够揭示事件对象的属性，防止简单的错误。

- KeyboardEvent 或其他

带类型方法

onKey(event: KeyboardEvent) {
  this.values += (<HTMLInputElement>event.target).value + ' | ';
}

### 按键事件过滤（通过key.enter）