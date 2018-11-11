import router from './router';
import store from './store';
import {getToken, removeToken} from '@/utils/auth';
import {Store} from 'vuex';
import * as RoleType from '@/router/roleType';

const whiteList = ['/login'];

function hasPermission(role, permissionRoles) {
  return permissionRoles.indexOf(role) >= 0;
}

var roles = [RoleType.STUDENT, RoleType.STAFF, RoleType.MASTER, RoleType.ADMIN];
router.beforeEach((to, from, next) => {

  console.log('from: ', from);
  console.log('to: ', to);

  console.log(getToken());
  let userinfo = store.getters.userinfo;
  // 如果有token 已经登录了
  if (getToken() && userinfo.role !== '') {
    // 判断路由表
    store.dispatch('GenerateRoutes', userinfo.role).then(() => {
      router.addRoutes(store.getters.addRouters);
    });
    // 已经登录的情况下 再次访问登录页跳转dashboard
    if (to.path === '/login') {
      next({path: '/'});
    } else {
      // 已经登录，查看是否有人物信息
      console.log(to);
      if (to.meta.roles) {
        if (hasPermission(userinfo.role, to.meta.roles)) {
          next();
        } else {
          next({path: '/401', replace: true, query: {noGoBack: true}});
        }
      } else {
        next();
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