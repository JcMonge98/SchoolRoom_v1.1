import http from "../http-common";
class UserService {
    allAccess() {
        return http.get("/");
    }

    getEncargadoBoard() {
        return http.get("/encargados");
    }

    getDocenteBoard() {
        return http.get("/docentes");
    }

    getAdminBoard() {
            return http.get("/admin");
        }
        //___________________________________nuevos__________________________________________
    getEncargados(roles) {
        return http.get(`/encargados/role/${roles}`);
    }
    getDocentes(roles) {
        return http.get(`/docentes/role/${roles}`);
    }
    update(_id, data) {
        return http.put(`/usuarios/_id/${_id}`, data);
    }

    remove(_id) {
        return http.delete(`/usuarios/_id/${_id}`);
    }
    correoaleatorio(nombres, apellidos) {
        return http.get(`/usuarios/correo/nombres/${nombres}/apellidos/${apellidos}`);
    }
    create(data) {
        return http.post("/auth/signup", data);
    }
    show(_id) {
        return http.get(`/usuarios/_id/${_id}`);
    }
    reestablecerP(_id) {
        return http.put(`/usuarios/resetpassword/_id/${_id}`);
    }
    updateCntr(_id, data) {
        return http.put(`/usuarios/cntr/_id/${_id}`, data);
    }

    saveUrl(_id, data) {
        return http.put(`/usuarios/url/_id/${_id}`, data);
    }
}
export default new UserService();