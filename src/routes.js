import { PermissionSubject/*, PermissionAction*/ } from "./common/globals";

export const routes = [
        {
            path: "/",
            redirect: "/dashboard"
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: () => import("./views/Home.vue")
        },    
        {
            path: "/login",
            name: "login",
            component: () => import("./views/Login.vue")
        }, 
        // {
        //     path: "/admin",
        //     redirect: "/admin/users"
        // },    
        {
            path: "/admin/users",
            name: "users",
            component: () => import("./views/Users.vue"),
            meta: { permission: PermissionSubject.administration }            
        },
        {
            path: "/admin/users/register",
            component: () => import("./views/Register.vue"),
            meta: { permission: PermissionSubject.administration }
        },
        {
            path: "/admin/users/:id",
            name: "user-details",
            component: () => import("./views/EditUser.vue"),
            meta: { permission: PermissionSubject.administration }
        },
        {
            path: "/admin/roles",
            name: "roles",
            component: () => import("./views/Roles.vue"),
            meta: { permission: PermissionSubject.administration }
        },
        {
            path: "/crop-rotation",
            name: "crop-rotation",
            component: () => import("./views/CropRotation.vue"),
            meta: { permission: PermissionSubject.administration }
        }
    ];