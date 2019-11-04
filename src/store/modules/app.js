const app = {
    state: {
        collapsed: false,
        logoShow: false
    },
    mutations: {
        TOGGLE_COLLAPSED:(state)=> {
            state.collapsed = !state.collapsed
            if (state.logoShow) {
                setTimeout(function () {
                    state.logoShow = false
                }, 300)
            } else {
                state.logoShow = true
            }
        }
    },
    actions: {
        toggleCollapsed: ({commit})=> {
            commit('TOGGLE_COLLAPSED')
        },
    }
}

export default app
