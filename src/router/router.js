import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/views/Login'
import Home from '@/views/Home'
import PayMockPage from "@/views/mock/paymock.vue";
import echarts from '@/views/chart/echarts'
import NotFound from '@/views/404.vue'

Vue.use(Router)

    /**动态配置路由 */
const routes = [
    {
        path: '/Login',
        name: '',
        component: Login,
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '用户',
        iconCls: 'el-icon-news',
        children: [
            { path: '/page1', component: () => import('@/views/user/Page1'), name: '查询用户' },
            { path: '/page2', component: () => import('@/views/user/Page2'), name: '变更余额' },
            { path: '/page3', component: () => import('@/views/user/Page3'), name: '变更积分' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '交易',
        iconCls: 'el-icon-news',
        children: [
            { path: '/page4', component: () => import('@/views/trade/Page4'), name: '查询订单信息' },
            { path: '/page5', component: () => import('@/views/trade/Page5'), name: '更改取货时间' },
            { path: '/page6', component: () => import('@/views/trade/Page6'), name: '更改订单状态' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商品',
        iconCls: 'el-icon-news',
        children: [
          { path: '/page7', component: () => import('@/views/product/Page7'), name: '页面7'},
          { path: '/page8', component: () => import('@/views/product/Page8'), name: '页面8'},
          { path: '/page9', component: () => import('@/views/product/Page9'), name: '页面9'}
        ]
    },
    {
      path: '/',
      component: Home,
      name: '营销',
      iconCls: 'el-icon-news',
      children: [
        { path: '/Page10', component: () => import('@/views/marketing/Page10'), name: '页面10' },
        { path: '/Page11', component: () => import('@/views/marketing/Page11'), name: '页面11' },
        { path: '/Page12', component: () => import('@/views/marketing/Page12'), name: '页面12'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '库存',
      iconCls: 'el-icon-news',
      children: [
        { path: '/page13', component: () => import('@/views/inventory/Page13'), name: '页面13' },
        { path: '/page14', component: () => import('@/views/inventory/Page14'), name: '页面14' },
        { path: '/page15', component: () => import('@/views/inventory/Page15'), name: '页面15' }
      ]
    },
      {
        path: '/',
        component: Home,
        name: 'mgr',
        iconCls: 'el-icon-news',
        children: [
          { path: '/page16', component: () => import('@/views/mgr/Page16'), name: '页面16' },
          { path: '/page17', component: () => import('@/views/mgr/Page17'), name: '页面17' }
        ]
      },
    {
        path: '/',
        name: '统计调用数据',
        component: Home,
        iconCls: 'fa fa-bar-chart',
        children: [
          { path: '/echarts', component: echarts, name: 'echarts'}
        ]
    },
    {
        path: '/404',
        name: '',
        component: NotFound,
        hidden: true,
    },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }

]
export default routes
