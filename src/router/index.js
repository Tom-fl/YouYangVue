import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        redirect: '/login',
        component: () =>
            import ('@/views/admin/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/admin/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/update_pwd',
        name: 'Update_pwd',
        component: () =>
            import ('@/views/admin/Update_pwd.vue'),
        meta: {
            title: '修改密码'
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () =>
            import ('@/views/admin/Admin.vue'),
        meta: {
            title: '管理'
        }
    },
    // 销售员
    {
        path: '/saler_list',
        name: 'SalerList',
        component: () =>
            import ('@/views/saler/SalerList.vue'),
        meta: {
            title: '销售员列表'
        }
    },
    {
        path: '/saleradd',
        name: 'SalerAdd',
        component: () =>
            import ('@/views/saler/SalerAdd.vue'),
        meta: {
            title: '添加销售员'
        }
    },
    {
        path: '/salerupdate',
        name: 'SalerUpdate',
        component: () =>
            import ('@/views/saler/SalerUpdate.vue'),
        meta: {
            title: '修改销售员'
        }
    },
    // 销售员平台
    {
        path: '/salerplatform',
        name: 'SalerPlatform',
        component: () =>
            import ('@/views/saler/SalerPlatform.vue'),
        meta: {
            title: '销售员平台'
        }
    },
    // 推广员
    {
        path: '/ea_list',
        name: 'EaList',
        component: () =>
            import ('@/views/ea/EaList.vue'),
        meta: {
            title: '推广员列表'
        }
    },
    {
        path: '/eaadd',
        name: 'EaAdd',
        component: () =>
            import ('@/views/ea/EaAdd.vue'),
        meta: {
            title: '添加推广员'
        }
    },
    {
        path: '/eaupdate',
        name: 'EaUpdate',
        component: () =>
            import ('@/views/ea/EaUpdate.vue'),
        meta: {
            title: '修改推广员'
        }
    },
    {
        path: '/eaplatform',
        name: 'EaPlatform',
        component: () =>
            import ('@/views/ea/EaPlatform.vue'),
        meta: {
            title: '推广员平台'
        }
    }
]

const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
    // 前置守卫
router.beforeEach((to, from, next) => {
    document.title = to.matched[0].meta.title

    let userName = window.sessionStorage.getItem('userName')
    if (userName !== null) {
        next();
    } else {
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login' })
        }
    }
    next()
})

export default router