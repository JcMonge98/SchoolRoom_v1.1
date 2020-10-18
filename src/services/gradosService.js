import http from "../http-common";


class gradosService {
    index() {
        return http.get("/grados");
    }

    create(data) {
        return http.post("/grados", data);
    }

    show(_id) {
        return http.get(`/grados/_id/${_id}`);
    }

    update(_id, data) {
        return http.put(`/grados/_id/${_id}`, data);
    }

    remove(_id) {
        return http.delete(`/grados/_id/${_id}`);
    }
    codigoaleatorio() {
        return http.get("/grados/codigo/");
    }
    traerMaterias(_id) {
        return http.get(`/materias/_id/${_id}`);
    }
    inscripcionesXGrado(grado_id) {
        return http.get(`/inscripciones/grado/${grado_id}`);
    }
    verificar(codigo) {
        return http.get(`/grados/verificar/codigo/${codigo}`);
    }
}

export default new gradosService();