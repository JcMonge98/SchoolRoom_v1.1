<template>
  <v-content>
    <v-row>
      <div class="offset-1 pt-8">
        <v-btn
          color="purple lighten-1"
          dark
          class="mb-2 mx-auto ml-8"
          @click="borrarStorage()"
        >volver al listado</v-btn>
      </div>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" v-for="(gradi, index) in grados" :key="index">
        <div cols="12" sm="12" class="text-center">
          <v-chip class="ma-2" color="purple lighten-1" outlined x-large>
            <v-icon left>mdi-server-plus</v-icon>
            <strong>{{ gradi.grado.nombre }} "{{ gradi.seccion.nombre }}" Aula: {{ gradi.numero }}</strong>
          </v-chip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" sm="3" v-for="(detalle, index) in detalles" :key="index" class="mb-4 mr-12 mt-8 ml-12">
        <v-hover>
          <template v-slot="{ hover }" v-if="currentUser.role == 'ROLE_ENCARGADO' || currentUser.role == 'ROLE_ADMIN'">
            <v-form action>
              <v-card class="mx-auto" style="border-radius: 28px" :elevation="hover ? 24 : 2">
                <v-img class="white--text align-end" height="200px" src="../assets/fondo.jpg">
                   <v-card-title>
                    <h3>{{ detalle.materia.nombre }}</h3>
                  </v-card-title> 
                  <v-card-subtitle class="pb-0 white--text mb-4">Prof:{{' ' + detalle.inscripcion.usuario.nombres + ' ' + detalle.inscripcion.usuario.apellidos}}</v-card-subtitle>
                </v-img>
                <v-card-text class="text--primary">
                  <div>Presiona entrar, para poder vizualizar todas las tareas de esta materia..!</div>
                </v-card-text>

                <v-card-actions>
                  <div class="text-center">
                    <v-btn color="purple" text @click="llevarDetalle(detalle)">Entrar</v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-form>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-content>
</template>
<script>
import detalleService from "../services/detalleService";
import gradosService from "../services/gradosService";

export default {
  data: () => ({
    grados: [],
    lazy: "",
    user: "",
    dialog: "",
    materia: "",
    materias: [],
    listaIncripcionesXGrado: [],
    materiasuno: [],
    docentes: [],
    inscripcion: "",
    detalles: []
  }),
  created() {
    this.cargarMaterias();
    this.mostrarGrado();
    this.initialize();
  },
  methods: {
    initialize() {
      var grado = JSON.parse(localStorage.getItem("aula"));
        detalleService
          .show2(grado)
          .then(res => {
            this.detalles = res.data.detalle;
            console.log("detalles",this.detalles)
          })
          .catch(e => {
            console.log(e);
          });
    },
    // _______________________________________________________ Guardar  _____________________________________________________

    borrarStorage() {
      localStorage.removeItem("aula");
      //localStorage.removeItem("ids");
      this.$router.push("/ListadoInscripciones");
    },
    llevarDetalle(detalle) {
      localStorage.setItem("id_detalle", JSON.stringify(detalle._id));
      //localStorage.setItem("id_materia", JSON.stringify(detalle.materia._id));
      this.$router.push("/Tablon2");
    },


    mostrarGrado() {
      var _id = JSON.parse(localStorage.getItem("aula"));
      detalleService
        .traerGrados(_id)
        .then(res => {
          this.grados = Array.from(res.data.aula);
          console.log("aulas", Array.from(res.data.aula));
        })
        .catch(e => {
          console.log(e);
        });
    },
    // ___________________________________ materias ________________________
    cargarMaterias() {
      var i = "";
      detalleService
        .traerMaterias()
        .then(res => {
          i = res.data.materia;
          this.materias = i;
          console.log("materias", i);
        })
        .catch(e => {
          console.log(e);
        });
    },
    close() {
      this.$refs.form.reset();
      this.dialog = false;
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
