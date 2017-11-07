# `StackNavigator(RouteConfigs, StackNavigatorConfig)`

### `RouteConfigs`

`RouteConfigs`对象是从路由名称到路由配置的映射，它告诉导航器该路由的内容

```
StackNavigator({

  Profile: {
    screen: ProfileScreen,
    <!-- 可选：在Web应用程序中深层链接或使用反应导航时，将使用此路径 -->
    path: 'people/:name',
    
    <!-- screen的展示方式(例如：header title,tab label) -->
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    }),
  },

  ...MyOtherRoutes,
});
```

### `StackNavigatorConfig`


Router的配置:

- `initialRouteName` 设定默认的堆栈的screen, 需要和route configs的键之一相同
- `initalRouteParams` 初始化route的参数
- `navigationOptions` 默认需要使用的可选参数
- `paths`  覆盖route configs的路径设置

可视化选项:

- `mode` 定义渲染和切换之间的样式:
  - `card` 使用iOS和android标准的切换方法.默认值
  - `modal` 使screen从底部滑动显示.仅仅在iOS下使用,Andorid下没有效果

- `headerMode` 定制header渲染的方法

  - `float` Render a single header that stays at the top and animates as screens are changed. This is a common pattern on iOS.

  iOS默认的效果，可以看到一个明显的过渡动画。

  - `screen` Each screen has a header attached to it and the header fades in and out together with the screen. This is a common pattern on Android.
  滑动过程中，整个页面都会返回

  - `none`  No header will be rendered.
  没有动画。

- `float` 切换界面的时候,用动画效果在screen的顶部渲染header
- `screen` 每一个screen都有一个header附着到头部,切换的时候有淡入和淡出的效果, andorid的基本模式
- `none`  没有header的渲染.
- `cardStyle` 使用这个prop来重写或者扩展单个card的默认style

- `onTransitionStart` 当card开始切换动画的时候,这个函数被调用
- `onTransitionEnd` 当切换动画完成的时候,这个函数被调用

# `Screen Navigation Options` screen组件中定义静态navigationOptions

  优先级低于StackNavigator `RouteConfigs`中的`navigationOptions`配置

  优先级： `RouteConfigs/navigationOptions` > `Screen Navigation Options > `StackNavigatorConfig`

- 使用屏幕参数（screen param）

```
class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  })
}
```

- 不使用屏幕参数

```
class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'title',
    headerRight: <Button title="Info" />,
  }
}
```

- `title` 界面的标题(string)
- `header` header bar设置对象

- `headerTitle` 标题使用的字符串或React元素。 默认为scene title
- `headerBackTitle` 设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null

- `headerTruncatedBackTitle` 设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。（上个页面的标题过长，导致显示不下，所以改成了短一些的。）

- `headerRight` React元素显示在header的右侧
- `headerLeft` React元素显示在header的左侧
- `headerStyle` header的style(object)
- `headerTitleStyle` 设置导航栏文字颜色。总感觉和上面重叠了 Style object for the title component
- `headerBackTitleStyle` 设置导航条返回文字样式 Style object for the back title 
- `headerTintColor`  header的前景色
- `headerPressColorAndroid`  波纹颜色 (Android >= 5.0 only)
- `gesturesEnabled` 是否允许通过手势关闭该界面，在iOS上默认为true，在Android上默认为false



### Navigator Props
由StackNavigator（...）创建的导航器组件具有以下props：

- screenProps 向child screens传递额外的选项

```
const SomeStack = StackNavigator({
  // config
});

<SomeStack
  screenProps={/* 这个prop将被传递给屏幕组件，如this.props.screenProps */}
/>

```