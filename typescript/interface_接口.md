https://ts.xcatliu.com/basics/type-of-object-interfaces.html


对象的类型——接口
=========

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。


interface Person {
  name: string;
  age: number;
}

let xcatliu: Person = {
  name: 'Xcat Liu',
  age: 25,
};

### 可选属性

可选属性的含义是该属性可以不存在。

interface Person {
  name: string;
  age?: number;
}

let xcatliu: Person = {
  name: 'Xcat Liu',
};

### 任意属性
有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

使用 [propName: string] 定义了任意属性取 string 类型的值

需要注意的是，一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性：

interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
  <!-- [propName: string]: any; -->
}

let xcatliu: Person = {
  name: 'Xcat Liu',
  age: 25,
  website: 'http://xcatliu.com',
};

上例中，任意属性的值允许是 string，但是**可选属性 age 的值却是 number**，number 不是 string 的子属性，所以报错了。

### 只读属性

interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let xcatliu: Person = {
  name: 'Xcat Liu',
  website: 'http://xcatliu.com',
};

xcatliu.id = 89757;

只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：

上例中，报错信息有两处，第一处是在对 xcatliu 进行赋值的时候，没有给 id 赋值。

第二处是在给 xcatliu.id 赋值的时候，由于它是只读属性，所以报错了