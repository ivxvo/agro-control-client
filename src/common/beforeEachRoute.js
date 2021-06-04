import { store } from "../store";
import AuthService from "../services/auth.service";

function checkAuthorization(to, next) {
    const publicPages = ["/", "/home", "/login", "/profile"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("user");

    if(authRequired) {
        if(!loggedIn) {
            next("/login");
        } else {
            AuthService.verify().then(
                () => { next(); },
                () => {               
                    store.dispatch("auth/logout");
                    next("/login");                    
                }
            )
        }
    } else {
        next();
    }
}

function toggleSidebar(to) {
    const disabledPages = ["/", "/home", "/login", "/profile"];
    const showed = !disabledPages.includes(to.path);      
    store.commit("menu/showSidebar", showed);
}

export { checkAuthorization, toggleSidebar };