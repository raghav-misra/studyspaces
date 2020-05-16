import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: ""
    },
    mutations: {
        SET_USERNAME: (state, payload: string) => state.username = payload,
        LOG_OUT: state => {
            state.username = ""
        }
    }
});