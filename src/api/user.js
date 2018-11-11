import ajax from '@/utils/ajax';

const user = {
  getUserInfo(data) {
    return ajax({
      url: '/user/info',
      method: 'post',
      params: data
    });
  },
  login(data) {
    return ajax({
      url: '/user/login',
      method: 'post',
      params: data
    });
  },
  logout(data) {
    return ajax({
      url: '/user/logout',
      method: 'post',
      params: data
    });
  },
  dashboard(data) {
    return ajax({
      url: '/user/dashboard',
      method: 'post',
      params: data
    });
  }
};

export default user;