

# 参考

http://www.jianshu.com/p/8b38d1b654f9

https://reactnavigation.org/docs/navigators/navigation-prop

# Screen Navigation Prop

您的应用程序中的每个screen都将收到包含以下内容的navigation props

`navigate` - 链接到其他屏幕 (helper) link to other screens

`state` - screen的当前state和routes 

`setParams` - (helper)改变route的参数 

`goBack` - (helper)关闭激活的screen并且返回 

`dispatch` - 发送一个action到router 

###  navigate

const {navigate} = this.props.navigation

`navigate(routeName, params, action)`

`routeName` - A destination routeName that has been registered somewhere in the app's router

`params` - Params to merge into the destination route

`action` - (advanced) The sub-action to run in the child router, if the screen is a navigator. See Actions Doc for a full list of supported actions.

### `state` screen的当前state/route

screen可以通过this.props.navigation.state访问其route。 每个都将返回一个具有以下内容的对象

```
{
  // 路由器中路由配置的名称 the name of the route config in the router
  routeName: 'profile',
  //用于对路由进行排序的唯一标识符 a unique identifier used to sort routes
  key: 'main0',
  //此屏幕的字符串选项的可选对象 an optional object of string options for this screen
  params: { hello: 'world' }
}
```

```
class ProfileScreen extends React.Component {
  render() {
    const {state} = this.props.navigation;
    // state.routeName === 'Profile'
    return (
      <Text>Name: {state.params.name}</Text>
    );
  }
}

```

### `setParams` Make changes to route params 

Firing the setParams action allows a screen to change the params in the route, which is useful for updating the header buttons and title.

```
class ProfileScreen extends React.Component {
  render() {
    const {setParams} = this.props.navigation;
    return (
      <Button
        onPress={() => setParams({name: 'Lucy'})}
        title="Set title name to 'Lucy'"
      />
     )
   }
}

```

### `goBack` Close the active screen and move back 

Optionally provide a key, which specifies the route to go back from. By default, goBack will close the route that it is called from. If the goal is to go back anywhere, without specifying what is getting closed, call .goBack(null);

```
class HomeScreen extends React.Component {
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => goBack()}
          title="Go back from this HomeScreen"
        />
        <Button
          onPress={() => goBack(null)}
          title="Go back anywhere"
        />
        <Button
          onPress={() => goBack('screen-123')}
          title="Go back from screen-123"
        />
      </View>
     )
   }
}

```

### `dispatch` Send an action to the router

Use dispatch to send any navigation action to the router. The other navigation functions use dispatch behind the scenes.
Note that if you want to dispatch react-navigation actions you should use the action creators provided in this library.
See Navigation Actions Docs for a full list of available actions


```
import { NavigationActions } from 'react-navigation'

const navigateAction = NavigationActions.navigate({
  routeName: 'Profile',
  params: {},

  // navigate can have a nested navigate action that will be run inside the child router
  action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
})
this.props.navigation.dispatch(navigateAction)
```