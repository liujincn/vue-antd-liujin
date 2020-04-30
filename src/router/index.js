import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout'
import Home from '@/views/Home/Index'
//懒加载
const Log = () => import('@/views/Log/Index')
const NotFound = () => import('@/page404')
const Login = () => import('@/views/Login/Index')
const FormPost = () => import('@/views/Form/FormPost')
const FormDemo = () => import('@/views/Form/FormDemo')
const Message = () => import('@/views/Feedback/Message')
const Bug = () => import('@/views/Feedback/Bug')
const CommerView = () => import('@/views/Multistage/CommerView')
const Second = () => import('@/views/Multistage/Second')
const Three = () => import('@/views/Multistage/Three')
const Four = () => import('@/views/Multistage/Four')
Vue.use(Router)
const defaultRouter = [
  {
    path: '/',
    redirect: '/index',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    hidden: true
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/index',
    typeIcon: 'home',
    component: Layout,
    isOne: true,
    name: 'index',
    meta: { title: '主页' },
    children: [
      {
        path: '/index',
        component: Home
      }
    ]
  }
]

const userRouters = [
  {
    path: '/form',
    name: 'form',
    typeIcon: 'form',
    meta: { title: 'form表单' },
    component: Layout,
    children: [
      {
        path: '/form-post',
        typeIcon: 'formPost',
        name: 'form-post',
        meta: { title: '发布' },
        component: FormPost
      },
      {
        path: '/form-demo',
        typeIcon: 'formDemo',
        name: 'form-demo',
        meta: { title: '示例' },
        component: FormDemo
      }
    ]
  },
  {
    path: '/feedback',
    name: 'feedback',
    typeIcon: 'home',
    meta: { title: '反馈' },
    component: Layout,
    children: [
      {
        path: '/message',
        typeIcon: 'message',
        name: 'message',
        meta: { title: '聊天反馈' },
        component: Message
      },
      {
        path: '/bug',
        typeIcon: 'bug',
        name: 'bug',
        meta: { title: 'Bug反馈' },
        component: Bug
      }
    ]
  },
  {
    path: '/log',
    isOne: true,
    typeIcon: 'log',
    name: 'log',
    meta: { title: '日志' },
    component: Layout,
    children: [
      {
        path: '/log',
        component: Log
      }
    ]
  },
  {
    path: '/multistage',
    name: 'multistage',
    typeIcon: 'catalog',
    meta: { title: '多级目录' },
    component: Layout,
    children: [
      {
        path: '/second',
        typeIcon: 'two',
        name: 'second',
        meta: { title: '二级-1' },
        component: Second
      },
      {
        path: '/three',
        typeIcon: 'two',
        name: 'three',
        meta: { title: '二级-2' },
        component: CommerView,
        children: [
          {
            path: '/three-1',
            typeIcon: 'three',
            meta: { title: '三级-1' },
            component: Three
          },
          {
            path: '/three-2',
            typeIcon: 'three',
            meta: { title: '三级-2' },
            component: CommerView,
            children: [
              {
                path: '/four-1',
                typeIcon: 'four',
                meta: { title: '四级-1' },
                component: Four
              },
              {
                path: '/four-2',
                typeIcon: 'four',
                meta: { title: '四级-2' },
                component: Four
              }

            ]
          }

        ]
      }
    ]
  },
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: defaultRouter
})
export { defaultRouter, userRouters }


