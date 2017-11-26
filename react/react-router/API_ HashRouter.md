
HashRouter
======

https://reacttraining.com/react-router/web/api/HashRouter

A <Router>使用URL（即window.location.hash）的散列部分来保持您的UI与URL同步

重要提示：

哈希历史不支持location.key或location.state。
在以前的版本中，我们试图填补这个行为，但是存在我们无法解决的边缘案例。
任何需要这种行为的代码或插件将无法正常工作。
由于此技术仅用于支持传统浏览器，因此我们鼓励您将服务器配置为使用<BrowserHistory>。

- `basename`: string

所有位置的基本网址。格式正确的基本名应该有一个前导斜杠，但不能有斜线

- `getUserConfirmation`: func

用于确认导航的功能。默认使用 `window.confirm`

- `hashType`: string

用于的编码类型window.location.hash。可用的值是：

"slash"- 创建像 `#/` and `#/sunshine/lollipops`
"noslash"- 创建像 `#` and `#sunshine/lollipops`
"hashbang"- 创建像“ajax crawlable”（由Google弃用）`#!/` and` #!/sunshine/lollipops`

- `children`: node

只能包含一个子元素，否则会报错，可以使用`div`包裹