import axiosInstance from "./api";
import TokenService from "./token.service";
import { Loading, QSpinnerGrid } from "quasar";
import { notify } from "../plugins/notify";
import { HttpStatus } from "../common/globals";

const selfNotify = ["/auth/signin"];
const urlRefreshSession = "auth/refreshsession";

const setup = (store, router) => {
    axiosInstance.interceptors.request.use(
        async config => {
            let token = TokenService.getLocalAccessToken();
            const isRefresh = config.url === urlRefreshSession;

            if(token?.accessToken && !isRefresh) {
                const verifyDate = (new Date()).getTime() + 10000;

                if(token.expiryDate < verifyDate) {  
                    try {          
                        const res = await axiosInstance.post(urlRefreshSession, {
                            refreshToken: TokenService.getLocalRefreshToken()
                        });

                        TokenService.updateLocalTokens(res.data);
                        token.accessToken = res.data.accessToken;
                    }
                    catch(_error) {
                        return Promise.reject(_error);
                    }
                }

                config.headers["x-access-token"] = token.accessToken;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        res => {
            const isSelfNotify = selfNotify.includes(res.config.url);
            if(res.data.message && !isSelfNotify) {
                notify({ type: res.data.result, msg: res.data.message });
            }
            return res;
        },
        err => {
            if(err.response?.status === HttpStatus.Unauthorized) {
                showLoading({ message: err.response.data.message }).then(
                   () => {
                        store.dispatch("auth/logout");
                        router.push("/login");
                   }
                );
            }

            return Promise.reject(err);
        }
    );
};

function showLoading(params) {
    Loading.show({
        spinner: QSpinnerGrid,
        spinnerColor: "light-blue-7",
        message: params.message
    });

    return new Promise(resolve => {
        setTimeout(() => {
            Loading.hide();
            resolve();
        }, 5000);
    });
}

export default setup;