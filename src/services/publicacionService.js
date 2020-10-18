import http from "../http-common";


class publicacionService {
    /*index() {
        return http.get("/tareas");
    }

    create(data) {
        return http.post("/tareas", data);
    }

    show(detalle) {
        return http.get(`/tareas/detallegrado/${detalle}`);
    }

    update(_id, data) {
        return http.put(`/tareas/_id/${_id}`, data);
    }

    
    codigoaleatorio() {
        return http.get("/grados/codigo/");
    }
    traerMaterias(_id) {
        return http.get(`/materias/_id/${_id}`);
    }
    traerDocente(_id) {
        return http.get(`/user/_id/${_id}`);
    }
    traerGrado(_id) {
        return http.get(`/grados/_id/${_id}`);
    }*/

    verPublicaciones(detalle) {
        return http.get(`/publicaciones/detalleaula/${detalle}`);
    }

    traerDetalle(_id) {
        return http.get(`/detalleAula/_id/${_id}`);
    }

    create(data) {
        return http.post("/publicaciones", data);
    }

    remove(_id) {
        return http.delete(`/publicaciones/_id/${_id}`);
    }

    verComentarios(publicacion) {
        return http.get(`/comentarios/publicacion/${publicacion}`);
    }

    createComentario(data) {
        return http.post("/comentarios", data);
    }
}

export default new publicacionService();
//npm run build