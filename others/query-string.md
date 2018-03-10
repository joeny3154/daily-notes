https://github.com/sindresorhus/query-string


- .parse(string, [options])

将查询字符串解析为对象。 领导 ？或＃被忽略，因此您可以直接传递location.search或location.hash。

返回的对象使用Object.create（null）创建，因此没有原型