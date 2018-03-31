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

function filterAsyncRouter(asyncRouters, role) {
    console.log("准备开始筛选路由");
    let arr = asyncRouters.map(route => {
        return route.meta && route.meta.roles && route.meta.roles.indexOf(role);
    });
    console.log("map:::::", arr);
    return arr;
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
                if (data === "1000") {
                    accessRouters = asyncRouterMap;
                } else {
                    accessRouters = filterAsyncRouter(asyncRouterMap, data);
                }
                commit("SET_ROUTERS", accessRouters);
                resolve();
            })
        }
    }
}

export default permission;