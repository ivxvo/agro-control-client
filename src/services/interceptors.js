import axiosInstance from "./api";
import TokenService from "./token.service";
import { getFingerPrint } from "../common/fingerPrint";

import { Loading, QSpinnerGrid } from "quasar";
import { notify } from "../plugins/notify";
import { HttpStatus } from "../common/globals";

const selfNotify = ["/auth/signin"];
function checkIsSelfNotified(url) {
    return selfNotify.includes(url);
}

const urlRefreshSession = "/auth/refreshsession";
function checkIsRefresh(url) {
    return urlRefreshSession === url;
}

const setup = (store, router) => {
    axiosInstance.interceptors.request.use(
        async config => {
            let token = TokenService.getLocalAccessToken();

            if(checkIsRefresh(config.url)) {
                const refreshConfig = config;
                refreshConfig.isRefresh = true;
                return refreshConfig;
            } else if(token.accessToken) {
                const verifyDate = (new Date()).getTime() + 10000;

                if(token.expiryDate < verifyDate) {  
                    try {          
                        const res = await axiosInstance.post(urlRefreshSession, {
                            refreshToken: TokenService.getLocalRefreshToken(),
                            fingerPrint: await getFingerPrint()
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
            if(res.data.message && !checkIsSelfNotified(res.config.url)) {
                notify({ type: res.data.result, msg: res.data.message });
            }
            return res;
        },
        err => {
            if(err.config.isRefresh) {
                err.config.isRefresh = false;
                return Promise.reject(err);
            }
            else if(!checkIsSelfNotified(err.config.url)) {
                if(err.response?.status === HttpStatus.Unauthorized) {
                    showLoading({ message: err.response.data.message }).then(
                    () => {
                            store.dispatch("auth/logout");
                            router.push("/login");
                        }
                    );
                } else {
                    notify({ type: err.response.data.result, msg: err.response.data.message });
                }           
            } else {
                return Promise.reject(err);
            }
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