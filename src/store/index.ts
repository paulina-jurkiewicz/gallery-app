
import Vuex from "vuex";


const isDev = process.env.NODE_ENV !== 'production';

const store = () => new Vuex.Store( {
    actions: {},
    mutations: {},
    getters: {},
    modules: {},
    strict: isDev,
    devtools: true
} );

export default store;
