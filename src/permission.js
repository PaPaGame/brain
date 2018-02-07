import router from './router';

const whiteList = ['/login', '/authredirect'];

function hasPermission(role, permissionRoles) {
    return Math.random() < 0.9 ? true : false;
}

router.beforeEach((to, from, next) => {

    console.log(to, from);

    // 如果有token 已经登录了
    if (true) {
        // 已经登录的情况下 再次访问登录页跳转dashboard
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            // 已经登录，查看是否有人物信息
            if (false) {
                //没有的话，获取人物信息
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