

### API定义

`DrawerNavigator(RouteConfigs, DrawerNavigatorConfig)`

### RouteConfigs

### DrawerNavigatorConfig

`drawerWidth` - Width of the drawer
`drawerPosition` - Options are left or right. Default is left position.
`contentComponent` - Component used to render the content of the drawer, for example, navigation items. Receives the navigation prop for the drawer. Defaults to DrawerItems. For more information, see below.
`contentOptions` - Configure the drawer content, see below.

几个选项被传递到底层路由器来修改导航逻辑：

`initialRouteName` - The routeName for the initial route.
`order` - Array of routeNames which defines the order of the drawer items.
`paths` - Provide a mapping of routeName to path config, which overrides the paths set in the routeConfigs.
`backBehavior` - Should the back button cause switch to the initial route? If yes, set to initialRoute, otherwise none. Defaults to initialRoute behavior.

- 提供自定义contentComponent(Providing a custom contentComponent)

您可以轻松地覆盖反应导航使用的默认组件(You can easily override the default component used by react-navigation:)

```
import { DrawerItems } from 'react-navigation';

const CustomDrawerContentComponent = (props) => (
  <View style={styles.container}>
    <DrawerItems {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

```

- `contentOptions for DrawerItems`

`items` - the array of routes, can be modified or overridden
`activeItemKey` - key identifying the active route
`activeTintColor` - label and icon color of the active label
`activeBackgroundColor` - background color of the active label
`inactiveTintColor` - label and icon color of the inactive label
`inactiveBackgroundColor` - background color of the inactive label
`onItemPress(route)` - function to be invoked when an item is pressed
`style` - style object for the content section
`labelStyle` - style object to overwrite Text style inside content section, when your label is a string

```
contentOptions: {
  activeTintColor: '#e91e63',
  style: {
    marginVertical: 0,
  }
}

```


### Screen Navigation Options

`title` 
Generic title that can be used as a fallback for headerTitle and drawerLabel

`drawerLabel` 
String, React Element or a function that given { focused: boolean, tintColor: string } returns a React.Element, to display in drawer sidebar. When undefined, scene title is used

`drawerIcon` 
React Element or a function, that given { focused: boolean, tintColor: string } returns a React.Element, to display in drawer sidebar


### Navigator Props 
The navigator component created by DrawerNavigator(...) takes the following props:
screenProps - Pass down extra options to child screens, for example:
const DrawerNav = DrawerNavigator({
  // config
});

<DrawerNav
  screenProps={/* this prop will get passed to the screen components and nav options as props.screenProps */}
/>

### Nesting DrawerNavigation 
Please bear in mind that if you nest the DrawerNavigation, the drawer will show below the parent navigation.