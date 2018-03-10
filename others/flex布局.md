### `flexDirection`

`column`,`row`

### `alignItems`

`flex-start`：交叉轴的起点对齐。
`flex-end`：交叉轴的终点对齐。
`center`：交叉轴的中点对齐。
<!-- baseline: 项目的第一行文字的基线对齐。 -->
`stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度

stretch选项生效的话，子元素在次轴方向上不能有固定的尺寸

### `justifyContent`

`flex-start`（默认值）：左对齐
`flex-end`：右对齐
`center`： 居中
`space-between`：两端对齐，项目之间的间隔都相等。
`space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### 容器
- flex-direction
- flex-wrap 换行

nowrap | wrap | wrap-reverse

- flex-flow

- justify-content

- align-items

- align-content


### 项目属性

`order`

定义项目的排列顺序。数值越小，排列越靠前，默认为0

`flex-grow`

定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大

`flex-shrink`

定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小

`flex-basis`

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小

flex

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选

`align-self`

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

设备款度

Dimensions.get('window').width
