import { asyncRouterMap, constantRouterMap } from "@/router";

/**
 * 通过路由的meta属性判断当前用户是否有权限访问
 * 
 * @param {any} roles 
 * @param {any} router 
 */
function hasPermisstion(roles, router) {
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

const permisstion = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mapMutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data;
                let accessRouters;
                if (roles.indexOf('admin') >= 0) {
                    accessRouters = asyncRouterMap;
                } else {
                    accessRouters = filterAsyncRouter(asyncRouterMap, roles);
                    resolve();
                }
            })
        }
    }
}

export default permisstion;