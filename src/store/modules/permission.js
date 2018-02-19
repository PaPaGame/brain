import { asyncRouterMap, constantRouterMap } from "@/router";

/**
 * 通过路由的meta属性判断当前用户是否有权限访问
 * 
 * @param {any} roles 
 * @param {any} router 
 */
function hasPermission(roles, router) {
    if (router.meta && router.meta.roles) {
        return roles.some(role => router.meta.roles.indexOf(role) >= 0);
    } else {
        return false;
    }
}

function filterAsyncRouter(asyncRouterMap, roles) {
    var accessRouters = asyncRouterMap;

    return accessRouters;
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                let roles = data;
                let accessRouters;
                var arr = [];
                if (roles.indexOf('admin') >= 0) {
                    accessRouters = asyncRouterMap;
                } else {
                    accessRouters = filterAsyncRouter(asyncRouterMap, roles);
                }
                commit("SET_ROUTERS", accessRouters);
                resolve();
            })
        }
    }
}

export default permission;