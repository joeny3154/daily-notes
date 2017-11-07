

# Screen Navigation Options

Each screen can configure several aspects about how it gets presented in parent navigators.

每个screen都可以配置几个方面的内容,这些内容影响到在父navigators中怎么得到展示

两种方式来指定每个选项

*静态配置方法*:每一个navigation 可选项都可以被直接设定
Static configuration: Each navigation option can either be directly assigned:

```
class MyScreen extends React.Component {
  static navigationOptions = {
    title: 'Great',
  };
  ...
```

*动态配置方法* Dynamic Configuration

或者，选项可以是一个接受以下参数的函数，并返回导航选项的对象，该对象将覆盖路由定义和导航器定义的navigationOptions。

`props` - 与`screen`组件相同的`props`

  - `navigation` - The navigation prop for the screen, with the screen's route at navigation.state

  - `screenProps` - The props passing from above the navigator component

  - `navigationOptions` - The default or previous options that would be used if new values are not provided

  未提供新值时将使用的默认或先前选项

```
class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name + "'s Profile!",
    headerRight: <Button color={screenProps.tintColor} {...} />,
  });
  ...
```


screenProps在渲染时传入。 如果此`screen`托管在SimpleApp导航器中：

```
<SimpleApp
  screenProps={{tintColor: 'blue'}}
  // navigation={{state, dispatch}} // 可选地控制应用程序 optionally control the app
/>
```


### 通用 Navigation Options 

The title navigation option is generic between every navigator. It is used to set the title string for a given screen.
`title`navigation option在每个导航器(`navigator`)之间是通用的。 它用于设置给定`screen`的标题字符串。

```
class MyScreen extends React.Component {
  static navigationOptions = {
    title: 'Great',
  };
  ...
```

Unlike the other nav options which are only utilized by the navigator view, the title option can be used by the environment to update the title in the browser window or app switcher.

### 默认 Navigation Options 

It's very common to define navigationOptions on a screen, but sometimes it is useful to define navigationOptions on a navigator too.
Imagine the following scenario: Your TabNavigator represents one of the screens in the app, and is nested within a top-level `StackNavigator`:

```
StackNavigator({
  route1: { screen: RouteOne },
  route2: { screen: MyTabNavigator },
});
```

Now, when route2 is active, you would like to change the tint color of a header. It's easy to do it for route1, and it should also be easy to do it for route2. This is what Default Navigation Options are for - they are simply navigationOptions set on a navigator:

```
const MyTabNavigator = TabNavigator({
  profile: ProfileScreen,
  ...
}, {
  navigationOptions: {
    headerTintColor: 'blue',
  },
});
```

Note that you can still decide to also specify the navigationOptions on the screens at the leaf level - e.g. the ProfileScreen above. The navigationOptions from the screen will be merged key-by-key with the default options coming from the navigator. Whenever both the navigator and screen define the same option (e.g. headerTintColor), the screen wins. Therefore, you could change the tint color when ProfileScreen is active by doing the following:

```
class ProfileScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: 'black',
  };
  ...
}
```

### Navigation Option Reference 

List of available navigation options depends on the navigator the screen is added to.
Check available options for:
- drawer navigator
- stack navigator
- tab navigator

