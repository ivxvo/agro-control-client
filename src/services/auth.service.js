import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(user) {
        return axios
            .post(API_URL + "signin", {
                username: user.username,
                password: user.password
            }).then(
                res => {
                    if(res.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                    } else {
                        return Promise.reject(res.data);
                    }

                    return res.data;
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
        return axios.post(API_URL + "signup", user, { headers: authHeader() });
    }

    verify() {
        return axios.post(API_URL + "verify", null, { headers: authHeader() });
    }
}

export default new AuthService();