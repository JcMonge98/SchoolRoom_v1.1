<template>
<v-img src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" >
  <v-content>
    <v-row>
      <div class="offset-1 pt-8">
        <v-btn
          color="#3F51B5"
          dark
          class="mb-2 mx-auto ml-8"
          @click="borrarStorage()"
        >Volver al listado</v-btn>
        <!-- <v-btn
          color="green lighten-1"
          dark
          class="mb-2 mx-auto ml-8"
          @click="VerPersonas()"
        >Ver Personas</v-btn> -->
      </div>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" v-for="(gradi, index) in grados" :key="index">
        <div cols="12" sm="12" class="text-center">
          <v-chip class="ma-2" color="blue lighten-5" outlined x-large>
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
                <v-img class="blanck--text center" height="200px" src="../assets/55.jpg">
                   <br> <br> <br><v-card-title>
                    <h3>{{ detalle.materia.nombre }}</h3>
                  </v-card-title> 
                  <br>
                  <v-card-subtitle class="pb-0 black--text ">Prof:{{' ' + detalle.inscripcion.usuario.nombres + ' ' + detalle.inscripcion.usuario.apellidos}}</v-card-subtitle>
                </v-img>
                <br>
                <v-card-text class="text--primary">
                  <div>Presiona entrar, para poder vizualizar todas las tareas de esta materia..!</div>
                </v-card-text>

                <v-card-actions>
                  <div class="text-center font-weight-bold">
                    <v-btn color="#3F51B5"  text @click="llevarDetalle(detalle)">Entrar</v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-form>
          </template>
        </v-hover>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="12" sm="12">
        <v-data-table style="border-radius: 15px"
    :headers="headers"
    :items="desserts"
    class="elevation-5 mr-12 ml-12 mt-2 mb-12"
  >
    <template v-slot:top>
      <!-- encabezado de la tabla -->
      <v-toolbar flat color style="border-radius: 15px">
        <v-toolbar-title>
          <h3 class="text-center font-weight-bold" style="color: #1A237E">Personas</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <!-- Datos de la tabla -->
    <template v-slot:item.actions="{ item }">
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="VerPersonas">Ver Personas</v-btn>
    </template>
  </v-data-table>
      </v-col>
    </v-row>
  </v-content>
</v-img>
</template>
<script>
import detalleService from "../services/detalleService";
import gradosService from "../services/gradosService";

import inscripcionService from "../services/inscripcionService";

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
    detalles: [],

    headers: [
      /*{
        text: "Fecha Inscripcion",
        sortable: false,
        //value: moment(new Date("fecha_inscripcion").format("YYYY-MM-DD"))
        value:"fecha_inscripcion"
      },*/
      {
        text: "Nombre",
        sortable: false,
        value: "usuario.nombres"
      },
      {
        text: "Apellidos",
        sortable: false,
        value: "usuario.apellidos"
      },
      {
        text: "Aula",
        sortable: false,
        value: "aula.numero"
      },
      {
        text: "Grado",
        sortable: false,
        value: "aula.grado.nombre"
      },
      {
        text: "Seccion",
        sortable: false,
        value: "aula.seccion.nombre"
      },
      {
        text: "Rol",
        sortable: false,
        value: "usuario.role.nombre"
      },
      /*{ text: "Acciones", value: "actions", sortable: false }*/
    ],

    //datos para la tabla
    desserts: [],
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
    },


    VerPersonas(){
      var aula = JSON.parse(localStorage.getItem("aula"));
          inscripcionService
          .showAdmin(aula)
          .then(res => {
            this.desserts = Object.assign(
              [this.editedIndex],
              res.data.inscripcion
            );
            console.log(
              Object.assign([this.editedIndex], res.data.inscripcion)
            );
          })
          .catch(e => {
            console.log(e);
            console.log("neles");
          });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
