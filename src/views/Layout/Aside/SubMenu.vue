<template functional>
    <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
        <svg-icon :icon-class=" props.menuInfo.typeIcon"></svg-icon>
        <span>{{ props.menuInfo.meta.title }}</span>
    </span>
        <template v-for="item in props.menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.path">
                <router-link :to="item.path">
                    <svg-icon :icon-class="item.typeIcon"></svg-icon>
                    <span>{{ item.meta.title }}</span>
                </router-link>
            </a-menu-item>
            <sub-menu v-else :key="item.path" :menu-info="item"></sub-menu>
        </template>
    </a-sub-menu>
</template>

<script>
    export default {
        name: 'SubMenu',
        props: ['menuInfo']
    }
</script>

<style scoped>

</style>
