import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";

const router = createRouter({
    history: createWebHistory(),  
    routes: routes
});

// router.beforeEach((to, from, next) => {
//     const publicPages = ["/home", "/login", "/register"];
//     const authRequired = !publicPages.includes(to);
//     const loggedIn = localStorage.getItem("user");

//     if(authRequired && !loggedIn) {
//         next("/login");
//     } else {
//         next();
//     }    
// });

export { router };