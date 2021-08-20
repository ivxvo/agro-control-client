import Alert from "../models/alert.model";

const getDefaultState = () => {
    return new Alert();
};

export const alert = {
    namespaced: true,
    state() {
        return getDefaultState();
    },
    actions: {
        // login({ commit }, user) {
            
        // }
    },
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        setAlert(state, alert) {
            state.message = alert.message;
            state.result = alert.result;
            state.caption = alert.caption;
        }
    }
};