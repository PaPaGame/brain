import axios from 'axios';
axios.interceptors.request.use(config => {
    // 检测本地超时状态进行拦截
    // 如果不合格，跳转登录
    return config
}, error => {
    return Promise.reject(error)
});

//响应返回之时
axios.interceptors.response.use(response => {
    // if (response.data.code == 10086) {
    //     sessionStorage.loginStatus = false;
    //     location.hash = '#/login';
    //     return;
    // }
    return response
}, error => {
    return Promise.resolve(error.response)
});

const loader = (opt) => {
    const _options = {
        method: 'get',
        timeout: 10000,
        responseType: opt.responseType || 'json'
        // withCredentials: true
    };
    opt = Object.assign(_options, opt);
    return axios(opt).then((res) => {
        return res.data;
    }).catch((err) => { throw err });
}

export default loader;