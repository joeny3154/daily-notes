<template>
  <div class="layout-sider">
    <ul class="menu" :class="{
      'menu-collapsed': collapsed
      }">
      <li :class="[
          'menu-item',
          {
            'menu-item-selected': item.key === selectedKey,
            'menu-submenu': item.children && item.children.length > 0,
            'menu-submenu-open': openKeys.includes(item.key)
          }
        ]"
        v-for="item in menuList"
        @click.stop="itemClickHandle(item)"
        :key="item.key">
        <template v-if="item.children && item.children.length > 0">
          <el-popover
            popper-class="sider-popper"
            placement="right-start"
            :disabled="!collapsed"
            :value="popoverVisible"
            :visible-arrow="false"
            trigger="hover">
            <ul class="submenu-popover">
              <li class="submenu-popover-item"
                v-for="subItem in item.children"
                :key="subItem.key"
                :class="{
                  'menu-item-selected': subItem.key === selectedKey
                }"
                @click.stop="itemClickHandle(subItem)"
                >
                {{ subItem.title }}
              </li>
            </ul>
            <div class="menu-item-wrap submenu-title" slot="reference">
              <i class="item-icon iconfont" :class="'icon-' + item.icon"></i>
              <span class="item-title">{{ item.title }}</span>
              <i class="item-title-arrow el-icon-arrow-down"></i>
            </div>
          </el-popover>
          <ul class="menu menu-sub">
            <li class="menu-item"
              slot="reference"
              v-for="subItem in item.children"
              :key="subItem.key"
              :class="{
                'menu-item-selected': subItem.key === selectedKey
              }"
              @click.stop="itemClickHandle(subItem)">
              <span class="item-title sub-title">{{ subItem.title }}</span>
            </li>
          </ul>
        </template>
        <template v-else>
          <el-popover
            :disabled="!collapsed"
            placement="right-start"
            popper-class="sider-popper"
            trigger="hover"
            :value="popoverVisible"
            >
            <div class="submenu-popover-item">{{ item.title }}</div>
            <div class="menu-item-wrap" slot="reference">
              <i class="item-icon iconfont" :class="'icon-' + item.icon"></i>
              <span class="item-title">{{ item.title }}</span>
            </div>
          </el-popover>
        </template>
      </li>
    </ul>
    <div class="collapsed-btn" :class="{ collapsed: collapsed }" @click="collapsed = !collapsed">
      <i class="iconfont icon-shenzhan"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutSider',
  data () {
    return {
      collapsed: true,
      popoverVisible: false,
      selectedKey: '',
      openKeys: [],
      menuList: [
        {
          title: '活动管理',
          key: '活动管理',
          icon: 'lihe',
          children: []
        },
        {
          title: '商户管理',
          key: '商户管理',
          icon: 'shanghu',
          children: [
            {
              title: '商户黑名单',
              key: '商户黑名单'
            },
            {
              title: '商户明细',
              key: '商户明细'
            }
          ]
        }
      ]
    }
  },
  methods: {
    itemClickHandle ({ key, children }) {
      if (children && children.length > 0) {
        // 伸展or折叠
        this.changeOpenKeys(key)
        return
      }
      this.selectedKey = key
    },
    changeOpenKeys (key) {
      const { openKeys, collapsed } = this
      if (collapsed) return
      const index = openKeys.indexOf(key)
      if (index !== -1) {
        openKeys.splice(index, 1)
      } else {
        openKeys.push(key)
      }
    }
  }
}
</script>

<style lang="scss">
  .layout-sider {
    $width: 200px;
    $width-collapsed: 50px;
    $item-space: 20px;
    $icon-width: 20px;
    $icon-right-space: 15px;
    border-right: 1px solid #67C23A;
    padding: 0;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .menu {
      width: $width;
      padding: 5px 0;
      .menu-item-wrap {
        position: relative;
        padding: 10px $item-space;
        color: $theme-color;
        cursor: pointer;
      }
      .menu-item {
        .item-title {
          display: inline-block;
          color: $theme-color;
          cursor: pointer;
        }
        .item-icon {
          display: inline-block;
          width: $icon-width;
          font-size: 16px;
          margin-right: $icon-right-space;
        }
        .item-title-arrow {
          display: none;
          position: absolute;
          top: 15px;
          right: $item-space;
          transition: transform .2s ease;
        }
        &:not(:last-child) {
          margin-bottom: 5px;
        }
        &.menu-item-selected {
          .menu-item-wrap, .item-title {
            color: #fff;
          }
          background-color: $theme-color;
        }
        &.menu-submenu {
          padding: 10px 0;
          .item-title-arrow {
            display: block;
          }
        }
        &.menu-submenu-open {
          .item-title-arrow {
            transform: rotate(180deg);
          }
          .menu-sub {
            display: block;
          }
        }
      }
      &.menu-sub {
        display: none;
        .menu-item {
          padding: 10px $icon-width + $icon-right-space + $item-space;
        }
      }
      &.menu-collapsed {
        width: $width-collapsed;
        .menu-sub, .item-title, .item-title-arrow {
          display: none !important;
        }
        .menu-item {
          display: flex;
          justify-content: center;
        }
        .item-icon {
          margin-right: 0 !important;
        }
      }
    }
    .collapsed-btn {
      display: flex;
      padding-left: $item-space;
      color: $theme-color;
      margin-bottom: 20px;
      &.collapsed {
        padding-left: 0;
        justify-content: center;
      }
    }
  }
  .sider-popper {
    padding: 5px 0;
    .submenu-popover-item {
      @include ellipsis;
      padding: 0 20px;
      color: $theme-color;
      line-height: 35px;
      cursor: pointer;
      &:not(:first-child) {
        margin-top: 5px;
      }
      &.menu-item-selected {
        background-color: $theme-color;
        color: #fff;
      }
    }
  }
</style>
