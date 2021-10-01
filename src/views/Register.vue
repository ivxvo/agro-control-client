<template>
<div>

   <Sidebar
        :header="sidebar.header"
        :backward="sidebar.backward"
        :items="sidebar.items"
    ></Sidebar>

    <div class="main-container">
        <div class="container-fluid">
            <div class="edit-form">
                <h4>Добавление пользователя</h4>                
                <form @submit.prevent="handleRegister">
                    <div class="mt-5 mb-3">
                        <q-input    
                            class="mb-3"                        
                            v-model="user.username"
                            label="Имя"
                            color="light-blue-7"
                            filled
                            no-error-icon
                            :error-message="errorMsgUsername"
                            :error="v$.user.username.$error"
                        ></q-input>                  
                        <q-input
                            class="mb-3" 
                            type="password"
                            v-model="user.password"
                            label="Пароль"
                            color="light-blue-7"
                            filled
                            no-error-icon
                            :error-message="errorMsgPwd"
                            :error="v$.user.password.$error"
                        ></q-input> 
                        <q-input
                            class="mb-3" 
                            type="email"
                            v-model="user.email"
                            label="Адрес эл. почты"
                            color="light-blue-7"
                            filled
                            no-error-icon
                            :error-message="errorMsgEmail"
                            :error="v$.user.email.$error"
                        ></q-input>

                        <Dropdown2
                            class="pb-4"
                            :source="roles"
                            label="Роль"
                            :filled="true"
                            :useInput="true"
                            @item-selected="onItemSelected('roleId', $event)"
                        ></Dropdown2>
                    </div>
                    
                    <button class="btn btn-primary">Добавить</button>
                </form>
            </div>                      
        </div>
    </div>

</div>    
</template>

<script>

import useVuelidate from "@vuelidate/core";
import { required, email as pattern, minLength, maxLength } from "@vuelidate/validators";

import User from "../models/user.model";

import AuthService from "../services/auth.service";
import RoleService from "../services/role.service";

import Sidebar from "../components/Sidebar";
import Dropdown2 from "../components/Dropdown2.vue";

export default {
    name: "Register",
    components: {
        Sidebar,
        Dropdown2
    },    
    data() {        
        return {
            v$: useVuelidate(),
            user: new User(),
            roles: null,
            sidebar: {
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
                },
                items: null            
            }
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
        },
        errorMsgUsername() {
            if(this.v$.user.username.required.$invalid) {
                return "Имя обязательно для заполнения";
            } else if(this.v$.user.username.minLength.$invalid) {
                return `Длина имени должна быть не менее ${this.v$.user.username.minLength.$params.min} символов`;
            } else if(this.v$.user.username.maxLength.$invalid) {
                return `Длина имени не должна превышать ${this.v$.user.username.maxLength.$params.max} символов`;
            } else return null;
        },
        errorMsgPwd() {
            if(this.v$.user.password.required.$invalid) {
                return "Пароль обязателен для заполнения";
            } else if(this.v$.user.password.minLength.$invalid) {
                return `Длина пароля должна быть не менее ${this.v$.user.password.minLength.$params.min} символов`;
            } else if(this.v$.user.password.maxLength.$invalid) {
                return `Длина пароля не должна превышать ${this.v$.user.password.maxLength.$params.max} символов`;
            } else return null;
        },
        errorMsgEmail() {
            if(this.v$.user.email.required.$invalid) {
                return "Адрес эл. почты обязателен для заполнения";
            } else if(this.v$.user.email.pattern.$invalid) {
                return "Неверный формат адреса эл. почты";
            } else return null;
        }
    },    
    methods: {
        handleRegister() {
            this.v$.$touch();
            if(this.v$.$error) return;

            AuthService.register(this.user).then(
                res => {                  
                    this.$store.commit("alert/setAlert", { result: res.data.result, message: res.data.message, caption: "Добавление пользователя" });
                    this.$router.push({ name: "users" });
                }, () => {}
            );           
        },
        getRoles() {
            RoleService.getRoles().then(
                res => {
                    this.roles = res.data;
                }, () => {}
            );
        },
        onItemSelected(field, value) {
            this.user[field] = value;
        }
    },
    mounted() {
        this.getRoles();
    }

};
</script>

<style scoped>
    .edit-form {
        max-width: 300px;
        /* margin:  15px; */
    }
</style>