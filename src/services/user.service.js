import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
    getPublicContent() {
        return axios.get(API_URL + "all");
    }

    getUserBoard() {
        return axios.get(API_URL + "user", { headers: authHeader() });
    }

    getUsers() {
        return axios.get(API_URL + `users`, { headers: authHeader() });        
    }

    getModeratorBoard() {
        return axios.get(API_URL + "mod", { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + "admin", { headers: authHeader() });
    }

    getUser(id) {
        return axios.get(API_URL + `user/${id}`, { headers: authHeader() });
    }

    updateUser(id, data) {
        return axios.put(API_URL + `user/${id}`, data, { headers: authHeader() });
    }
}

export default new UserService();