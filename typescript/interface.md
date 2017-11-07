
## 接口

```

function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

vs

interface SquareConfig {
  label: string;
  // 可选属性：添加 ?
  width?: number;
  // 只读属性：添加 readonly
  readonly height: number
}

function printLabel(labelledObj: SquareConfig) {
  console.log(labelledObj.label);
}
```



### readonly vs const

最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用const，若做为属性则使用readonly