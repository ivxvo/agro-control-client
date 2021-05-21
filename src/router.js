import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";
import AuthService from "./services/auth.service";
import { store } from "./store";

const router = createRouter({
    history: createWebHistory(),  
    routes: routes
});

router.beforeEach((to, from, next) => {
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
});

export { router };