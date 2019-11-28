import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/icons'
import _ from 'lodash'
Vue.prototype.lodash = _
Vue.config.productionTip = false
Vue.use(Antd)
router.beforeEach((to, from, next) => {
    if (store.getters.addRouters.length === 0) {
        store.dispatch('newRoutes')
        router.addRoutes(store.getters.addRouters)
        next()
    } else {
        next()
    }
})

//  获取角色信息，根据用户权限动态加载路由
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
