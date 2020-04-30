import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/modules/app'
import router from '@/store/modules/router'
import tag from '@/store/modules/tag'
import token from '@/store/modules/token'
import user from '@/store/modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    router,
    tag,
    token,
    user
  },
  getters: {
    collapsed: state => state.app.collapsed, //左侧菜单是否折叠
    logoShow: state => state.app.logoShow,   //左侧菜单logo是否显示
    routers: state => state.router.routers,  //静态路由
    userRouters: state => state.router.userRouters, //动态路由
    tagNav: state => state.tag.tagNav,             //标签tag
    selectTag: state => state.tag.selectTag,        //选中的标签tag
    token: state => state.token.token,      //token
    //info: state => state.user.info,      //用户
  }
})
export default store
