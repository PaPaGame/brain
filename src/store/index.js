import Vue from 'vue';
import Vuex from "vuex";
import user from './modules/user';
import permission from './modules/permission';
import group from "./modules/group";
import course from "./modules/course";
import staff from "./modules/staff";
import student from "./modules/student";

import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        group,
        permission,
        course,
        staff,
        student
    },
    getters
});

export default store;