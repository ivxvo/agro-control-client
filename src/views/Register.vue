<template>
   <Sidebar
        :header="sidebar.header"
        :backward="sidebar.backward"
        :items="sidebar.items"
    ></Sidebar>

    <div class="main-container">
        <div class="container-fluid">
            <div class="edit-form">
                <h4>Добавление пользователя</h4>
                <div v-if="message"
                    class="alert alert-danger alert-dismissible fade show"
                >
                    <span>{{ message }}</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="handleRegister">
                    <div>
                        <div class="form-group">
                            <label for="username">Имя</label>
                            <input
                                v-model="user.username"
                                type="text"
                                class="form-control"
                                name="username"
                            />
                            <div v-if="v$.user.username.$error"
                                class="alert-danger">
                                <template v-if="v$.user.username.required.$invalid">
                                    Имя обязательно для заполнения
                                </template>
                                <template v-else-if="v$.user.username.minLength.$invalid">
                                    Длина имени не должна быть менее {{v$.user.username.minLength.$params.min}} символов
                                </template>
                                <template v-else-if="v$.user.username.maxLength.$invalid">
                                    Длина имени не должна превышать {{v$.user.username.maxLength.$params.max}} символов
                                </template>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Адрес эл. почты</label>
                            <input
                                v-model="user.email"
                                type="email"
                                class="form-control"
                                name="email"
                            />
                            <div v-if="v$.user.email.$error"
                                class="alert-danger">
                                <template v-if="v$.user.email.required.$invalid">
                                    Адрес эл. почты обязателен для заполнения
                                </template>
                                <template v-else-if="v$.user.email.pattern.$invalid">
                                    Адрес эл. почты не корректен
                                </template>                           
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">Пароль</label>
                            <input
                                v-model="user.password"
                                type="password"
                                class="form-control"
                                name="password"
                            />
                            <div v-if="v$.user.password.$error"
                                class="alert-danger">
                                <template v-if="v$.user.password.required.$invalid">
                                    Пароль обязателен для заполнения
                                </template>
                                <template v-else-if="v$.user.password.minLength.$invalid">
                                    Пароль не должен быть менее {{v$.user.password.minLength.$params.min}} символов
                                </template>
                                <template v-else-if="v$.user.password.maxLength.$invalid">
                                    Пароль не должен превышать {{v$.user.password.maxLength.$params.max}} символов
                                </template>
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary">Добавить</button>
                        </div>
                    </div>
                </form>
            </div>           

            <!-- <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}</div> -->
        </div>
    </div>
</template>

<script>

import useVuelidate from "@vuelidate/core";
import { required, email as pattern, minLength, maxLength } from "@vuelidate/validators";

import User from "../models/user.model";
import AuthService from "../services/auth.service";
import Sidebar from "../components/Sidebar";

export default {
    name: "Register",
    components: {
        Sidebar
    },
    setup() {
        const sidebar = {
            header: {       
                name: "addUserSidebarHeader",             
                text: "Пользователь",
                description: "Добавление пользователя"
            },
            backward: {       
                    name: "addUserSidebarBackward",             
                    text: "Все пользователи",
                    img: ["fas", "angle-left"],
                    path: "/admin/users"
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

        return { v$: useVuelidate(), sidebar }
    },
    data() {        
        return {
            user: new User(),
            message: null
        };
    },
    validations () {
        return {
            user: {
                username: { required, minLength:minLength(3), maxLength:maxLength(20) },
                email: { required, pattern },
                password: { required, minLength:minLength(6), maxLength:maxLength(40) }
            },
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },    
    methods: {
        handleRegister() {
            // this.message = "";

            this.v$.$touch();
            if(this.v$.$error) return;

            // this.$store.dispatch("auth/register", this.user).then(
                AuthService.register(this.user).then(
                res => {
                    // this.message = data.message;
                    // this.successful = true;
                    console.log(res.data.message);
                    // if(res.data.result === this.ReqResult.error) {

                    // }

                    this.$store.commit("alert/setAlert", { result: res.data.result, message: res.data.message, caption: "Добавление пользователя" });
                    this.$router.push({ name: "users" });
                },
                error => {
                    // this.message =
                    //     (error.response && error.response.data) ||
                    //     error.message ||
                    //     error.toString();
                    // this.successful = false;
                    // console.log(error.response);

                    if(error.response && error.response.status === this.HttpStatus.Unauthorized) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push({ name: "login" });
                    }

                    // this.$store.commit("alert/userAdd", { result: error.response.data.result, message: error.response.data.message, caption: "Добавление пользователя" });
                    // this.$router.push({ name: "users" });

                    this.message = error.response.data.message;
                }
            );           
        }
    }
};
</script>

<style scoped>
    .edit-form {
        max-width: 300px;
        /* margin:  15px; */
    }
</style>