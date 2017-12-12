
编写jQuery插件
======

https://gist.github.com/quexer/3619237

要编写一个 jQuery 插件，需要为 jQuery.fn 对象增加一个新的函数属性，属性名就是插件的名字

# 上下文

在插件函数的作用域中，关键字 this 指向调用插件的 jQuery 对象。这是个经常出错的地方，因为有些情况下 jQuery 接受一个回调函数，此时 this 指向原生的 DOM 元素。这常常导致开发者在 jQuery 函数中对 this 关键字多作一次无必要的包装。

```
(function( $ ){
    $.fn.myPlugin = function() {
    
        // 没有必要再作 $(this) ，因为"this"已经是 jQuery 对象了
        // $(this) 与 $($('#element')) 是相同的
           
        this.fadeIn('normal', function(){
            // 在这里 this 关键字指向 DOM 元素
        });		    		    
    };  		
})( jQuery );
   
$('#element').myPlugin();
```
# 开始


# 保持 线性调用


# 