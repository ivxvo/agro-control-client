import api from "./api";

class UserService {
    
    getUsers(params) {
        return api.get("/admin/users", { params });      
    }
    
    getUser(id) {
        return api.get(`/admin/user/${id}`);
    }

    getFilteredUserProperty(params) {
        return api.get("/admin/users/filtered", { params });           
    }    

    deleteUser(user) {
        return api.delete(`/admin/user/${user.id}`, { params: user });
    }

    updateUser(user) {
        return api.put(`/admin/user/${user.id}`, user);           
    }
}

export default new UserService();