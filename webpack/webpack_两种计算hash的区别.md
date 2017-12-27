webpack Hash
=====

Hash 文件名（vendor.f02bc2.js）是实现持久化缓存的第一步，目前 webpack 有两种计算 hash 的方式：

1. 计算所有 chunks 的 hash —— [hash]

2. 为每个 chunk 计算 hash —— [chunkhash]


第一种是每次编译生成一个唯一 hash，适合 chunk 拆分不多的小项目，但所有资源全打上同一个 hash，无法完成持久化缓存的需求。

第二种是 webpack 为每个 chunk 资源都生成与其内容相关的 hash 摘要，为不同的资源打上不同的 hash。