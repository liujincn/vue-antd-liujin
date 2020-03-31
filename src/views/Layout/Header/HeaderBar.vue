<template>
    <div>
    <a-layout-header style="background: #fff; padding: 0;">
        <a-icon class="trigger" :type="$store.getters.collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsed" style="float: left"></a-icon>
        <breadcrumb></breadcrumb>
        <div style=" float: right; margin-right: 20px;">
            <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" href="#"> {{$store.getters.token}}  <a-icon type="down" /></a>
                <a-menu slot="overlay" @click="loginOut">
                    <a-menu-item key="info">
                        个人资料
                    </a-menu-item>
                    <a-menu-item key="edit">
                        修改密码
                    </a-menu-item>
                    <a-menu-item key="loginOut">退出
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
    </a-layout-header>
    <tag-nav></tag-nav>
    </div>
</template>
<script>
    import Cookies from 'js-cookie'
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
            },
            loginOut(){
                Cookies.remove('token');
                location.reload()

            }
        }
    }
</script>
<style lang="scss">
    .personal {
        display: flex;
        flex-direction: row;
    }
</style>
