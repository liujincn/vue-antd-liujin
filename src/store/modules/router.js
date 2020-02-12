import {defaultRouter, addRouter} from '@/router'

const router = {
    state: {
        routers: [],
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers  // 保存动态路由用来addRouter
            state.routers = defaultRouter.concat(routers) // 所有有权限的路由表，用来生成菜单列表
        }
    },
    actions: {
        newRoutes({commit}) {
            let newArr = [...addRouter]
            commit('SET_ROUTERS', newArr)
        }
    }
}
export default router
