import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class UserService {
    
    getUsers(params) {
        return axios.get(API_URL + "admin/users", { params, headers: authHeader() });      

            // .catch(error => {
            //     if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unauthorized) {
            //         this.$store.dispatch("auth/logout");
            //         this.$router.push({ name: "login" });
            //     }
            // });
    }
    
    getUser(id) {
        return axios.get(API_URL + `admin/user/${id}`, { headers: authHeader() });
            // .catch(error => {
            //     if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unauthorized) {
            //         this.$store.dispatch("auth/logout");
            //         this.$router.push({ name: "login" });
            //     }
            // });
    }

    getFilteredUserProperty(params) {
        return axios.get(API_URL + "admin/users/filtered", { params, headers: authHeader() });
            // .catch(error => {
            //     if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unauthorized) {
            //         this.$store.dispatch("auth/logout");
            //         this.$router.push({ name: "login" });
            //     }
            // });
    }

    getFilteredUserRoleProperty(params) {
        return axios.get(API_URL + "admin/users/filtered", { params, headers: authHeader() });            
    }

    deleteUser(id) {
        return axios.delete(API_URL + `admin/user/${id}`, { headers: authHeader() });
    }

    updateUser(user) {
        return axios.put(API_URL + `admin/user/${user.id}`, user, { headers: authHeader() });           
    }
}

export default new UserService();