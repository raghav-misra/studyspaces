import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
    },
    mutations: {
        logIn: state => state.isLoggedIn = true,
        logOut: state => state.isLoggedIn = false
    }
});