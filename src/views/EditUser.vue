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
                    <!-- <div class="form-group">
                        <label><strong>Status:</strong></label>
                        {{ currentUser.published ? "Published" : "Pending" }}
                    </div> -->
                </form>

                <!-- <button class="badge badge-primary mr-2" v-if="currentUser.published" @click="updatePublished(false)">Unpublish</button>
                <button class="badge badge-primary mr-2" v-else @click="updatePublished(true)">Publish</button> -->
                <!-- <button class="badge badge-danger mr-2" @click="deleteUser">Удалить</button> -->
                <button class="btn btn-primary" @click="updateUser">
                    <font-awesome-icon :icon="['fas', 'save']"/>
                    Сохранить</button>
                <p>{{ message }}</p>
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
    setup() {
        const sidebar = {
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

        return { sidebar }
    },
    data() {
        return {
            currentUser: new User(),
            message: ""
        };
    },
    methods: {
        getUser(id) {
            console.log(`userId: ${id}`);

            UserService.getUser(id)
                .then(res => {
                    this.currentUser = res.data;
                    this.currentUser.password = "";
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);

                });
        },

        // updatePublished(isPublished) {
        //     let data = {
        //         id: this.currentUser.id,
        //         title: this.currentUser.title,
        //         description: this.currentUser.description,
        //         published: isPublished
        //     };

        //     UserService.update(this.currentUser.id, data)
        //         .then(res => {
        //             this.currentUser.published = isPublished;
        //             console.log(res.data);
        //         })
        //         .catch(err => {
        //             console.error(err);
        //         })
        // },

        updateUser() {            
            UserService.updateUser(this.currentUser.id, this.currentUser)
                .then(res => {
                    console.log(res.data);
                    // this.message = "The Tutotial was updated successfully!";
                    this.$router.push({ name: "users" });
                })
                .catch(err => {
                    console.error(err);
                    this.message = "Ошибка. Данные пользователя не сохранены"
                });
        },

        // deleteUser() {
        //     UserService.delete(this.currentUser.id)
        //         .then(res => {
        //             console.log(res.data);
        //             this.$router.push({ name: "Users" });
        //         })
        //         .catch(err => {
        //             console.error(err);
        //         });
        // }
    },
    mounted() {
        this.message = "";
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