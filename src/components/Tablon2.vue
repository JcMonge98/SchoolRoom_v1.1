<template v-slot:top>
  <v-row dense>
    <v-col cols="12">
      <v-card color="#1F7087" dark class="mr-5 ml-5 mt-8">
        <v-card-title
          class="headline"
          v-for="(detalle, index) in detalles"
          :key="index"
        >
          <v-row>
            <v-col cols="12" sm="12">
              <h2>{{ detalle.materia.nombre }}</h2>
            </v-col>
            <v-col cols="12" sm="12">
              <h5>
                {{
                  detalle.aula.grado.nombre +
                  " Seccion: " +
                  detalle.aula.seccion.nombre +
                  " Aula: " +
                  detalle.aula.numero
                }}
              </h5>
            </v-col>
          </v-row>
          <v-btn
            class="offset-md-10"
            tile
            outlined
            dark
            color="white"
            @click="borrarStorage()"
            v-if="currentUser.role == 'ROLE_DOCENTE'"
          >
            <v-icon left>mdi-arrow-left-bold</v-icon>Volver
          </v-btn>
          <v-btn
            class="offset-md-10"
            tile
            outlined
            dark
            color="white"
            @click="borrarStorage2()"
            v-if="
              currentUser.role == 'ROLE_ENCARGADO' ||
              currentUser.role == 'ROLE_ADMIN'
            "
          >
            <v-icon left>mdi-folder-plus</v-icon>Volver
          </v-btn>
          <!-- **********************************  showDialog Nuevo **************************************** -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn
                class
                tile
                outlined
                dark
                color="white"
                v-on="on"
                v-if="
                  currentUser.role == 'ROLE_ENCARGADO' ||
                  currentUser.role == 'ROLE_ADMIN'
                "
              >
                <v-icon left>mdi-folder-plus</v-icon>Nueva Publicación
              </v-btn>
            </template>
            <v-card>
              <v-form ref="nuevaP" :lazy-validation="lazy">
                <v-card-title>
                  <span class="headline">Nueva Publicación</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-textarea
                      v-model="publicacion.descripcion"
                      :rules="RolTexto"
                      outlined
                      label="Descripcion de tu publicación"
                    ></v-textarea>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="close1"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="guardarPublicacion"
                    v-if="publicacion.descripcion.length > 10"
                    >Publicar</v-btn
                  >
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- **********************************  showDialog Para docente **************************************** -->
          <v-dialog v-model="dialog2" max-width="900px">
            <template v-slot:activator="{ on }">
              <v-btn
                class
                tile
                outlined
                dark
                color="white"
                v-on="on"
                v-if="currentUser.role == 'ROLE_DOCENTE'"
              >
                <v-icon left>mdi-folder-plus</v-icon>Nueva Publicación
              </v-btn>
            </template>
            <v-card>
              <v-toolbar flat color="cyan" dark>
                <v-toolbar-title>Publicar</v-toolbar-title>
              </v-toolbar>
              <v-tabs vertical>
                <v-tab> <v-icon left>mdi-animation</v-icon>Publicación </v-tab>
                <v-tab> <v-icon left>mdi-calendar-clock</v-icon>Tarea </v-tab>

                <v-tab-item>
                  <v-card flat>
                    <v-form ref="form" :lazy-validation="lazy">
                      <v-container>
                        <v-textarea
                          v-model="publicacion.descripcion"
                          :rules="RolTexto"
                          outlined
                          label="Descripcion de tu publicación"
                        ></v-textarea>
                      </v-container>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="guardarPublicacion"
                        v-if="publicacion.descripcion.length > 10"
                        >Publicar</v-btn
                      >
                    </v-form>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-dialog>
        </v-card-title>
        <h4 class="ml-4"></h4>
        <v-card-subtitle class="mt-0"></v-card-subtitle>
      </v-card>
    </v-col>

    <!-- _______________________________  Esto se debe mostrar por cada tarea _________________________________________________________ -->
    <v-col
      cols="12"
      sm="12"
      md="8"
      class="offset-md-2"
      v-for="(card, index) in cards"
      :key="index"
    >
      <v-card
        color
        elevation="5"
        class="ml-12 mt-5 mr-12"
        style="border-radius: 20px"
      >
        <v-card-title class="headline">
          <v-row>
            <v-avatar color="purple" size="32" class="ml-2">
              <v-icon dark small>mdi-account-circle</v-icon>
            </v-avatar>
            <h5 class="ml-2">
              {{
                card.inscripcion.usuario.nombres +
                " " +
                card.inscripcion.usuario.apellidos
              }}
            </h5>
            <br>
            <h6 class="ml-2">{{ card.fecha_publicacion }}</h6>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
              style="border-radius: 20px"
                class="mr-2 ml-8"
                tile
                outlined
                color="success"
                @click="editItem(card)"
                v-if="
                  currentUser.role == 'ROLE_DOCENTE' && currentUser.nombres == card.inscripcion.usuario.nombres ||
                  currentUser.role == 'ROLE_ADMIN' && currentUser.nombres == card.inscripcion.usuario.nombres
                "
              >
                <v-icon small class>mdi-pencil</v-icon>Editar
              </v-btn>
              <v-btn
              style="border-radius: 20px"
                class="ml-7"
                tile
                outlined
                color="red"
                @click="deleteItem(card)"
                v-if="
                  currentUser.role == 'ROLE_DOCENTE' && currentUser.nombres == card.inscripcion.usuario.nombres ||
                  currentUser.role == 'ROLE_ADMIN' ||
                  currentUser.role == 'ROLE_ENCARGADO' && currentUser.nombres == card.inscripcion.usuario.nombres
                "
              >
                <v-icon rigth>mdi-delete</v-icon>Eliminar
              </v-btn>
              </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-0">
          <h3>{{ card.descripcion }}</h3>
        </v-card-text>
        <v-card-text class="mt-0">
          <!-- <v-row align="center">
            <v-col class="text-center" cols="12" sm="12">
              <v-btn text small color="cyan" @click="verComentarios(card)">Ver Comentarios</v-btn>||
              <v-btn text small color="red" @click="verComentarios()">Ocultar Comentarios</v-btn>
            </v-col>
          </v-row> 
          <v-row v-for="(comentario, index) in comentarios" :key="index">
            <v-avatar color="cyan" size="24" class="ml-2">
              <v-icon dark small>mdi-account-circle</v-icon>
            </v-avatar>
            <h4 class="ml-2">
              <strong>{{comentario.inscripcion.usuario.nombres + '' + comentario.inscripcion.usuario.apellidos}}</strong>&nbsp;
              <small>{{comentario.fecha_comentario}}</small>
              <br />{{comentario.descripcion}}
            </h4>
          </v-row>-->
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header @click="verComentarios(card)"
                >Ver comentarios</v-expansion-panel-header
              >
              <v-expansion-panel-content
                v-for="(comentario, index) in comentarios"
                :key="index"
              >
                <v-row v-if="card._id == comentario.publicacion">
                  <v-avatar color="cyan" size="24" class="ml-2">
                    <v-icon dark small>mdi-account-circle</v-icon>
                  </v-avatar>
                  <h4 class="ml-2">
                    <strong>{{
                      comentario.inscripcion.usuario.nombres +
                      " " +
                      comentario.inscripcion.usuario.apellidos
                    }}</strong
                    >&nbsp;
                    <small>{{ comentario.fecha_comentario }}</small>
                    <br />{{ comentario.descripcion }}
                  </h4>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="12" sm="12">
                  <v-textarea
                    auto-grow
                    rows="1"
                    row-height="15"
                    v-model="message"
                    :append-outer-icon="'mdi-send'"
                    clear-icon="mdi-close-circle"
                    clearable
                    label="Añadir Comentario"
                    type="text"
                    @click:append="toggleMarker"
                    @click:append-outer="guardarComentario(card)"
                    @click:clear="clearMessage"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- _______________________________ CIERRE Esto se debe mostrar por cada tarea _________________________________________________________ -->
  </v-row>
