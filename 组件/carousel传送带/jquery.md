


**html:**

```
<div class="carousel">
    <% for(var i=0; i< prizeList.length; i++){%>
        <p>Selamat <%= prizeList[i].nickname %> kamu mendapatkan <%= prizeList[i].prize_name %></p>
    <% } %>
</div>
```
**css**

```
.carousel {
    height: 100%;
    overflow: hidden;
    >p {
      height: 100%;
      .ellipsis;
    }
}
```

**js:**

```
_initRecentApplyList() {
    let topTips = $('.carousel');
    if (!topTips) return;
    let len = topTips.children().length;
    if (!len) return;
    let vh = Math.round(topTips.offset().height);
    //解决rem计算高度，小数点偏差问题
    topTips.css({'height': vh + 'px', 'line-height': vh + 'px'});
    let el = topTips[0];
    if (el.scrollHeight <= vh) return;
    let index = 0;
    let next = () => {
        this.carouseTimeOut = setTimeout(() => {
            index++;
            if (index == len) {
                index = 0;
                el.scrollTop = 0;
                next();
            } else {
                this.carouseInterval = setInterval(() => {
                    el.scrollTop += 1;
                    if (el.scrollTop >= index * vh) {
                        clearInterval(this.carouseInterval);
                        next();
                    }
                }, 10);
            }
        }, 1500);
    };
    next();
}
```