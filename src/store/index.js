import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/modules/app'
import router from '@/store/modules/router'
import tag from '@/store/modules/tag'
import user from '@/store/modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        router,
        tag,
        user
    },
    getters: {
        collapsed: state => state.app.collapsed, //左侧菜单是否折叠
        logoShow: state => state.app.logoShow,   //左侧菜单logo是否显示
        routers: state => state.router.routers,  //路由
        addRouters: state => state.router.addRouters, //增加路由
        tagNav: state => state.tag.tagNav,             //标签tag
        selectTag: state => state.tag.selectTag,        //选中的标签tag
        token: state => state.user.token,      //token
    }
})
export default store
