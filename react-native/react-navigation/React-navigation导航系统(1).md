http://www.jianshu.com/p/4d14bd41dff3

### 安装
npm install --save react-navigation


### StactkNavigator 堆栈导航器

stack就是数据结构的堆栈技术,遵循后进先出的原理

**每一个被到导航的screen(导航画面)被放在堆栈的栈顶**,返回时候,会从栈顶弹出对应的组件

import { StackNavigator } from 'react-navigation';

- 顶级screen默认显示

```
const App = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen},
})
```

### 传递参数

```
const { navigate } = this.props.navigation;
<Button onPress={() => navigate('Chat', { user: 'Lucy' })} title="Chat with Lucy"/>
```

- Screen Navigation Options

优先级低于在导航器中的StackNavigatorConfig 
https://reactnavigation.org/docs/navigators/stack

###  TabNavigator 巢式导航器

```
const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});
```