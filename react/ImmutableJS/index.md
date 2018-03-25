
Immutable.js
=====


它通过结构共享提供不可突变的，持久的集合：

不可突变:一旦创建，集合就不能在另一个时间点改变。
持久性:可以使用原始集合和一个突变来创建新的集合。原始集合在新集合创建后仍然可用。
结构共享:新集合尽可能多的使用原始集合的结构来创建，以便将复制操作降至最少从而提升性能。

不可突变数据使得变化跟踪很方便。每个变化都会导致产生一个新的对象，因此我们只需检查索引对象是否改变。例如，在这个常见的JavaScript代码中：


``` js
const x = { foo: 'bar' };
const y = x;
y.foo = 'baz';
x === y; // true

```

虽然y被编辑了，但是由于它与x索引了相同的对象，这个比较会返回true。你可以使用immutable.js实现类似效果：

``` js
const SomeRecord = Immutable.Record({ foo: null });
const x = new SomeRecord({ foo: 'bar' });
const y = x.set('foo', 'baz');
x === y; // false
```

在这个例子中，x突变后返回了一个新的索引，因此我们可以安全的确认x被改变了。

还有两个库可以帮助我们使用不可突变数据：seamless-immutable 和immutability-helper。

实现`shouldComponentUpdate`时，不可突变的数据结构帮助我们轻松的追踪对象变化。这通常可以提供一个不错的性能提升。
