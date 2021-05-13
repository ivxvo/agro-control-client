<template>
    <div class="col-md-12">
        <div class="card card-container">
            <!-- <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card"
            /> -->
            <div class="login-title">
                <div class="logo">
                    <i class="fas fa-seedling"></i>
                </div>
                <div class="login-title-text">Киберсофт.Агроконтроль</div>
            </div>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">Имя</label>
                    <input
                        type="text"
                        name="username"
                        class="form-control"
                        v-model="user.username"
                    />
                    <div
                        v-if="v$.user.username.$error"
                        class="alert-danger"
                    >
                        <template v-if="v$.user.username.required.$invalid">
                            Имя обязательно для заполнения
                        </template>
                        <template v-else-if="v$.user.username.minLength.$invalid">
                            Длина имени не должна быть менее {{ v$.user.username.minLength.$params.min }} символов
                        </template>
                        <template v-else-if="v$.user.username.maxLength.$invalid">
                            Длина имени не должна превышать {{ v$.user.username.maxLength.$params.max }} символов
                        </template>
                    </div>                    
                </div>
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input
                        type="password"
                        name="password"
                        class="form-control"
                        v-model="user.password"
                    />
                    <div
                        v-if="v$.user.password.$error"
                        class="alert-danger"
                    >
                        <template v-if="v$.user.password.required.$invalid">
                            Пароль обязателен для заполнения
                        </template>
                        <template v-if="v$.user.password.minLength.$invalid">
                            Пароль не должен быть менее {{ v$.user.password.minLength.$params.min }} символов
                        </template>
                        <template v-if="v$.user.password.maxLength.$invalid">
                            Пароль не должен превышать {{ v$.user.password.maxLength.$params.max }} символов
                        </template>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>Войти</span>
                    </button>
                </div>
                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
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

import User from "../models/user";

export default {
    name: "Login",
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            user: new User('', '', ''),
            loading: false,
            message: ''
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
        }
    },
    created() {
            console.log(`Logged: ${this.loggedIn}`);

        if(this.loggedIn) {
            this.$router.push('/profile');
        }
    },
    methods: {
        handleLogin() {
            // this.loading = true;

            // this.$validator.validateAll().then(isValid => {
            //     if(!isValid) {
            //         this.loading = false;
            //         return;
            //     }

            this.v$.$touch();
            if(this.v$.$error) return;

                if(this.user.username && this.user.password) {
                    this.$store.dispatch("auth/login", this.user).then(
                        () => {
                            this.$router.push("/profile");
                        },
                        error => {
                            this.loading = false;
                            if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.NotFound) {
                                this.message = `Пользователь '${this.user.username}' не найден.`;
                            }
                        }
                    )
                }
            // })
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
</style>