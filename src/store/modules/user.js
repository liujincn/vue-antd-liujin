import Cookies from 'js-cookie'

const user = {
  state: {
    token: Cookies.get('token')
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      Cookies.set('token', token, { expires: 1 / 24 });
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token)
    }
  },
}

export default user
