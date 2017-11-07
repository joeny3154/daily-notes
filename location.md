
### Location 属性 (均可读可写: `location.pathname=path` or `location.pathname`)

`http://example.com:1234/test/test.htm?f=hdom_loc_search#part2`

hash	    设置或返回从井号 (#) 开始的 URL（锚）。 `#part2`
host	    设置或返回主机名和当前 URL 的端口号。 `example.com:1234`
hostname	设置或返回当前 URL 的主机名。`example.com`
href	    设置或返回完整的 URL。 `http://example.com:1234/test.htm?f=hdom_loc_search#part2`
pathname	设置或返回当前 URL 的路径部分。 `/test/test.htm`
port	    设置或返回当前 URL 的端口号。 `1234`
protocol	设置或返回当前 URL 的协议。 `http:`
search	  设置或返回从问号 (?) 开始的 URL（查询部分）。 `?f=hdom_loc_search`

### Location 对象方法
属性	描述
assign(URL)	加载新的文档。
reload()	重新加载当前文档。
replace(newURL)	用新的文档替换当前文档。


- 获取指定地址参数

function getUrlParam(name) {
  const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
  const r = window.location.search.substr(1).match(reg)
  if ( r != null ) return decodeURI(r[2])
  return null;
}