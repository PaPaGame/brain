// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import i18n from './lang'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/permission'
import store from '@/store'
import "./styles/iconfont/iconfont.css";
import "./styles/iconfont/iconfont.js";

Vue.config.productionTip = false

// 设置默认尺寸和默认语言
Vue.use(ElementUI, {
    size: 'medium',
    i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    i18n,
    router,
    template: '<App/>',
    components: { App }
})