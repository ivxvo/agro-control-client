<template>
    <Sidebar
        :header="sidebar.header"
        :backward="sidebar.backward"
        :items="sidebar.items"
    ></Sidebar>

    <div class="main-container">
        <div class="container-fluid">
            <div class="edit-form">
                <h4>Редактирование пользователя</h4>
                <form>
                    <div class="form-group">
                        <label for="username">Имя</label>
                        <input type="text" class="form-control" id="username" v-model="currentUser.username">
                    </div>
                    <div class="form-group">
                        <label for="email">Адрес эл. почты</label>
                        <input type="text" class="form-control" id="email" v-model="currentUser.email">
                    </div>
                     <div class="form-group">
                        <label for="password">Пароль (задать новый)</label>
                        <input type="password" class="form-control" id="password" v-model="currentUser.password">
                    </div>                    
                </form>

                <button class="btn btn-primary" @click="updateUser">
                    <font-awesome-icon :icon="['fas', 'save']"/>
                    Сохранить
                </button>
            </div>            
        </div>
    </div>
</template>

<script>
import UserService from "../services/user.service";
import User from "../models/user";

import Sidebar from "../components/Sidebar";

export default {
    name: "EditUser",
    components: {
        Sidebar
    },    
    data() {
        return {
            currentUser: new User(),
            sidebar: {
                header: {       
                    name: "addUserSidebarHeader",             
                    text: "Пользователь",
                    description: "Редактирование пользователя"
                },
                backward: {       
                        name: "addUserSidebarBackward",             
                        text: "Все пользователи",
                        img: ["fas", "angle-left"],
                        path: "/users"
                }
                ,
                items: null
                // [                                
                //     {
                //         name: "addUserSidebarItem",
                //         text: "Добавить пользователя",
                //         img: "fas fa-user-plus",
                //         path: "/register",
                //         parent: "adminMenuItem"
                //     },
                //     {
                //         name: "rolesSidebarItem",
                //         text: "Роли",
                //         img: "fas fa-user-tag",
                //         path: "",
                //         parent: "adminMenuItem"                    
                //     }
                // ]
            }
        };
    },
    methods: {
        getUser(id) {
            UserService.getUser(id)
                .then(res => {
                    this.currentUser = res.data;
                    this.currentUser.password = "";
                })
                .catch(error => {
                    console.error(error);

                });
        },
        updateUser() {            
            UserService.updateUser(this.currentUser)
                .then(res => {
                    this.$store.commit("alert/setUserAlert", { result: res.data.result, message: res.data.message, caption: "Редактирование пользователя" });
                    this.$router.push({ name: "users" });
                })
                .catch(error => {
                    this.$store.commit("alert/setUserAlert", { result: error.response.data.result, message: error.response.data.message, caption: "Редактирование пользователя" });
                });
        }       
    },
    mounted() {
        this.getUser(this.$route.params.id);
    }
}
</script>

<style scoped>
    .edit-form {
        max-width: 300px;
        /* margin:  15px; */
    }
</style>