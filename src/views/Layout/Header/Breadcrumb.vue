<template>
    <a-breadcrumb separator=">" class="app-breadcrumb">
        <a-breadcrumb-item v-for="item in breadList" :key="item.path">
            <router-link :to="item.path" v-if="item.meta.title">{{item.meta.title}}</router-link>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
    export default {
        created() {
            this.getBreadcrumb()
        },
        data() {
            return {
                breadList: []
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        methods: {
            getBreadcrumb() {
                let matched = this.$route.matched
                if (matched[0].name === 'index') {
                    this.breadList = matched
                }
                else {
                    matched = [{path: '/index', meta: {title: '主页'}}].concat(matched)
                    this.breadList = matched
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-breadcrumb {
        font-size: 14px;
        float: left;
        display: inline-block;
        margin-left: 10px;
        line-height: 58px;
    }
</style>
