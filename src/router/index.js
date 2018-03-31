import Vue from 'vue';
import Router from 'vue-router';
import * as role from "./roleType";
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

import Layout from '@/views/layout/Layout';

export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/404', component: _import('error/404'), hidden: true },
    { path: '/401', component: _import('error/401'), hidden: true },
    { path: "/read", component: _import("reading/article"), name: "readArticle", hidden: true, meta: { title: "readArticle", } },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: _import('dashboard/index'),
            name: 'dashboard',
            meta: {
                title: 'dashboard', icon: 'dashboard', noCache: true,
                roles: [role.STUDENT, role.MASTER, role.STAFF, role.ADMIN]
            }
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
        children: [{ path: "/school", component: _import("school/index"), name: 'school', meta: { title: "school", roles: [role.ADMIN] } }]
    }, {
        path: "",
        component: Layout,
        children: [{
            path: "/article", component: _import("article/index"), name: 'article', meta: {
                title: "article",
                roles: [role.MASTER, role.STAFF, role.ADMIN]
            }
        }]
    }, {
        path: "",
        component: Layout,
        children: [{
            path: "/marking", component: _import("school/index"), name: 'marking', meta: {
                title: "marking",
                roles: [role.MASTER, role.STAFF, role.ADMIN]
            }
        }]
    }, {
        path: "",
        component: Layout,
        children: [{
            path: "/staff", component: _import("staff/index"), name: "staff", meta: {
                title: "staff",
                roles: [role.MASTER, role.ADMIN]
            }
        }]
    }, {
        path: "",
        component: Layout,
        children: [{
            path: "/class", component: _import("class/index"), name: "group", meta: {
                title: "group",
                roles: [role.MASTER, role.STAFF, role.ADMIN]
            }
        }]
    }, {
        path: "",
        component: Layout,
        children: [{
            path: "/student", component: _import("student/index"), name: "student", meta: {
                title: "student",
                roles: [role.MASTER, role.STAFF, role.ADMIN]
            }
        }]
    }, {
        path: "/reading",
        component: Layout,
        children: [{
            path: "", component: _import("reading/index"), name: "reading", meta: {
                title: "reading",
                roles: [role.STUDENT, role.MASTER, role.STAFF, role.ADMIN]
            }
        }]
    }
];
