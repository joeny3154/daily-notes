

### 使用

必须导入FormsModule并把它添加到Angular模块的imports列表中

```
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <--- JavaScript import from Angular

/* Other imports */

@NgModule({
  imports: [
    BrowserModule,
    FormsModule  // <--- import into the NgModule
  ],
  /* Other module metadata */
})
export class AppModule { }
```

### 内幕

<input [(ngModel)]="currentHero.name">

等效：

<input [value]="currentHero.name" (input)="currentHero.name=$event.target.value" >

### 展开形式使用

[(ngModel)]语法只能设置数据绑定属性。 如果要做更多或者做点不一样的事，也可以写它的展开形式。

下面这个生造的例子强制输入框的内容变成大写：

<input [ngModel]="currentHero.name" (ngModelChange)="setUppercaseName($event)">