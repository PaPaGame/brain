const getters = {
  userinfo: state => state.user.userinfo,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};

export default getters;