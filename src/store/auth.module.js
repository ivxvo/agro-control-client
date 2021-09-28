import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ?
    {
        status: { loggedIn: true },
        user 
    } :
    {
        status: { loggedIn: false },
        user: null 
    };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, params) {
            return AuthService.login(params).then(
                user => {
                    commit("loginSuccess", user);
                    return Promise.resolve(user);
                },
                error => {
                    commit("loginFailure");
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit("logout");
        },
        verify({ commit }) {
            return AuthService.verify().then(
                user => {
                    commit("refreshUser", user);
                },
                error => {
                    commit("logout");
                    return Promise.reject(error);
                }
            );
        },
        // refreshToken({ commit }, accessToken) {
        //     commit("refreshToken", accessToken);
        // }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        refreshUser(state, user) {
            state.user.username = user.username;
            state.user.email = user.email;
            state.user.role = user.role;
            state.user.permissions = user.permissions;
        },
        // refreshToken(state, accessToken) {
        //     state.status.loggedIn = true;
        //     state.user.accessToken = accessToken;
        // }
    },
    getters: {
        checkPermission: state => permission => {
            return state.user.permissions.includes(permission);
        }
    }
};