import axios from 'axios';
import qs from 'qs';
axios.interceptors.request.use(config => {
  // 检测本地超时状态进行拦截
  // 如果不合格，跳转登录
  return config;
}, error => {
  return Promise.reject(error);
});
// 响应返回之时
axios.interceptors.response.use(response => {
  // if (response.data.code == 10086) {
  //     sessionStorage.loginStatus = false;
  //     location.hash = '#/login';
  //     return;
  // }
  return response;
}, error => {
  return Promise.resolve(error.response);
});

const serverUrl = process.env.API_PATH;

// const ajax = axios.create({
//     method: 'get',
//     timeout: 10000
//     // responseType: options.responseType || 'json'
// });

// export default ajax;

export const ajax = (options) => {
  const _options = {
    method: 'get',
    timeout: 10000,
    responseType: options.responseType || 'json'
    // withCredentials: true
  };
  options = Object.assign(_options, options);
  options.url = serverUrl + options.url;

  if (_options.method.toLowerCase() === 'post') {
    if (_options.params) {
      if (Object.prototype.toString.call(_options.params) === '[object FormData]') {
        _options.data = _options.params;
      } else {
        _options.data = qs.stringify(_options.params);
      }
      delete _options.params;
    }
    if (!_options.headers) {
      _options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Bearer ' + localStorage.getItem('brain_token')
      };
    }
  }

  return axios(_options).then((res) => {
    return res.data;
  }).catch((err) => {
    throw err;
  });
};

export default ajax;
