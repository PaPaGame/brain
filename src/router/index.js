import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

import Layout from '@/views/layout/Layout';

export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/404', component: _import('error/404'), hidden: true },
    { path: '/401', component: _import('error/401'), hidden: true },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: _import('dashboard/index'),
            name: 'dashboard',
            meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
        }]
    }
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

// 动态路由， 通常是根据权限划分给的
export const asyncRouterMap = [
    {
        path: 'reading',
        component: Layout,
        redirect: 'reading',
        meta: { roles: ['student'] },
        children: [{
            path: 'index',
            component: _import('reading/index'),
            name: 'reading',
            meta: {
                title: 'reading',
                icon: '',
                roles: ['student']
            }
        }]
    }
];
