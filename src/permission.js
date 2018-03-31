import router from './router'
import store from './store'
import { getToken } from "@/utils/auth";
import { Store } from 'vuex';
import * as RoleType from "@/router/roleType";

const whiteList = ['/login', '/authredirect'];

function hasPermission(role, permissionRoles) {
    return permissionRoles.indexOf(role) >= 0;
}

var roles = [RoleType.STUDENT, RoleType.STAFF, RoleType.MASTER, RoleType.ADMIN];
router.beforeEach((to, from, next) => {

    console.log("from: ", from);
    console.log("to: ", to);

    console.log(getToken());
    // 如果有token 已经登录了
    if (getToken()) {
        // 已经登录的情况下 再次访问登录页跳转dashboard
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            // 已经登录，查看是否有人物信息
            let userinfo = store.getters.userinfo;
            if (userinfo.role === "" || userinfo.userId === "") {
                userinfo = localStorage.getItem("brain_userinfo")
                if (userinfo) {
                    next();
                } else {
                    store.dispatch("getUserInfo", {}).then(res => {
                        next();
                    })
                }
            } else {
                if (hasPermission(userinfo.role, to.meta.roles)) {
                    next();
                } else {
                    next({ path: '/401', replace: true, query: { noGoBack: true } });
                }
            }
            // if (roles.indexOf(role) == -1) {
            //     //没有的话，获取人物信息
            //     store.dispatch("GenerateRoutes", roles).then(() => {
            //         router.addRoutes(store.getters.addRouters);
            //         next({ ...to, replace: true });
            //     });
            // } else {
            //     if (hasPermission(role, to.meta.roles)) {
            //         next();
            //     } else {
            //         next({ path: '/401', replace: true, query: { noGoBack: true } });
            //     }
            // }

            // if (hasPermission(role, to.meta.roles)) {
            //     next();
            // }
        }
    } else {
        // 如果没登录，但是在白名单内，直接走下一步
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
        }
    }
});

router.afterEach(() => {

});