// import axios from "axios";
// import { authHeader } from "./auth-header";

import api from "./api";

// const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(params) {
        return api
            .post("/auth/signin", {
                username: params.username,
                password: params.password,
                fingerPrint: params.fingerPrint
            }).then(
                res => {
                    if(res.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                        return res.data;
                    } else {
                        return Promise.reject(res.data);
                    }
                },
                error => {
                    return Promise.reject(error.response.data);
                }
            );
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(user) {
        return api.post("/auth/signup", user);
    }

    verify() {
        return api.get("/auth/verify")
            .then(res => {
                let user = JSON.parse(localStorage.getItem("user"));

                user.username = res.data.username;
                user.email = res.data.email;
                user.role = res.data.role;
                user.permissions = res.data.permissions;

                localStorage.setItem("user", JSON.stringify(user));

                return res.data;
            });
    }

    
}

export default new AuthService();