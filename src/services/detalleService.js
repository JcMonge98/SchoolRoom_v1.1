import http from "../http-common";


class detalleService {
    index() {
        return http.get("/detalleAula");
    }

    create(data) {
        return http.post("/detalleAula", data);
    }
    show(inscripcion) {
        return http.get(`/detalleAula/inscripcion/${inscripcion}`);
    }
    show2(grado) {
        return http.get(`/detalleAula/aula/${grado}`);
    }

    update(_id, data) {
        return http.put(`/detalleAula/_id/${_id}`, data);
    }

    remove(_id) {
        return http.delete(`/detalleAula/_id/${_id}`);
    }
    traerMaterias() {
        return http.get("/materias");
    }
    traerGrados(_id) {
            return http.get(`/aulas/_id/${_id}`);
        }
        /*traerDocente(_id) {
            return http.get(`/docentes/_id/${_id}`);
        }*/
}

export default new detalleService();