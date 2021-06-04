import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(user) {
        return axios
            .post(API_URL + "signin", {
                username: user.username,
                password: user.password
            })
            .then(res => {
                if(res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }

                return res.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(user) {
        return axios.post(API_URL + "signup", {
            username: user.username,
            email: user.email,
            password: user.password
        },
        { headers: authHeader() })        
    }

    verify() {
        return axios.post(API_URL + "verify", null, { headers: authHeader() });
    }
}

export default new AuthService();