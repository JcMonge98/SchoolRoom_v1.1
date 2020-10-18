import http from "../http-common";


class seccionesService {
    index() {
        return http.get("/secciones");
    }

    create(data) {
        return http.post("/secciones", data);
    }

    show(_id) {
        return http.get(`/secciones/_id/${_id}`);
    }

    update(_id, data) {
        return http.put(`/secciones/_id/${_id}`, data);
    }

    remove(_id) {
        return http.delete(`/secciones/_id/${_id}`);
    }
}

export default new seccionesService();