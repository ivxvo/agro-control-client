<template>
    <div class="col-md-12">
        <div class="card card-container">            
            <div class="login-title">
                <div class="logo">
                    <font-awesome-icon :icon="['fas', 'seedling']"/>
                </div>
                <div class="login-title-text">Киберсофт.Агроконтроль</div>
            </div>
            <form @submit.prevent="handleLogin">                
                <div v-show="message"
                    class="alert alert-danger alert-dismissible fade show"
                >
                    <h5>Авторизация</h5>
                    <span>{{ message }}</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div>
                    <q-input
                        v-model="user.username"
                        label="Имя"
                        color="light-blue-7"
                        no-error-icon
                        :error-message="errorMsgUsername"
                        :error="v$.user.username.$error"
                    ></q-input>                  
                    <q-input
                        type="password"
                        v-model="user.password"
                        label="Пароль"
                        color="light-blue-7"
                        @keydown.enter="handleLogin"
                        no-error-icon
                        :error-message="errorMsgPwd"
                        :error="v$.user.password.$error"
                    ></q-input>                   
                </div>

                <!-- </div> -->
                <!-- <div class="btn-signin">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>Войти</span>
                    </button>
                </div> -->
                <div class="btn-signin">
                <q-btn
                    color="teal"
                    text-color="light-blue-1"
                    unelevated
                    label="Войти"
                    @click="handleLogin"
                >
                </q-btn>
                </div>                
            </form>
        </div>
    </div>
</template>

<script>
/// vee-validate 4
// import { Form, Field, defineRule } from "vee-validate";
// import { required } from "@vee-validate/rules";
// defineRule("required", required);
///

import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

import { getFingerPrint } from "../common/fingerPrint";

import User from "../models/user.model";

import { notify } from "../plugins/notify";
import { fasExclamationCircle } from "@quasar/extras/fontawesome-v5";

export default {
    name: "Login",
    // setup() {
    //     return { v$: useVuelidate() }
    // },
    data() {
        return {
            v$: useVuelidate(),
            user: new User('', '', ''),
            loading: false,
            message: null,
            iconfasExclamationCircle: fasExclamationCircle
        };
    },
    validations() {
        return {
            user: {
                username: { required, minLength:minLength(3), maxLength:maxLength(20) },
                password: { required, minLength:minLength(6), maxLength:maxLength(40) }
            }
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
        }
    },
    created() {
        if(this.loggedIn) {
            this.$router.push('/dashboard');
        }
    },
    methods: {
        async handleLogin() {            
            this.v$.$touch();
            if(this.v$.$error) return;

            if(this.user.username && this.user.password) {
                const fingerPrint = await getFingerPrint()
                this.$store.dispatch("auth/login", { ...this.user, fingerPrint }).then(
                    () => {                            
                        this.$router.push("/dashboard");
                    },
                    error => {
                        this.loading = false;
                        notify({
                            app: this,
                            type: error.result,
                            msg: error.message,
                            pos: "bottom"
                        });

                    }
                )
            }
        }
    }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
  font-weight: 600;
}

input {
    background-color: #e6f2ff;
}

.card-container.card {
  max-width: 400px !important;
  padding: 40px 40px;
}

.card {
  /* background-color: #f7f7f7; */
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 150px;
  border: none;
  /* -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3); */
}

.login-title {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.login-title .logo svg {
        color: #00b377; /*#009966;*/
        margin-bottom: 20px;
        width: 55px;
        height: 55px;        
    }


.login-title-text {
    font-size: 2em;
    padding-bottom: 20px;
    font-weight: 100;
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.btn-signin {
    margin: 2rem 0;
}

</style>