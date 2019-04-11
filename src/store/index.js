import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const actions = {};
export const getters = {};
export const mutations = {};

export default new Vuex.Store({
    state: {},
    getters,
    actions,
    mutations,
    modules: {},
    strict: process.env.NODE_ENV !== 'production'
});
