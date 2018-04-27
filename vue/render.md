# 概要

- h

- jsx

# 示例

h:

``` js
render (h, ctx) {
  // 获取props
    const { tableData, pageSize, total } = ctx.props
  // 获取事件回调
    const selectChange = ctx.listeners['select-change'] || noop
    const changePage = ctx.listeners['change-page'] || noop
    const changeSize = ctx.listeners['change-size'] || noop
    const selectionChange = ctx.listeners['multi-select-change'] || noop

    const columns = columnCustom ? ctx.slots().default : tableTitle.map(item => h('el-table-column', {
      props: {
        minWidth: '200px',
        prop: item.name,
        label: item.label,
        sortable: true,
        resizable: true,
        showOverflowTooltip: true
      }
    }))

    return h('div',
      {
        class: 'edw-table-wrapper'
      },
      [
        h('el-table',
          {
            props: {
              data: tableData,
              border: true,
              tooltipEffect: 'dark',
              highlightCurrentRow: true,
              style: 'width: 100%',
              emptyText: emptyText || '暂无数据'
            },
            on: {
              'current-change': selectChange,
              'selection-change': selectionChange
            },
            directives: [
              {
                name: 'loading',
                value: loading
              }
            ]
          },
          columns
        ),
        h('div',
          {
            style: {
              marginTop: '10px',
              textAlign: 'right',
              position: 'relative'
            }
          },
          [
            ctx.slots().modify,
            h('el-pagination',
              {
                props: {
                  currentPage,
                  pageSizes: pageSizes || [30, 60, 80, 100],
                  pageSize,
                  layout: paginationConf.layout || 'total, sizes, prev, pager, next, jumper',
                  total
                },
                on: {
                  'current-change': changePage,
                  'size-change': changeSize
                }
              }
            )
          ]
        )
      ]
    )
  }
```

jsx:

``` jsx
render (h, { props, listeners }) {
  const { p, activeItem } = props
  const clickEvent = listeners['handle-click'] || noop

  return (
    <div class={{ 'dt-c-qy-item': true, active: activeItem.sid === p.sid }}
      onClick={ () => clickEvent(p) }>
      <div class="dt-c-qy-item__title"><span class="title">{ p.title }</span> - { p.sid }</div>
      <div class="dt-c-qy-item__status">
        <span>{ p.durationTime }</span>
        <StatusText status={ p.status }></StatusText>
      </div>
      <div class="dt-c-qy-item__date">{ p.startTime }</div>
    </div>
  )
}
```

- 事件，类似react，子组件通过调用父组件传递的方法prop实现与父组件通信