import Cookies from 'js-cookie'

const token = {
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
    async setToken ({ commit }, token) {
      await commit('SET_TOKEN', token)
    }
  },
}

export default token
