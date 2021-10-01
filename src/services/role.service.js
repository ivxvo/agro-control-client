import api from "./api";

class RoleService {
    
    getRoles(params) {
        return api.get("/admin/roles", { params });            
    }
    
    addRole(role) {
        return api.post("/admin/role", role);
    }
    
    updateRole(role) {
        return api.put(`/admin/role/${role.id}`, role);
    }

    deleteRole(params) {
        return api.delete(`/admin/role/${params.id}`, { params });
    }

    getFilteredRoleProperty(params) {
        return api.get("/admin/roles/filtered", { params });            
    }
}

export default new RoleService();