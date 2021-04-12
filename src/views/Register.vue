<template>
    <!-- <div class="col=md-12">
        <div class="card card-container">
            <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card"
            />
            <VeeForm @submit="handleRegister" :validation-schema="schema" v-slot="{ errors }">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <Field
                            type="text"
                            class="form-control"
                            name="username"
                        />
                        <div
                            class="alert-danger"
                            >{{ errors.username }}</div>                        
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <Field
                            type="email"
                            class="form-control"
                            name="email"
                        />
                        <div
                            class="alert-danger"
                        >{{errors.email}}</div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <Field
                            type="password"
                            class="form-control"
                            name="password"
                        />
                        <div
                            class="alert-danger"
                        >{{errors.password}}</div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block">Signup</button>
                    </div>
                </div>
            </VeeForm>

            <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}</div>
        </div>
    </div> -->

    <div class="col=md-12">
        <div class="card card-container">
            <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card"
            />
            <form @submit.prevent="handleRegister">
                <div v-if="!successful">
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
                        <button class="btn btn-primary btn-block">Регистрация</button>
                    </div>
                </div>
            </form>

            <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}</div>
        </div>
    </div>
</template>

<script>
// import { Form as VeeForm, Field, defineRule } from "vee-validate";
// import { required, email, min, max } from "@vee-validate/rules";

// import User from "../models/user";

// defineRule("required", required);
// defineRule("email", email);
// defineRule("min", min);
// defineRule("max", max);

// export default {
//     name: "Register",
//     components: {
//         VeeForm,
//         Field
//     },
//     data() {
//         const schema = {
//             username: "required|min:3|max:20",
//             email: "required|email|max:50",
//             password: "required|min:6|max:40"
//         };
//         return {
//             user: new User("", "", ""),
//             submitted: false,
//             successful: false,
//             message: "",
//             schema
//         };
//     },
//     computed: {
//         loggedIn() {
//             return this.$store.state.auth.status.loggedIn;
//         }
//     },
//     mounted() {
//         if(this.loggedIn) {
//             this.$router.push("/profile");
//         }
//     },
//     methods: {
//         handleRegister() {
//             this.message = "";
//             this.submitted = true;
//             // this.$validator.validate().then(isValid => {
//             //     if(isValid) {
//             //         this.$store.dispatch("auth/register", this.user).then(
//             //             data => {
//             //                 this.message = data.message;
//             //                 this.successful = true;
//             //             },
//             //             error => {
//             //                 this.message =
//             //                     (error.response && error.response.data) ||
//             //                     error.message ||
//             //                     error.toString();
//             //                 this.successful = false;
//             //             }
//             //         );
//             //     }
//             // });
//         }
//     }
// };

/////////////////////////////////////
import useVuelidate from "@vuelidate/core";
import { required, email as pattern, minLength, maxLength } from "@vuelidate/validators";

import User from "../models/user";

export default {
    name: "Register",
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        // const schema = {
        //     username: "required|min:3|max:20",
        //     email: "required|email|max:50",
        //     password: "required|min:6|max:40"
        // };
        return {
            user: new User("", "", ""),
            submitted: false,
            successful: false,
            message: "",
            // schema
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
    mounted() {
        if(this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        handleRegister() {
            this.message = "";

            this.v$.$touch();
            if(this.v$.$error) return;

            // this.submitted = true;
            // this.$validator.validate().then(isValid => {
            //     if(isValid) {
            //         this.$store.dispatch("auth/register", this.user).then(
            //             data => {
            //                 this.message = data.message;
            //                 this.successful = true;
            //             },
            //             error => {
            //                 this.message =
            //                     (error.response && error.response.data) ||
            //                     error.message ||
            //                     error.toString();
            //                 this.successful = false;
            //             }
            //         );
            //     }
            // });
        }
    }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
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