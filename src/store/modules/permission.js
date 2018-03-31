import { asyncRouterMap, constantRouterMap } from "@/router";

/**
 * 通过路由的meta属性判断当前用户是否有权限访问
 * 
 * @param {any} roles 
 * @param {any} router 
 */
function hasPermission(role, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.indexOf(role) > -1;
    } else {
        return true;
    }
}

function filterAsyncRouter(asyncRouters, role) {
    const accessedRouters = asyncRouters.filter(route => {
        if (hasPermission(role, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, role)
            }
            return true
        }
        return false
    })
    return accessedRouters
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
            console.log("开始构建 动态路由");
            return new Promise(resolve => {
                let accessRouters;
                console.log("当前角色：", data);
                console.log("异步路由列表：", asyncRouterMap);

                accessRouters = filterAsyncRouter(asyncRouterMap, data);

                commit("SET_ROUTERS", accessRouters);
                resolve();
            })
        }
    }
}

export default permission;