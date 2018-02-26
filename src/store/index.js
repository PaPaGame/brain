import Vue from 'vue';
import Vuex from "vuex";
import user from './modules/user';
import permission from './modules/permission'
import group from "./modules/group"
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        group,
        permission
    },
    getters
});

export default store;