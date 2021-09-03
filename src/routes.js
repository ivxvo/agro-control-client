export const getRoutes = (subject/*, action*/) => {
    return [
        {
            path: "/",
            redirect: "/dashboards"
        },
        {
            path: "/dashboards",
            name: "dashboards",
            component: () => import("./views/Home.vue")
        },    
        {
            path: "/login",
            name: "login",
            component: () => import("./views/Login.vue")
        }, 
        {
            path: "/admin",
            redirect: "/admin/users"
        },    
        {
            path: "/admin/users",
            name: "users",
            component: () => import("./views/Users.vue"),
            meta: { permission: subject.administration }            
        },
        {
            path: "/admin/users/register",
            component: () => import("./views/Register.vue"),
            meta: { permission: subject.administration }
        },
        {
            path: "/admin/users/:id",
            name: "user-details",
            component: () => import("./views/EditUser.vue"),
            meta: { permission: subject.administration }
        },
        {
            path: "/admin/roles",
            name: "roles",
            component: () => import("./views/Roles.vue"),
            meta: { permission: subject.administration }
        }        
    ];
}
