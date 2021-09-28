import { store } from "../store";
import { Notify, Loading, QSpinnerGrid } from "quasar";
import { fasMinusCircle } from "@quasar/extras/fontawesome-v5";

import { HttpStatus } from "../common/globals";

const publicPages = ["/", "/dashboard", "/login", "/profile"];

function checkAuthorization(to) {
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.state.auth.status ? store.state.auth.status.loggedIn : false;

    if(authRequired) {
        if(loggedIn) {
            return new Promise(resolve => {
                store.dispatch("auth/verify")
                    .then(() => {
                        resolve(true);
                    })
                    .catch(error => { 
                        let msg;
                        if(error.response && error.response.status === HttpStatus.Gone) {
                            msg = error.response.data.message;
                        } else {
                            msg = "Истёк сеанс работы в системе. Пожалуйста, авторизуйтесь..."
                        }
                        store.dispatch("auth/logout");
                        showLoading({
                            callback: resolve,
                            to: to,
                            message: msg
                        });
                    });                                                         
            });
        } else {
            return new Promise((resolve) => {                 
                showLoading({
                    callback: resolve,
                    to: to,
                    message: "Не выполнена авторизация в системе. Пожалуйста, авторизуйтесь..."
                });
            });
        }

    }

    return true;
}

function showLoading(params) {
    Loading.show({
        spinner: QSpinnerGrid,
        spinnerColor: "light-blue-7",
        message: params.message
    });
    setTimeout(() => {
        Loading.hide();

        params.callback({
            path: "/login",
            query: { redirect: params.to.fullpath }
        });
    }, 5000);
}

let dismiss;
function checkPermission(to, from) {
    if(dismiss && !to.redirectedFrom) {
        dismiss();
    }
    const permissionRequired = !publicPages.includes(to.path);
    if(permissionRequired && !store.getters["auth/checkPermission"](to.meta.permission)) {
        dismiss = Notify.create({ message: `Переход по данному адресу невозможен: ${to.fullPath}`, position: "top", color: "grey-8", icon: fasMinusCircle });
        return from;
    }
}

function toggleSidebar(to) {
    const disabledPages = ["/", "/dashboard", "/home", "/login", "/profile"];
    const showed = !disabledPages.includes(to.path);      
    store.commit("menu/showSidebar", showed);
}



export { checkAuthorization, toggleSidebar, checkPermission };