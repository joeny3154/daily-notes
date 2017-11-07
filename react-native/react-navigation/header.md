
### 设置Header Title

- 使用屏幕参数（screen param）

```
static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  })
```

- 不使用屏幕参数

static navigationOptions = {
  title: 'title',
  headerRight: <Button title="Info" />,
}