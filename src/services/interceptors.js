import axiosInstance from "./api";
import TokenService from "./token.service";
import { getFingerPrint } from "../common/fingerPrint";

import { notify } from "../plugins/notify";
import { HttpStatus } from "../common/globals";
import EventBus from "../common/eventBus";

const selfNotify = ["/auth/signin"];
function checkIsSelfNotified(url) {
    return selfNotify.includes(url);
}

const urlRefreshSession = "/auth/refreshsession";
function checkIsRefresh(url) {
    return urlRefreshSession === url;
}

const setup = () => {
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
                    EventBus.dispatch("logout", err.response.data.message);
                } else {
                    notify({ type: err.response.data.result, msg: err.response.data.message });
                }           
            }

            return Promise.reject(err);            
        }
    );
};

export default setup;