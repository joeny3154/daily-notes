
# 插值

### HTML 元素标签内的文本

```
<h1>{{title}}</h1>
<h2>My favorite hero is: {{myHero}}</h2>

// 宿主组件的方法
<p>The sum of 1 + 1 is not {{1 + 1 + getVal()}}</p>

// ts
export class AppComponent {
  title = 'Tour of Heroes';
  myHero = 'Windstorm';
}

```
### 属性
<img src="{{heroImageUrl}}" style="height:30px">


### 上下文

上下文可以包括组件之外的对象,比如模板输入变量 (let hero)和模板引用变量(#heroInput)就是备选的上下文对象之一

- 模板输入变量

`<div *ngFor="let hero of heroes">{{hero.name}}</div>`

命名冲突。组件具有一个名叫hero的属性，而*ngFor声明了一个也叫hero的模板变量。 在{{hero.name}}表达式中的hero实际引用的是模板变量，而不是组件的属性。

- 模板引用变量(#heroInput)

`<input #heroInput> {{heroInput.value}}`

### 变量初始化

- 变量初始化

```
export class AppComponent {
  title = 'Tour of Heroes';
  myHero = 'Windstorm';
}

```

- 构造函数初始化

```
export class AppCtorComponent {
  title: string;
  myHero: string;

  constructor() {
    this.title = 'Tour of Heroes';
    this.myHero = 'Windstorm';
  }
}
```

**利用的是 TypeScript 提供的简写形式** —— 用构造函数的参数直接定义属性

```
export class Hero {
  constructor(
    public id: number,
    public name: string
  ) { }
}
```
# 循环

`*ngFor`指令

```
<ul>
  <li *ngFor="let hero of heroes">
    {{ hero }}
  </li>
</ul>

```

# 条件语句

`*NgIf`

```
<p *ngIf="heroes.length > 3">There are many heroes!</p>
```