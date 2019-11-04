import store from '@/store'
export default {
  state: {
    info: ''  // 每次刷新都要通过token请求个人信息来筛选动态路由
  },
  mutations: {
    GET_INFO (state) {
      // 省略 axios 请求代码 通过 token 向后台请求用户权限等信息，这里用假数据赋值
      state.info = {
        role: 'liujin',
        permissions: '超级管理员'
      }
      sessionStorage.setItem('info', JSON.stringify(store.getters.info))
    }
  },
  actions: {
    getInfo ({commit}, token) {
      commit('GET_INFO', token)
    }

  }
}
