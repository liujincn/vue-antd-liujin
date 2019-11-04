<template>
    <div>
    <a-layout-header style="background: #fff; padding: 0;">
        <a-icon class="trigger" :type="$store.getters.collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsed"
                style="float: left"></a-icon>
        <breadcrumb></breadcrumb>
    </a-layout-header>
    <tag-nav></tag-nav>
    </div>
</template>
<script>
   import Breadcrumb from './Breadcrumb'
   import TagNav from './TagNav'

    export default {
        components: {
            Breadcrumb,
            TagNav
        },
        name: 'Header',
        methods: {
            // 左边菜单栏收缩
            collapsed() {
                this.$store.dispatch('toggleCollapsed')
            }
        }
    }
</script>
