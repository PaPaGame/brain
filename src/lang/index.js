import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './en';
import zh from './zh';
import Cookies from 'js-cookie';

Vue.use(VueI18n);

const messages = {
    en: {
        ...en,
        ...elementEnLocale
    },
    zh: {
        ...zh,
        ...elementZhLocale
    }
};

const i18n = new VueI18n({
    locale: Cookies.get('language') || 'en',
    messages
});

export default i18n;
