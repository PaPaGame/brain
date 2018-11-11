import utils from '@/utils';

const user = {
  login({username, password}) {
    return utils.ajax({
      method: 'post',
      url: '/login',
      params: {
        username,
        password
      }
    });
  },
  addUser({username, password}) {
    return utils.ajax({
      method: 'post',
      url: '/regist',
      params: {
        username,
        password
      }
    });
  }
};

export default user;