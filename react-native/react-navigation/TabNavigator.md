

### `TabNavigator(RouteConfigs,TabNavigator)`

### `RouteConfigs`

The route configs object is a mapping from route name to a route config, which tells the navigator what to present for that route, see example from StackNavigator.


### `TabNavigatorConfig`

`tabBarComponent` 作为tab bar的组件.例如,TabBarBottom(ios的默认配置),TabBarTop(android的默认配置)
`tabBarPosition` tab bar的位置,可以是top和bottom
`swipeEnabled` 是否在tab之间滑动
`animationEnabled` 变换tabs的时候是否开启动画效果
`lazy` 是否根据需要懒加载tabs，而不是提前render标签
`tabBarOptions` 配置tab bar,见下文

几个选项被传递到底层路由器来修改导航逻辑

`initialRouteName` 初始化时加载的tab route
`order` 定义tabs顺序的routeName的数组
`paths` 提供routeName到路径配置的映射，该配置将覆盖routeConfigs中设置的路径
`backBehavior` 后退按钮是否会使Tab键切换到初始选项卡？ 如果是，设置为initialRoute，否则为none。 默认为initialRoute行为


- TabBarBottom的tabBarOptions选项（iOS上的默认tab）

`activeTintColor` - 活动tab的label & icon 颜色
`activeBackgroundColor` - 活动的tab的背景色
`inactiveTintColor` - 非活动tab的label & icon 颜色
`inactiveBackgroundColor` - 非活动的tab的背景色
`showLabel` -是否在tab显示label,默认是true
`style` - tab bar的样式对象
`labelStyle` - tab label的样式对象
`tabStyle` - tab的样式配置对象

```
tabBarOptions: {
  activeTintColor: '#e91e63',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: 'blue',
  },
}

```

- TabBarBottom的tabBarOptions选项（Android上的默认tab）

`activeTintColor` - 活动tab的label & icon 颜色
`inactiveTintColor` - 非活动tab的label & icon 颜色
`showIcon` - 是否在tab显示Icon,默认是false
`showLabel` - 是否在tab显示label,默认是true
`upperCaseLabel` - 是否大写所有label, 默认为true
`pressColor` - material涟漪效果的颜色 (Android >= 5.0 only)
`pressOpacity` - 按压tab的不透明度 (iOS and Android < 5.0 only)
`scrollEnabled` - 是否启用可滚动tabs
`tabStyle` - tab样式对象
`indicatorStyle` - tab indicator的样式对象 (行在tab的底部)
`labelStyle` - label样式对象
`iconStyle` - icon样式对象

很多人问为什么安卓上的tabbar文字会下移, 是因为安卓比iOS多了一个属性,就是iconStyle,通过设置labelStyle和iconStyle两个样式,外加style的高度,来使效果更佳合理.

`style` - tab bar样式对象

```
tabBarOptions: {
  labelStyle: {
    fontSize: 12,
  },
  tabStyle: {
    width: 100,    
  },
  style: {
    backgroundColor: 'blue',
  },
}

```

### `Screen Navigation Options`

`title` 

可用作headerTitle和tabBarLabel的回退的通用标题

`tabBarVisible` 
True或false显示或隐藏选项卡栏，如果未设置，则默认为true

`tabBarIcon` 
React Element or a function that given { focused: boolean, tintColor: string } returns a React.Element, to display in tab bar

React元素或赋予{focused：boolean，tintColor：string}的函数返回一个React.Element，显示在选项卡栏中

设置标签栏的图标。需要给每个都设置

`tabBarLabel` 
Title string of a tab displayed in the tab bar or React Element or a function that given { focused: boolean, tintColor: string } returns a React.Element, to display in tab bar. When undefined, scene title is used. To hide, see tabBarOptions.showLabel in the previous section.

设置标签栏的title。推荐这个方式

标签栏或React元素中显示的标签的标题字符串或给定{focused：boolean，tintColor：string}的函数返回一个React.Element，以显示在选项卡栏中。 未定义时，使用场景标题。 要隐藏，请参阅上一节中的tabBarOptions.showLabel。


### Navigator Props
由TabNavigator（...）创建的导航器组件具有以下props：

- screenProps 向child screens传递额外的选项

```
const TabNav = TabNavigator({
  // config
});

<TabNav
  screenProps={/* 这个prop将被传递给屏幕组件，如this.props.screenProps */}
/>

```