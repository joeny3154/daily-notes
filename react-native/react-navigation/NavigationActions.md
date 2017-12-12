
# 参考

https://reactnavigation.org/docs/navigators/navigation-actions


# Navigation Actions

所有导航操作(Navigation Actions)都会返回一个对象， 此对象可以使用navigation.dispatch（）方法发送到路由器
All Navigation Actions return an object that can be sent to the router using navigation.dispatch() method.

请注意，如果要发送反应导航操作，您应该使用此库中提供的操作创建者。`import { NavigationActions } from 'react-navigation'`
支持以下actions：

`Navigate` - Navigate to another route

`Reset` - Replace current state with a new state

`Back` - Go back to previous state

`Set Params`- Set Params for given route

`Init` - Used to initialize first state if state is undefined

### `Navigate`

The Navigate action will update the current state with the result of a Navigate action.

`routeName` - String - Required - A destination routeName that has been registered somewhere in the app's router
String - 必需 - 已在应用程序的路由器中某处注册的目标routeName

`params` - Object - Optional - Params to merge into the destination route
对象 - 可选 - 要合并到目标路由的参数

`action` - Object - Optional - (advanced) The sub-action to run in the child router, if the screen is a navigator. Any one of the actions described in this doc can be set as a sub-action.

对象 - 可选 - （高级）如果屏幕是导航器(the screen is a navigator)，则在子路由器中运行的子操作。 此文档中描述的任何一个操作都可以设置为子操作。

```
import { NavigationActions } from 'react-navigation'

const navigateAction = NavigationActions.navigate({

  routeName: 'Profile',

  params: {},

  action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
})

this.props.navigation.dispatch(navigateAction)

```

### Reset

The Reset action wipes the whole navigation state and replaces it with the result of several actions.
复位操作(Reset action)会擦除整个导航状态，并将其替换为多个操作的结果。

`index` - number - required - Index of the active route on routes array in navigation state.
数组-必选-navigation state中route数组中激活route的index.

`actions` - array - required - Array of Navigation Actions that will replace the navigation state.
数组-必选项-Navigation Actions数组,将会替代navigation state

`key` - string or null - optional - If set, the navigator with the given key will reset. If null, the root navigator will reset.
字符串或空 - 可选 - 如果设置，具有给定键的导航器将重置。 如果为null，则根导航器将重置

```
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Profile'})
  ]
})
this.props.navigation.dispatch(resetAction)

```
**如何使用`index`参数**

The index param is used to specify the current active route.
eg: given a basic stack navigation with two routes Profile and Settings. To reset the state to a point where the active screen was Settings but have it stacked on top of a Profile screen, you would do the following:

`index`参数用于指定当前的活动路由。
例如：给定一个基本的stack navigation与两个路由 `Profile`和 `Settings` 。 要将状态重置为活动`screen`为 `Settings` 但将其堆叠在 `Profile` 屏幕顶部的位置，则可以执行以下操作：

```
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Profile'}),
    NavigationActions.navigate({ routeName: 'Settings'})
  ]
})
this.props.navigation.dispatch(resetAction)

```

### Back

Go back to previous screen and close current screen. back action creator takes in one optional parameter:

返回上一screen并关闭当前screen。 拥有一个可选参数

`key` - string or null - optional - If set, navigation will go back from the given key. If null, navigation will go back anywhere.

字符串或空 - 可选 - 如果设置，导航将从给定的`key`返回。 如果为空，导航将返回任何地方。

```
import { NavigationActions } from 'react-navigation'

const backAction = NavigationActions.back({
  key: 'Profile'
})
this.props.navigation.dispatch(backAction)
```

### SetParams

When dispatching SetParams, the router will produce a new state that has changed the params of a particular route, as identified by the key

当dispatch `SetParams`时，路由器将产生一个新状态，该状态已更改特定路由的参数，以key作为身份验证

`params` - object - required - New params to be merged into existing route params

对象-必选参数-融合进已经存在的route参数中的新参数

`key` - string - required - Route key that should get the new params

字符串-必选参数-Route的key,应该分配给新的参数 

```
import { NavigationActions } from 'react-navigation'

const setParamsAction = NavigationActions.setParams({
  params: { title: 'Hello' },
  key: 'screen-123',
})
this.props.navigation.dispatch(setParamsAction)
```






