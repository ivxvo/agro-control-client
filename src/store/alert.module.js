const getDefaultState = () => {
    return {
        userAlert: {
            message: null,
            result: null,
            caption: null
        }
    };
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
        setUserAlert(state, alert) {
            state.userAlert.message = alert.message;
            state.userAlert.result = alert.result;
            state.userAlert.caption = alert.caption;
        }
    }
};