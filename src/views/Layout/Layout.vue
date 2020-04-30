<template>
  <div class="layout">
    <a-layout id="components-layout-demo-custom-trigger"
              style=" height: 100%">
      <aside-bar></aside-bar>
      <a-layout>
        <header-bar></header-bar>

        <a-layout-content :style="{ padding: '24px', }">
          <transition name="main"
                      mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import AsideBar from './Aside/AsideBar'
import HeaderBar from './Header/HeaderBar'

export default {
  name: 'layout',
  components: {
    AsideBar,
    HeaderBar
  }
}
</script>
<style>
.layout {
  height: 100%;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
}
.ant-menu-inline-collapsed .ant-menu-submenu-title span span {
  opacity: 0;
}
.ant-menu-inline-collapsed .ant-menu-item a span {
  opacity: 0;
}
</style>
