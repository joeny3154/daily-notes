
绑定类型 css类（Class）

- 通过对目标 `class` property 绑定：切换单一类名的好方法

`[class.class-name]`:

<!-- 添加 -->
<div class="bad curly special" [class]="badCurly">Bad curly</div>

<!-- 切换 -->
<div [class.special]="isSpecial">The class binding is special</div>

<!-- 移除 -->
<div class="special" [class.special]="!isSpecial">This one is not so special</div>

- 通过`ngClass`指令,同时管理多个类名

<div [ngClass]="{'special': isSpecial}"></div>

```
<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special</div>

currentClasses: {};
setCurrentClasses() {
  this.currentClasses =  {
    'saveable': this.canSave,
    'modified': !this.isUnchanged,
    'special':  this.isSpecial
  };
}
```
