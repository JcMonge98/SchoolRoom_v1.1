<template>
  <v-img
    src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg"
    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
  >
    <v-content>
      <v-row>
        <div class="offset-1 pt-8">
          <v-btn
            color="#3F51B5"
            dark
            class="mb-2 mx-auto ml-8"
            @click="borrarStorage()"
            >Volver al listado</v-btn
          >
          <!-- <v-btn
          color="green lighten-1"
          dark
          class="mb-2 mx-auto ml-8"
          @click="VerPersonas()"
        >Ver Personas</v-btn> -->
        </div>
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
                      <v-btn
                      style="border-radius: 10px"
                        color="#4A148C"
                        text
                        @click="llevarDetalle(detalle)"
                        >Entrar</v-btn
                      >
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
          <v-data-table
            style="border-radius: 15px"
            :headers="headers"
            :items="desserts"
            class="elevation-5 mr-12 ml-12 mt-2 mb-12"
          >
            <template v-slot:top>
              <!-- encabezado de la tabla -->
              <v-toolbar flat color style="border-radius: 15px">
                <v-toolbar-title>
                  <h3
                    class="text-center font-weight-bold"
                    style="color: #4A148C"
                  >
                    Personas
                  </h3>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog2" max-width="1000px">
                  <v-card>
                    <v-form ref="form" :lazy-validation="lazy">
                      <v-card-title>
                        <span class="headline">Editar Inscripcion</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                v-model="inscripcion.usuario._id"
                                :rules="RolTexto"
                                :items="docentes"
                                item-text="nombres"
                                item-value="_id"
                                label="Docente"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                v-model="inscripcion.usuario._id"
                                :rules="RolTexto"
                                :items="docentes"
                                item-text="apellidos"
                                item-value="_id"
                                label="Apellidos"
                                required
                                disabled
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="3" md="3">
                              <v-text-field
                                v-model="inscripcion.aula.codigo"
                                :rules="RolTexto"
                                label="Codigo de Aula"
                                disabled
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                              <v-select
                                v-model="inscripcion.aula.grado"
                                :rules="RolTexto"
                                :items="grados2"
                                item-text="nombre"
                                item-value="nombre"
                                label="Grado"
                                required
                                disabled
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                              <v-select
                                v-model="inscripcion.aula.seccion"
                                :rules="RolTexto"
                                :items="secciones2"
                                item-text="nombre"
                                item-value="nombre"
                                label="Seccion"
                                required
                                disabled
                              ></v-select> </v-col
                            ><v-col cols="12" sm="3" md="3">
                              <v-select
                                v-model="inscripcion.aula.turno"
                                :rules="RolTexto"
                                :items="turnos"
                                item-text="nombre"
                                item-value="_id"
                                label="Turno"
                                required
                                disabled
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="inscripcion._id"
                                :rules="RolTexto"
                                label="Id Incripcion"
                                disabled
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="inscripcion.aula._id"
                                :rules="RolTexto"
                                label="Id Aula"
                                aria-disabled=""
                                disabled
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                      <!--  <v-btn
                          color="green darken-1"
                          text
                          @click="generar2"
                          enabled
                          v-if="inscripcion.codigo != ''"
                          >Buscar Grado</v-btn 
                        > -->
                        <v-btn color="red darken-1" text @click="close2"
                          >Cancelar</v-btn
                        >
                        <v-btn
                          color="orange darken-1"
                          text
                          @click="editar"
                          v-if="inscripcion.grado != ''"
                          >Editar</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card>
                  <!-- Cierre formulario temporal -->
                </v-dialog>
              </v-toolbar>
            </template>
            <!-- Datos de la tabla -->
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                color="orange"
                class="mr-2"
                @click="editItem(item)"
                v-if="
                  currentUser.role == 'ROLE_ADMIN' &&
                    item.usuario.role.nombre == 'docente'
                "
                >mdi-pencil</v-icon
              >
              <v-icon
                small
                color="red"
                @click="deleteItem(item)"
                v-if="
                  currentUser.role == 'ROLE_ADMIN' &&
                    item.cntr == 0 &&
                    item.usuario.role.nombre != 'admin'
                "
                >mdi-delete</v-icon
              >
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
import UserService from "../services/user.service";

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
    //inscripcion: "",
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
        value: "usuario.nombres",
      },
      {
        text: "Apellidos",
        sortable: false,
        value: "usuario.apellidos",
      },
      {
        text: "Aula",
        sortable: false,
        value: "aula.numero",
      },
      {
        text: "Grado",
        sortable: false,
        value: "aula.grado.nombre",
      },
      {
        text: "Seccion",
        sortable: false,
        value: "aula.seccion.nombre",
      },
      {
        text: "Rol",
        sortable: false,
        value: "usuario.role.nombre",
      },
      /* {
        text: "Materias Inscritas",
        sortable: false,
        value: "cntr",
      }, */
      { text: "Acciones", value: "actions", sortable: false },
    ],

    desserts: [],
    dialog2: "",
    RolTexto: [(v) => !!v || "Este campo es requerido"],
    inscripcion: {
      _id: "",
      fecha_inscripcion: "",
      codigo: "",
      usuario: "",
      aula: "",
    },
    defaultItem: {
      _id: "",
      fecha_inscripcion: "",
      codigo: "",
      usuario: "",
      aula: "",
    },
    turnos: [
      {
        nombre: "Mañana",
        _id: 1,
      },
      {
        nombre: "Tarde",
        _id: 2,
      },
      {
        nombre: "Noche",
        _id: 3,
      },
    ],
    grados2: [],
    secciones2: [],
  }),
  created() {
    this.cargarMaterias();
    this.mostrarGrado();
    this.initialize();
    this.ComboGrados();
    this.ComboSecciones();
    this.ComboDocentes()
    
  },
  methods: {
    initialize() {
      var grado = JSON.parse(localStorage.getItem("aula"));
      detalleService
        .show2(grado)
        .then((res) => {
          this.detalles = res.data.detalle;
          console.log("detalles", this.detalles);
        })
        .catch((e) => {
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
        .then((res) => {
          this.grados = Array.from(res.data.aula);
          console.log("aulas", Array.from(res.data.aula));
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // ___________________________________ materias ________________________
    cargarMaterias() {
      var i = "";
      detalleService
        .traerMaterias()
        .then((res) => {
          i = res.data.materia;
          this.materias = i;
          console.log("materias", i);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    VerPersonas() {
      var aula = JSON.parse(localStorage.getItem("aula"));
      inscripcionService
        .showAdmin(aula)
        .then((res) => {
          this.desserts = Object.assign(
            [this.editedIndex],
            res.data.inscripcion
          );
          console.log(Object.assign([this.editedIndex], res.data.inscripcion));
        })
        .catch((e) => {
          console.log(e);
          console.log("neles");
        });
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      var opcion = confirm("Estas seguro de querer eliminar el registro?");
      if (opcion == true) {
        this.desserts.splice(index, 1);
        inscripcionService
          .remove(item._id)
          .then((response) => {
            console.log(response.data);
            this.$refs.form.reset();
            alert("Inscripcion eliminada con éxito");
            this.VerPersonas();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        console.log("No se elemino");
      }
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.inscripcion = Object.assign({}, item);
      //console.log(this.inscripcion)
      this.dialog2 = true;
    },
    editar() {
      var data = {
        _id: this.inscripcion._id,
        usuario: this.inscripcion.usuario,
        //aula: this.inscripcion.aula,
      };
      console.log(data);
      inscripcionService
        .update(data._id, data)
        .then((response) => {
          data._id = response.data._id;
          console.log(response.data);
          this.dialog2 = false;
          alert("Inscripcion modificada con éxito");
          this.VerPersonas();
          this.initialize();
          this.$refs.form.reset();
        })
        .catch((e) => {
          alert("No se pudo modificar");
          console.log(e);
        });
    },
    close2() {
      this.dialog2 = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.inscripcion = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.VerPersonas();
    },
    generar2() {
      var codigo = this.inscripcion.aula.codigo;
      console.log(codigo);
      inscripcionService
        .generarAula(codigo)
        .then(res => {
          console.log(res.data.aula[0]._id);
          this.inscripcion.aula._id = res.data.aula[0]._id;
          this.inscripcion.aula.numero = res.data.aula[0].numero;
          this.inscripcion.aula.turno = res.data.aula[0].turno;
          this.inscripcion.aula.grado = res.data.aula[0].grado.nombre;
          this.inscripcion.aula.seccion = res.data.aula[0].seccion.nombre;
        })
        .catch(e => {
          console.log(e);
        });
    },
    ComboGrados(){
      inscripcionService
        .traerGrados()
        .then(res => {
          this.grados2 = res.data.grados;
          console.log("grados",this.grados2)
        })
        .catch(e => {
          console.log(e);
        });
    },
    ComboSecciones(){
      inscripcionService
        .traerSecciones()
        .then(res => {
          this.secciones2 = res.data.seccion;
          console.log(this.secciones2)
        })
        .catch(e => {
          console.log(e);
        });
    },


    ComboDocentes() {
      var roles = Object.assign("5fa4e914955045001760eb71");
      console.log(roles);
      UserService.getDocentes(roles)
        .then((res) => {
          this.docentes = Array.from(res.data.usuario);
          console.log("docentes",this.docentes);

        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
