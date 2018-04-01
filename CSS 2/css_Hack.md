什么是CSS Hack？
=====

http://www.jb51.net/css/226888.html

不同的浏览器对CSS的解析结果是不同的，因此会导致相同的CSS输出的页面效果不同，这就需要CSS Hack来解决浏览器局部的兼容性问题。
而这个针对不同的浏览器写不同的CSS 代码的过程，就叫CSS Hack。


CSS Hack常见的有三种形式：CSS属性Hack、CSS选择符Hack以及IE条件注释Hack， Hack主要针对IE浏览器。

1. 属性级Hack：

比如IE6能识别下划线`_`和星号`*`，IE7能识别星号`*`，但不能识别下划线`_`，而firefox两个都不能认识。

2. 选择符级Hack：

比如IE6能识别`*html .class{}`，IE7能识别`*+html .class{}`或者`*:first-child+html .class{}`。

3. IE条件注释Hack：

IE条件注释是微软从IE5开始就提供的一种非标准逻辑语句。

比如针对所有IE：`<!–[if IE]><!–您的代码–><![endif]–>`，针对IE6及以下版本：`<!–[if lt IE 7]><!–您的代码–><![endif]–>`，这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都 会生效。

PS：条件注释只有在IE浏览器下才能执行，这个代码在非IE浏览下被当做注释视而不见。可以通过IE条件注释载入不同的CSS、JS、HTML和服务器代码等。