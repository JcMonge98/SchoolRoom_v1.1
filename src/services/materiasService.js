import http from "../http-common";

//__________________________________________________
/*
import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/materias';
*/
//__________________________________________________

class materiasService {
    index() {
        //return axios.get(API_URL + '/', { headers: authHeader() });
        return http.get("/materias");
    }

    create(data) {
        return http.post("/materias", data);
    }

    show() {
        return http.post("/materias", data);
        //return axios.get(API_URL + `/${id}`, { headers: authHeader() });
    }

    update(_id, data) {
        return http.put(`/materias/_id/${_id}`, data);
    }

    remove(_id) {
        return http.delete(`/materias/_id/${_id}`);
    }
}

export default new materiasService();

/*import http from "../http-common";

class materiasService {
    getAll() {
        return http.get("/materias");
    }

    get(id) {
        return http.get(`/materias/${id}`);
    }

    create(data) {
        return http.post("/materias", data);
    }

    update(id, data) {
        return http.put(`/materias/${id}`, data);
    }

    delete(id) {
        return http.delete(`/materias/${id}`);
    }

    deleteAll() {
        return http.delete(`/materias`);
    }
}

export default new materiasService();*/