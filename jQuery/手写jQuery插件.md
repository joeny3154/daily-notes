
编写jQuery插件
======

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

eg:

```
(function($) {
  $.fn.getMaxHeight = function() {
    var max = 0
    this.each(function() {
      max = Math.max(max, $(this).height())
    })
    return max
  }
})(jQuery)

```

# 保持 线性调用

必须确保插件返回this关键字

eg: 锁定尺寸插件

```
$(function() {
  $.fn.lockDimensions = function( type ) {
    // 返回this 关键字
    return this.each(function() {
      var $this = $(this)
      if(!type || type === 'width') $this.width($this.width())
      if(!type || type === 'height') $this.height($this.height())
    })
  }
})(jQuery)
```

`$('div').lockDimensions('width').css('color', 'red');`

若插件无需真正的返回值，你应该一直在插件函数的立即作用域中返回 this 关键字。

调用插件时的参数会被传递到插件函数的立即作用域中。在上例中 `width` 为插件函数的 `type` 参数

# 默认设置和选项

通过 `$.extend`被扩展

eg:

```
(function($){
  $.fn.tooltip = function(options) {
    var settings = $.extend({
      location: 'top',
      'background-color': 'bule'
    })
    return this.each(function() {
      // ....
    })
  }
})(jQuery)
```

$('div').tooltip({location: 'left'})

# 命名空间

**错误方式：**

eg:

```
(function( $ ){

  $.fn.tooltip = function( options ) { 
    // 这
  };
  $.fn.tooltipShow = function( ) {
    // 不
  };
  $.fn.tooltipHide = function( ) { 
    // 好
  };
  $.fn.tooltipUpdate = function( content ) { 
    // !!!  
  };

})( jQuery );
```

**推荐方式：**把所有插件方法收集到一个对象定义当中，并通过传递方法名称字符串调用

在插件的父闭包中封装所有方法，调用时先传方法名称字符串，接下来再把你需要的其它参数传给该方法, 这种封装和架构是 jQuery 插件社区的一个标准，已经被无数插件所使用，包括 jQueryUI 中的插件和小部件

``` js
(function($) {
  var methods = {
    init: function() {
      // ...
    },
    show: function() {
      // ...
    },
    hide: function() {
      // ...
    },
    update: function(content) {
      // ...
    }
  }

  $.fn.tooltip = function(method) {
    // 调用插件方法
    if(methods.[method]) {
      return methods.[method].apply(this, Array.prototype.slice.call(this, arguments, 1))


    } 
    // 调用初始化方法
    else if (typeof methods.[method] === 'object' || !method) {
      return methods.init.apply(this, arguments)
    }
    // 方法不存在
    else {
      $.error('Method ' +  method + ' does not exist on jQuery.tooltip')
    }
  }
})(jQuery)

// 调用  init 方法
$('div').tooltip(); 

// 调用  init 方法
$('div').tooltip({
  foo : 'bar'
});

// 调用 hide 方法
$('div').tooltip('hide'); 

// 调用 update 方法
$('div').tooltip('update', 'This is the new tooltip content!');
```

# 事件

bind 方法有个鲜为人知的特性：它支持为绑定事件定义名称空间。如果你的插件要绑定事件，最好为其定义**名称空间**。这样，回头想 unbind 的时候就不会影响到相同事件类型上的其它已绑定事件。要为事件定义名称空间，把 `.<namespace>` 附到要绑定的事件类型后面即可。


``` js
(function( $ ){

  var methods = {
     init : function( options ) {
       return this.each(function(){
         // 定义名称空间
         $(window).bind('resize.tooltip', methods.reposition);
       });

     },
     destroy : function( ) {
       return this.each(function(){
         // 根据定义的名称空间解绑事件
         $(window).unbind('.tooltip');
       })
     },
     reposition : function( ) { 
       // ... 
     },
     show : function( ) { 
       // ... 
     },
     hide : function( ) {
       // ... 
     },
     update : function( content ) { 
       // ...
     }
  };

  $.fn.tooltip = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  
  };

})( jQuery );


$('#fun').tooltip();
// Some time later...
$('#fun').tooltip('destroy');
```

在本例中，当 `tooltip` 被 `init` 方法初始化的时候，它把 `reposition` 方法绑定到 `window` 对象的 `resize` 事件上，名称空间为 `tooltip`。 之后，如果开发者想要销毁对象，可以把插件的名称空间（即 `tooltip`）传给 `unbind` 方法，以便解除本插件对所有事件的绑定。这使得我们可以安全的地解除本插件的事件绑定，避免意外影响插件之外绑定的事件。

# 数据

插件开发中，你可能经常需要维护状态，或检查你的插件是否已在给定元素上做过初始化。jQuery data 方法是针对每个元素跟踪变量的好办法。不过最好能用单一对象容纳所有变量并用单一名称空间访问此对象，而不是分别跟踪一堆不同名字的数据。

eg:

```
(function( $ ){

  var methods = {
     init : function( options ) {

       return this.each(function(){
         
         var $this = $(this),
             data = $this.data('tooltip'),
             tooltip = $('<div />', {
               text : $this.attr('title')
             });
         
         // 插件未初始化
         if ( ! data ) {
           $(this).data('tooltip', {
               target : $this,
               tooltip : tooltip
           });

         }
       });
     },
     destroy : function( ) {

       return this.each(function(){

         var $this = $(this),
             data = $this.data('tooltip');

         // Namespacing FTW
         $(window).unbind('.tooltip');
         data.tooltip.remove();
         $this.removeData('tooltip');

       })

     },
     reposition : function( ) { // ... },
     show : function( ) { // ... },
     hide : function( ) { // ... },
     update : function( content ) { // ...}
  };

  $.fn.tooltip = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  
  };

})( jQuery );
```


https://gist.github.com/quexer/3619237