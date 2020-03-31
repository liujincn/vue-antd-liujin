import {defaultRouter,userRouters} from '@/router'

const router = {
    state: {
        routers: [],
        userRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.userRouters = routers
            state.routers = defaultRouter.concat(routers)
        }
    },
    actions: {
        setRouters({commit}) {
            const routes = [...userRouters]  //还没有做权限判断，直接取userRouters
            commit('SET_ROUTERS', routes)
        }
    }
}
export default router
