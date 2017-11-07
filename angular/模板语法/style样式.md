
绑定类型：样式绑定

目标 `style` property(指dom的`property`，而不是html的`attribute`)

- `[style.style-property]`, 由style前缀，一个点 (.)和 CSS 样式的属性名组成

<button [style.color]="isSpecial ? 'red' : 'green'">

<button [style.background-color]="canSave ? 'cyan': 'grey'" >Save</button>

<!-- 有些样式绑定中的**样式带有单位**。在这里，以根据条件用 “em” 和 “%” 来设置字体大小的单位。 -->

<button [style.font-size.em]="isSpecial ? 3 : 1" >Big</button>
<button [style.font-size.%]="!isSpecial ? 150 : 50" >Small</button>

-  `NgStyle`指令 来同时设置多个内联样式

```
<div [ngStyle]="currentStyles">
  This div is initially italic, normal weight, and extra large (24px).
</div>


currentStyles: {};
setCurrentStyles() {
  // CSS styles: set per current state of component properties
  this.currentStyles = {
    'font-style':  this.canSave      ? 'italic' : 'normal',
    'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
    'font-size':   this.isSpecial    ? '24px'   : '12px'
  };
}
```


- 组件的元数据中设置styles属性

@Component({
  selector: 'app-root',
  template: `
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]=hero></app-hero-main>`,
  styles: ['h1 { font-weight: normal; }']
})
export class HeroAppComponent {
/* . . . */
}

- 元数据中指定样式表的URL

@Component({
  selector: 'app-hero-details',
  template: `
    <h2>{{hero.name}}</h2>
    <app-hero-team [hero]=hero></app-hero-team>
    <ng-content></ng-content>
  `,
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent {
/* . . . */
}

- CSS @imports 语法

```
<!-- src/app/hero-details.component.css -->

@import 'hero-details-box.css';
```