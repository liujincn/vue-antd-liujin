const router = {
  state: {
    tagNav: [
      {
        title: '首页',
        path: '/index'
      }
    ],
    selectTag: '',
    activeTag: ''
  },
  mutations: {
    ADD_TAG (state, arg) {
      state.activeTag = arg.path
      for (let i = 0; i < state.tagNav.length; i++) {
        if (state.tagNav[i].path === arg.path) {
          return false
        }
      }
      state.tagNav.push({
        title: arg.title,
        path: arg.path
      })
    },
    OPEN_MENU (state, arg) {
      state.selectTag = arg
    },
    REMOVE_TAG (state, arg) {
      let index = state.tagNav.findIndex(function (value) {
        return value.path === arg.tabItem.path
      })
      state.tagNav.splice(index, 1)
      if (arg.tabItem.path === arg.fullPath) {
        let tabActive = state.tagNav[index] || state.tagNav[index - 1]
        arg.router.push(tabActive.path)
      }
    },
    REMOVE_OTHER_TAG (state, arg) {
      state.tagNav = [{
        title: '首页',
        path: '/index'
      }]
      if (arg.all) {
        if (arg.fullPath !== '/index') {
          arg.router.push('/index')
        }
        return false
      }
      state.tagNav.push(arg.tabItem)
      if (arg.tabItem.path !== arg.fullPath) {
        arg.router.push(arg.tabItem.path)
      }
    },
  },
  actions: {
    addTag ({ commit }, arg) {
      commit('ADD_TAG', arg)
    },
    openMenu ({ commit }, arg) {
      commit('OPEN_MENU', arg)
    },
    removeTag ({ commit }, arg) {
      commit('REMOVE_TAG', arg)
    },
    removeOtherTag ({ commit }, arg) {
      commit('REMOVE_OTHER_TAG', arg)
    },
  }
}

export default router
