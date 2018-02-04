import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

import Layout from '../views/layout/Layout';

export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
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

export const asyncRouterMap = [];
