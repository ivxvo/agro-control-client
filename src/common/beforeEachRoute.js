import { store } from "../store";
import AuthService from "../services/auth.service";
import { Notify } from "quasar";

const publicPages = ["/", "/dashboards", "/login", "/profile"];

function checkAuthorization(to) {
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("user");

    if(authRequired) {
        if(!loggedIn) {
            // next("/login");
            return {
                path: "/login",
                query: { redirect: to.fullpath }
            }
        } else {
            AuthService.verify()
                .catch(() => {               
                    store.dispatch("auth/logout");
                    // next("/login");                    
                    return {
                        path: "/login",
                        query: { redirect: to.fullpath }
                    }
                }
            )
        }
    }
}

function toggleSidebar(to) {
    const disabledPages = ["/", "/dashboards", "/home", "/login", "/profile"];
    const showed = !disabledPages.includes(to.path);      
    store.commit("menu/showSidebar", showed);
}

function checkPermission(to) {
    const pemissionRequired = !publicPages.includes(to.path);
    if(pemissionRequired && !store.state.auth.user.permissions.includes(to.meta.permission)) {
        store.commit("menu/showSidebar", false);
        // store.commit("alert/setAlert", { message: `Переход по данному адресу невозможен: ${to.fullpath}` });
        Notify.create(`Переход по данному адресу невозможен: ${to.fullPath}`);
        return false;
    }
}

export { checkAuthorization, toggleSidebar, checkPermission };