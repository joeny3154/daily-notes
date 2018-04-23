

使用：

``` js
import bus from '@/bus'


export default {
  created () {
    bus.$on('tag-status-change', status => {
      if (status === '成功') {
        if (this.cancelResult) {
          this.cancelResult.cancel('result table request cancel')
          this.cancelResult = null
        }
        /* to get sid first, nextTick run  */
        this.$nextTick(this.fetchFromCache)
      }
    })

    bus.$on('show-expand-table', () => {
      this.visible = true
    })
  },

  beforeDestroy () {
    bus.$off('tag-status-change')
    bus.$off('show-expand-table')
  }
}


```