import http from "../http-common";


class inscripcionService {
    index() {
        return http.get("/inscripciones");
    }

    create(data) {
        return http.post("/inscripciones", data);
    }

    show(usuario) {
        return http.get(`/inscripciones/usuario/${usuario}`);
    }
    showAdmin(aula) {
        return http.get(`/inscripciones/aula/${aula}`);
    }

    update(_id, data) {
        return http.put(`/inscripciones/_id/${_id}`, data);
    }

    remove(_id) {
        return http.delete(`/inscripciones/_id/${_id}`);
    }
    generarAula(codigo) {
        return http.get(`/aulas/codigo/${codigo}`);
    }
    traerGrados() {
        return http.get("/grados");
    }
    traerSecciones() {
        return http.get("/secciones");
    }
    traerDocentes(role) {
        return http.get(`/usuarios/role/${role}`);
    }

    inscripcionesXGrado(grado_id) {
        return http.get(`/inscripciones/aula/${grado_id}`);
    }


    updateCntr(_id, data) {
        return http.put(`/inscripciones/cntr/_id/${_id}`, data);
    }

    /*generarMateria() {
        return http.get("/materias");
    }
    generarGrado(grado) {
        return http.get(`/grados/grado/${grado}`);
    }*/

}

export default new inscripcionService();