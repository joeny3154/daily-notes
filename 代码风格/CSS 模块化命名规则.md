

### 类名使用完整英文单词或抽掉空格的英文词组。

组件名称尽量使用名词或抽掉空格的名词性词组，这样可以降低冲突的可能性。

有且仅当有层级关系时使用“-”连接，比如组件内的元素类名采用组件名“-”子类名的形式：

``` html
<div class="uploader">
  <input type="text" class="uploader-text" />
  <input type="button" class="uploader-button" />
</div>
```

``` css
.uploader {}
.uploader-text {}
.uploader-button {}
```