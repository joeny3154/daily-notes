

# 注册 HTTP 服务

HttpModule添加到AppModule的imports列表中

import { HttpModule }    from '@angular/http';


`Http.get()`，还有`Http.post()`, `Http.put()`, `Http.delete()`等等。他们都返回一个 RxJS 的Observable对象

return this.http
      .get('https://api.spotify.com/v1/search?q=' + term + '&type=artist')
      .map((response) => response.json());



Angular 的Observable并没有一个toPromise操作符... 没有打包在一起发布。Angular的Observable只是一个骨架实现。



有很多像toPromise这样的操作符，用于扩展Observable，为其添加这些功能，只要从 RxJS 库中导入它们就可以了，就像这样：
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

 content_copy
import 'rxjs/add/operator/toPromise';
      我们先利用toPromise操作符把Observable直接转换成Promise对象，回到已经熟悉的地盘