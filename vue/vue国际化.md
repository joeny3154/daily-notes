[vue国际化](https://blog.gavinzh.com/2017/06/08/how-to-use-vue-i18n/)
- vue-i18n引入
- 国际化样式建立

```
//获取用户浏览器优先选择语言
function get_language() {
    if (navigator.language) {
        var language = navigator.language;
    }
    else {
        var language = navigator.browserLanguage;
    }
    return language;
}
//告诉vue引入国际化插件
Vue.use(VueI18n);
// 建立翻译基础
const messages = {
    en: {
        lang: {

            browse: 'BROWSE'
        }
    },
    cn: {
        lang: {
            browse: '浏览'
        }
    }
};
//判断用户使用的语言
if (get_language()=="zh-CN"){
    loc = "cn"
}else {
    loc = "en"
}
//生成国际化插件实例
const i18n = new VueI18n({
    locale: loc, // set locale
    messages, // set locale messages
});
```
- 在vue实例中引入国际化

```
var app = new Vue({
        i18n,
        el: "#root",
        data: {
...
```

- 在html中应用国际化

```
<span v-text="$t('lang.browse')"></span>
<p>{{ $t('lang.browse') }}</p>
```
