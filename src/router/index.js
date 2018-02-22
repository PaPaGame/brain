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
        path: "",
        component: Layout,
        children: [{ path: "/school", component: _import("school/index"), name: 'school', meta: { title: "school" } }]
    },
    {
        path: "",
        component: Layout,
        children: [{ path: "/article", component: _import("school/index"), name: 'article', meta: { title: "article" } }]
    },
    {
        path: "",
        component: Layout,
        children: [{ path: "/marking", component: _import("school/index"), name: 'marking', meta: { title: "marking" } }]
    },
    {
        path: "",
        component: Layout,
        children: [{ path: "/staff", component: _import("staff/index"), name: "staff", meta: { title: "teacher" } }]
    }
];