</template>
<script>
import moment from "moment"; //para fecha
import publicacionService from "../services/publicacionService";
export default {
  data: () => ({
    message: "",
    marker: true,
    iconIndex: 0,

    dialog: false,
    dialog2: false,
    lazy: "",
    RolTexto: [(v) => !!v || "Este campo es requerido"],
    descripcion: "",
    publicacion: "",
    cards: [],
    detalles: [],
    publicacion: {
      _id: "",
      fecha_publicacion: "",
      descripcion: "",
      detalleaula: "",
      inscripcion: "",
    },
    editedIndex: -1,
    defaultItem: {
      _id: "",
      fecha_publicacion: "",
      descripcion: "",
      detalleaula: "",
      inscripcion: "",
    },
    comentarios: [],
  }),

  created() {
    this.initialize();
    this.mostrarDetalle();
  },

  methods: {
    mostrarDetalle() {
      var _id = JSON.parse(localStorage.getItem("id_detalle"));
      console.log(_id);
      publicacionService
        .traerDetalle(_id)
        .then((res) => {
          this.detalles = res.data.detalle;
          console.log("detalles", res.data.detalle);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    initialize() {
      var ca = [];
      var detalle = JSON.parse(localStorage.getItem("id_detalle"));
      publicacionService
        .verPublicaciones(detalle)
        .then((res) => {
          ca = res.data.publicacion;
          this.cards = ca.reverse();
        })
        .catch((e) => {
          console.log("neles", e);
        });
    },
    guardarPublicacion() {
      var data = {
        descripcion: this.publicacion.descripcion,
        detalleaula: JSON.parse(localStorage.getItem("id_detalle")),
        inscripcion: JSON.parse(localStorage.getItem("id_inscripcion")),
      };
      publicacionService
        .create(data)
        .then((response) => {
          alert("Publicacion realizada con éxito");
          this.publicacion.descripcion = "";
          this.dialog = false;
          this.initialize();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteItem(card) {
      const index = this.cards.indexOf(card);
      confirm("Estas seguro de querer eliminar el registro?");
      publicacionService
        .remove(card._id)
        .then((response) => {
          alert("Se elimino con éxito");
          this.initialize();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    verComentarios(card) {
      var publicacion = card._id;
      publicacionService
        .verComentarios(publicacion)
        .then((res) => {
          if (publicacion == res.data.comentario[0].publicacion) {
            this.comentarios = res.data.comentario;
          }
        })
        .catch((e) => {
          console.log("neles", e);
        });
    },
    guardarComentario(card) {
      var data = {
        descripcion: this.message,
        publicacion: card._id,
        inscripcion: JSON.parse(localStorage.getItem("id_inscripcion")),
      };
      console.log(data);
      publicacionService
        .createComentario(data)
        .then((response) => {
          //alert("Publicacion realizada con éxito");
          this.message = "";
          this.initialize();
          this.verComentarios();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editItem(card) {
      this.tarea = Object.assign({}, card);
      this.tarea.fecha_entrega = moment(this.tarea.fecha_entrega)
        .add(1, "d")
        .format("YYYY-MM-DD");
      this.dialog2 = true;
    },
    close1() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    close2() {
      this.dialog2 = false;
      this.$refs.form.reset();
    },
    editar() {
      var data = {
        _id: this.tarea._id,
        descripcion: this.tarea.descripcion,
        fecha_entrega: this.tarea.fecha_entrega,
      };
      tareasService
        .update(data._id, data)
        .then((response) => {
          data._id = response.data._id;
          console.log(response.data);
          this.$refs.form.reset();
          this.dialog2 = false;
          this.initialize();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    borrarStorage() {
      localStorage.removeItem("id_detalle");
      this.$router.push("/Grado");
    },
    borrarStorage2() {
      localStorage.removeItem("id_detalle");
      this.$router.push("/GradoEncargados");
    },
    toggleMarker() {
      this.marker = !this.marker;
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    icon() {
      return this.icons[this.iconIndex];
    },
  },

  // llama el dialog
  watch: {
    dialog(val) {
      val || this.close1();
    },
    dialog2(val) {
      val || this.close2();
    },
  },
};
</script>
