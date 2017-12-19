
数据获取
===

可以有两种方式：

1. 导航完成后获取数据

先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示。

2. 在导航完成前获取数据

导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

# 详解

### 导航完成后获取数据

eg:

```
<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

export default {
  data () {
    return {
      loading: null,
      post: null,
      error: null
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  }
  methods: {
    fetchData () {
      this.error = this.post  = null
      this.loading = true
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```

# 在导航完成前获取数据

在组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法


eg:
```
export default {
  data () {
    return {
      error: null,
      post: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }

}
```