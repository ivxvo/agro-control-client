import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class RoleService {
    
    getRoles(params) {
        return axios.get(API_URL + "admin/roles", { params, headers: authHeader() });            
    }
    
    addRole(role) {
        return axios.post(API_URL + "admin/role", role, { headers: authHeader() });
    }
    
    updateRole(role) {
        return axios.put(API_URL + `admin/role/${role.id}`, role, { headers: authHeader() });
    }

    deleteRole(params) {
        return axios.delete(API_URL + `admin/role/${params.id}`, { params, headers: authHeader() });
    }

    getFilteredRoleProperty(params) {
        return axios.get(API_URL + "admin/roles/filtered", { params, headers: authHeader() });            
    }
}

export default new RoleService();