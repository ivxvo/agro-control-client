<template>

    <Sidebar
        :header="sidebar.header"
        :backward="sidebar.backward"
        :items="sidebar.items"
    ></Sidebar>

    <div class="main-container">
        <div class="container-fluid"
            v-tooltip="{
                'displayArrow': true,
                theme: {
                    placement: 'top',
                    //width: 'fit-content',
                    'background-color': 'var(--color-gray)',
                    'color': 'var(--color-black)',
                    'font-size': 'var(--tooltip-font-size)'
                }
            }"
        >
            <Grid
                :data="getStructuredData()"
                :columns="columns"
            >
                 <template v-slot:colLink="user">
                     <div v-tooltip="'Редактировать'">
                        <router-link :to="'/users/' + user.row.id">
                            <i class="fas fa-pen-square"></i>                        
                        </router-link>
                    </div>
                </template>
                <template v-slot:colButton="user">
                    <button>{{ user.row.id }}</button>
                </template>
            </Grid>
        </div>
    </div>    
</template>

<script>
import UserService from "../services/user.service";
import Grid from "../components/Grid";
import Sidebar from "../components/Sidebar";

export default {
    name: "Users",
    components: {
        Grid,
        Sidebar
    },
    data() {
        return {
            users: [],
            columns: [
                { name: "id" },
                { name: "username" },
                { name: "email" },
                { name: "role" },
                { 
                    name: "editUser",
                    colLink: true
                },
                {
                    name: "editRole",
                    colButton: true
                }
            ],
            sidebar: {
                header: {       
                    name: "usersSidebarHeader",             
                    text: "Пользователи",
                    description: "Все пользователи"
                },
                backward: null
                // {       
                //         name: "usersSidebarItem",             
                //         text: "Все пользователи",
                //         img: "fas fa-angle-left",
                //         path: "/users"
                // }
                ,
                items: [                                
                    {
                        name: "addUserSidebarItem",
                        text: "Добавить пользователя",
                        img: "fas fa-user-plus",
                        path: "/register",
                        parent: "adminMenuItem"
                    },
                    {
                        name: "rolesSidebarItem",
                        text: "Роли",
                        img: "fas fa-user-tag",
                        path: "",
                        parent: "adminMenuItem"                    
                    }
                ]
            }
        };
    },
    mounted() {
        // UserService.getAdminBoard().then(
        //     res => {
        //         this.content = res.data;
        //     },
        //     error => {
        //         this.content =
        //             (error.response && error.response.data) ||
        //             error.message ||
        //             error.toString(); 
        //     }
        // );
        UserService.getUsers().then(
            res => {
                this.users = res.data;
            },
            error => {
                // let err =
                //     (error.response && error.response.data) ||
                //     error.message ||
                //     error.toString(); 
                // console.error(JSON.stringify(error));
                if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unathorized) {
                    this.$store.dispatch("auth/logout");
                    this.$router.push({ name: "login" });
                }
            }
        )
    },
    methods: {
        getRoles(user) {
            let roles = "";
            user.Roles.forEach((role) => {
                roles = roles.concat(role.name, "\r\n");
            });

            return roles.replace(/\r\n+$/g, "");
        },
        getStructuredData() {
            let obj = {};
            let arr = [];
            for(let user of this.users) {
                for (let col of this.columns) {
                    if(col.name == "role") {
                        obj[col.name] = this.getRoles(user);
                        continue;
                    }              
                // console.log(`col: ${JSON.stringify(col)}`);
                // console.log(`user: ${JSON.stringify(user)}`); 

                    obj[col.name] = user[col.name];
                }
                arr.push(obj);
                obj = {};
            }

            return arr;
        }
    }
};
</script>