import http from "../http-common";


class aulasService {
    index() {
        return http.get("/aulas");
    }

    create(data) {
        return http.post("/aulas", data);
    }

    show(_id) {
        return http.get(`/aulas/_id/${_id}`);
    }

    update(_id, data) {
        return http.put(`/aulas/_id/${_id}`, data);
    }

    remove(_id) {
        return http.delete(`/aulas/_id/${_id}`);
    }
    codigoaleatorio() {
        return http.get("/aulas/codigo/");
    }
    traerGrados() {
        return http.get("/grados");
    }
    traerSecciones() {
        return http.get("/secciones");
    }
    verificar(codigo) {
        return http.get(`/aulas/verificar/codigo/${codigo}`);
    }
}

export default new aulasService();