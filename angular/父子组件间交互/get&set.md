
- 通过setter截听输入属性值的变化
export class NameChildComponent {
  private _name = '';
 
  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
 
  get name(): string { return this._name; }
}

- 通过ngOnChanges()来截听输入属性值的变化