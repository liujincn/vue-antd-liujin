import Cookies from 'js-cookie'

const token = {
    state: {
        token: Cookies.get('token')
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
            Cookies.set('token', token, {expires: 1 / 24});
        }
    },
    actions: {
        setToken({commit}, token) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', token)
                resolve()
            })
        }
    },
}

export default token
