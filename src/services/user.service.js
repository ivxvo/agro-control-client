import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class UserService {
    // getPublicContent() {
    //     return axios.get(API_URL + "all");
    // }

    // getUserBoard() {
    //     return axios.get(API_URL + "user", { headers: authHeader() });
    // }

    getUsers(params) {
        return axios.get(API_URL + `users`, { params, headers: authHeader() })            
            .catch(error => {
                if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unauthorized) {
                    this.$store.dispatch("auth/logout");
                    this.$router.push({ name: "login" });
                }
            });
    }

    // getModeratorBoard() {
    //     return axios.get(API_URL + "mod", { headers: authHeader() });
    // }

    // getAdminBoard() {
    //     return axios.get(API_URL + "admin", { headers: authHeader() });
    // }

    getUser(id) {
        return axios.get(API_URL + `user/${id}`, { headers: authHeader() })
            .catch(error => {
                if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unauthorized) {
                    this.$store.dispatch("auth/logout");
                    this.$router.push({ name: "login" });
                }
            });
    }

    updateUser(id, data) {
        return axios.put(API_URL + `user/${id}`, data, { headers: authHeader() })
            .catch(error => {
                if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unauthorized) {
                    this.$store.dispatch("auth/logout");
                    this.$router.push({ name: "login" });
                }
            });
    }
}

export default new UserService();