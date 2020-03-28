<template>
    <div>
        <a-layout-sider
                :trigger="null"
                collapsible
                v-model="$store.getters.collapsed"
                style="height: 100%">
            <div class="logo">
                <p v-if="$store.getters.logoShow">LIU</p>
                <p v-else>vue-antd-liujin后台模板</p>
            </div>
            <a-menu
                    :selectedKeys="[$route.path]"
                    :openKeys.sync="openKeys"
                    mode="inline"
                    theme="dark"
                    class="aside">
                <template v-for="item in routes">
                    <a-menu-item v-if="item.isOne" :key="item.path">
                        <router-link :to="item.path">
                            <svg-icon :icon-class="item.typeIcon"></svg-icon>
                            <span>{{ item.meta.title }}</span>
                        </router-link>
                    </a-menu-item>
                    <sub-menu v-else :menu-info="item" :key="item.path"></sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
    </div>
</template>
<script>
    import SubMenu from "./SubMenu"
    export default {
        name: "Aside",
        components: {
            SubMenu
        },
        data() {
            return {
                openKeys: [],
                routes: [],
            };
        },
        watch: {
            // 监听浏览器直接输入路由，将此路由添加到tabnavBox
            '$route.path': function (val) {
                this.selectMenu(val)
            }
        },
        mounted() {
            this.getRoutes()
            this.selectMenu(this.$route.path)
        },
        methods: {
            // 获取不隐藏的的路由
            getRoutes() {
                let routes = this.$store.getters.routers.filter(item => !item.hidden)
                this.routes = routes
            },
            //  菜单选择
            selectMenu(key) {
                //console.log(key)
                // 左边菜单栏默认展开
                let matched = this.$route.matched.filter(item => item.path)
                for (let i = 0, len = matched.length; i < len; i++) {
                    if(this.openKeys.indexOf(matched[i].path) === -1){
                        this.openKeys.push(matched[i].path)
                    }
                }
                // 增加tabNav
                let title = ''
                for (let i = 0; i < matched.length; i++) {
                    if (matched[i].path === key) {
                        title = matched[i].meta.title
                        break
                    }
                }
                this.$store.dispatch('addTag', {
                    title: title,
                    path: key
                })
            }
        }
    }
</script>
<style scoped>
    .logo {
        background-color: #03152a !important;
        font-weight: 300;
        z-index: 999;
    }

    .logo p {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #5e6d82;
    }
</style>
