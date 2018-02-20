import router from './router'
import store from './store'

const whiteList = ['/login', '/authredirect'];

function hasPermission(role, permissionRoles) {
    return Math.random() < 0.96 ? true : false;
}

var roles = [];
router.beforeEach((to, from, next) => {

    console.log(to, from);

    // 如果有token 已经登录了
    if (true) {
        // 已经登录的情况下 再次访问登录页跳转dashboard
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            // 已经登录，查看是否有人物信息
            if (roles.length === 0) {
                //没有的话，获取人物信息
                // store.dispatch("GetUserInfo").then(res => {
                roles = ["admin"];
                store.dispatch("GenerateRoutes", roles).then(() => {
                    router.addRoutes(store.getters.addRouters);
                    next({ ...to, replace: true });
                });
                // })
            } else {
                if (hasPermission("", "")) {
                    next();
                } else {
                    next({ path: '/401', replace: true, query: { noGoBack: true } });
                }
            }
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