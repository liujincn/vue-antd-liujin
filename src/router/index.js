import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout'
import Home from '@/views/Home/Index'
//懒加载
const Table = () => import('@/views/Table/TableList')
const NotFound = () => import('@/page404')
const FormPost = () => import('@/views/Form/FormPost')
const FormDemo = () => import('@/views/Form/FormDemo')
const Message = () => import('@/views/Feedback/Message')
const Bug = () => import('@/views/Feedback/Bug')
const CommerView = () => import('@/views/Multistage/CommerView')
const Second = () => import('@/views/Multistage/Second')
const Three = () => import('@/views/Multistage/Three')
const Four = () => import('@/views/Multistage/Four')
Vue.use(Router)
let defaultRouter = [
    {
        path: '/',
        redirect: '/index',
        hidden: true,
    },
    {
        path: '/404',
        component: NotFound,
        hidden: true,
    },
    {
        path: '/index',
        typeIcon: 'home',
        component: Layout,
        isOne: true,
        name: 'index',
        meta: {title: '主页'},
        children: [
            {
                path: '/index',
                component: Home,
            }
        ]
    },
    {
        path: '/form',
        name: 'form',
        typeIcon: 'home',
        meta: {title: 'form表单'},
        component: Layout,
        children: [
            {
                path: '/form-post',
                typeIcon: 'home',
                name: 'form-post',
                meta: {title: '发布'},
                component: FormPost
            },
            {
                path: '/form-demo',
                typeIcon: 'home',
                name: 'form-demo',
                meta: {title: '示例'},
                component: FormDemo
            }
        ]
    },
    {
        path: '/feedback',
        name: 'feedback',
        typeIcon: 'home',
        meta: {title: '反馈'},
        component: Layout,
        children: [
            {
                path: '/message',
                typeIcon: 'home',
                name: 'message',
                meta: {title: '聊天反馈'},
                component: Message
            },
            {
                path: '/bug',
                typeIcon: 'home',
                name: 'bug',
                meta: {title: 'Bug反馈'},
                component: Bug
            }
        ]
    },
    {
        path: '/table',
        isOne: true,
        typeIcon: 'home',
        name: 'table',
        meta: {title: '表格'},
        component: Layout,
        children: [
            {
                path: '/table',
                component: Table,
            }
        ]
    },
    {
        path: '/multistage',
        name: 'multistage',
        typeIcon: 'smile',
        meta: {title: '多级目录'},
        component: Layout,
        children: [
            {
                path: '/second',
                typeIcon: 'home',
                name: 'second',
                meta: {title: '二级-1'},
                component: Second
            },
            {
                path: '/three',
                typeIcon: 'home',
                name: 'three',
                meta: {title: '二级-2'},
                component: CommerView,
                children: [
                    {
                        path: '/three-1',
                        typeIcon: 'home',
                        meta: {title: '三级-1'},
                        component: Three
                    },
                    {
                        path: '/three-2',
                        typeIcon: 'home',
                        meta: {title: '三级-2'},
                        component: CommerView,
                        children: [
                            {
                                path: '/four-1',
                                typeIcon: 'home',
                                meta: {title: '四级-1'},
                                component: Four
                            },
                            {
                                path: '/four-2',
                                typeIcon: 'home',
                                meta: {title: '四级-2'},
                                component: Four
                            }

                        ]
                    }

                ]
            }
        ]
    },

]

let addRouter = [

    /*    {
            path: '/',
            typeIcon:'user',
            name: '公告',
            component: Layout,
            children: [
                {
                    path: '/pagePermissions',
                    typeIcon:'star',
                    name: '公告查询',
                    component: pagePermissions,
                },
                {
                    path: '/btnPermissions',
                    typeIcon:'heart',
                    name: '公告推送',
                    component: btnPermissions,
                }
            ]
        },
        {
            path: '/',
            typeIcon:'team',
            name: '广播',
            component: Layout,
            children: [
                {
                    path: '/dataTable',
                    typeIcon:'home',
                    name: '广播查询',
                    component: DataTable,
                },
                {
                    path: '/filterTable',
                    typeIcon:'eye',
                    name: '广播推送',
                    component: FilterTable,
                }
            ]
        },

        {
            path: '/',
            typeIcon:'like',
            name: '邮件任务',
            component: Layout,
            children: [
                {
                    path: '/erji1',
                    typeIcon:'home',
                    name: '邮件群发',
                    component: Erji,
                },
                {
                    path: '/erji2',
                    typeIcon:'scan',
                    name: '任务查询',
                    component: Erji2,
                }
            ]
        },
        {
            path: '/',
            typeIcon:'bulb',
            name: '统计',
            component: Layout,
            //meta: {role: ['superAdmin']},
            children: [
                {
                    path: '/upload',
                    typeIcon:'bell',
                    name: '关卡统计',
                    component: Upload,
                },
                {
                    path: '/upload',
                    typeIcon:'key',
                    name: '在线分析',
                    component: Upload,
                }
            ]
        },
        {
            path: '/',
            typeIcon:'wifi',
            name: '模拟充值',
            component: Layout,
            children: [
                {
                    path: '/markdown',
                    typeIcon:'shop',
                    name: '充值申请',
                    component: Markdown,
                },
                {
                    path: '/wangeditor',
                    typeIcon:'shop',
                    name: '我的订单',
                    component: WangeditorView,
                }
            ]
        },
        {
            path: '/navClassifies',
            typeIcon:'home',
            name: '英雄评论',
            component: Layout,
            isOne: true,
            children: [
                {
                    path: '/navClassifies',
                    typeIcon:'home',
                    name: '英雄评论管理',
                    component: Layout,
                }
            ]
        },*/


]
export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: defaultRouter
})
export {defaultRouter, addRouter}


