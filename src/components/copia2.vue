<template v-slot:top>
  <v-img src="../assets/88.jpeg">
    <v-row dense>
      <v-col cols="12">
        <v-card class="mr-5 ml-5 mt-8" style="border-radius: 15px">
          <v-img
            style="border-radius: 15px"
            height="300px"
            src="../assets/8.jpg"
          >
            <v-card-title
              class="headline"
              v-for="(detalle, index) in detalles"
              :key="index"
            >
              <v-row>
                <v-col cols="12" sm="12">
                  <h2>{{ detalle.materia.nombre }}</h2>
                </v-col>

                <v-col cols="10" sm="10">
                  <h5>
                    {{
                      detalle.aula.grado.nombre +
                        " Sección: " +
                        detalle.aula.seccion.nombre
                    }}
                  </h5>
                  <h5>{{ " Aula: " + detalle.aula.numero }}</h5>
                </v-col>
              </v-row>

              <!-- **********************************  showDialog Nuevo **************************************** -->
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-col cols="12" sm="12">
                    <v-btn
                      style="border-radius: 10px"
                      class
                      tile
                      outlined
                      dark
                      color="white"
                      v-on="on"
                      v-if="
                        currentUser.role == 'ROLE_ENCARGADO' ||
                          currentUser.role == 'ROLE_ADMIN' ||
                          currentUser.role == 'ROLE_DOCENTE'
                      "
                    >
                      <v-icon left>mdi-folder-plus</v-icon>Nueva Publicación
                    </v-btn>
                  </v-col>
                </template>
                <v-card style="border-radius: 15px">
                  <v-form ref="nuevaP" :lazy-validation="lazy">
                    <v-card-title>
                      <span class="headline">Nueva Publicación</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-text-field
                          style="border-radius: 5px"
                          v-model="publicacion.tema"
                          :rules="RolTexto"
                          outlined
                          label="Tema de publicación"
                        ></v-text-field>
                        <v-textarea
                          style="border-radius: 5px"
                          v-model="publicacion.descripcion"
                          :rules="RolTexto"
                          outlined
                          label="Descripción de tu publicación"
                        ></v-textarea>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="close1"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        style="border-radius: 10px"
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

              <!-- **********************************  Botones Volver **************************************** -->
              <v-col cols="6" sm="6">
                <v-btn
                  style="border-radius: 10px"
                  class
                  tile
                  outlined
                  dark
                  color="blue"
                  @click="borrarStorage()"
                  v-if="currentUser.role == 'ROLE_DOCENTE'"
                >
                  <v-icon left>keyboard_backspace</v-icon>Volver
                </v-btn>

                <v-btn
                  style="border-radius: 10px"
                  class
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
                  <v-icon left>keyboard_backspace</v-icon>Volver
                </v-btn>
              </v-col>

              <!-- **********************************  showDialog EDITAR **************************************** -->
              <v-dialog v-model="dialog2" max-width="500px">
                <v-card style="border-radius: 15px">
                  <v-form ref="nuevaP" :lazy-validation="lazy">
                    <v-card-title>
                      <span class="headline">Editar Publicación</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-textarea
                          v-model="publicacion.descripcion"
                          :rules="RolTexto"
                          outlined
                          label="Descripción de tu publicación"
                        ></v-textarea>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="close2"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="editar"
                        v-if="publicacion.descripcion.length > 10"
                        >Editar</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-card-title>
            <h4 class="ml-4"></h4>
            <v-card-subtitle class="mt-0"></v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
      <!-- _______________________________  Esto se debe mostrar por cada tarea _________________________________________________________ -->
      <v-col
        cols="12"
        sm="12"
        md="8"
        class="offset-md-2"
        v-for="(card, index) in cards"
        :key="card._id"
        :item="card"
        :index="index"
      >
        <v-card
          color
          elevation="5"
          class="ml-12 mt-2 mr-12 mb-3"
          style="border-radius: 20px"
        >
          <v-card-title class="">
            <div class="">
              <div class="float-sm-left">
                <h5 class="ml-2">
                  <v-avatar color="cyan" size="32" class="ml-2">
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{
                    card.inscripcion.usuario.nombres +
                      " " +
                      card.inscripcion.usuario.apellidos
                  }}
                </h5>
              </div>
              <br />
              <div class="">
                <h6 small class="ml-12">{{ card.fecha_publicacion }}</h6>
              </div>
            </div>
            <v-btn
              style="border-radius: 20px"
              class="mr-2 ml-8"
              tile
              outlined
              color="success"
              @click="editItem(card)"
              v-if="
                (currentUser.role == 'ROLE_DOCENTE' &&
                  currentUser.nombres == card.inscripcion.usuario.nombres) ||
                  (currentUser.role == 'ROLE_ADMIN' &&
                    currentUser.nombres == card.inscripcion.usuario.nombres)
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
                (currentUser.role == 'ROLE_DOCENTE' &&
                  currentUser.nombres == card.inscripcion.usuario.nombres) ||
                  currentUser.role == 'ROLE_ADMIN' ||
                  (currentUser.role == 'ROLE_ENCARGADO' &&
                    currentUser.nombres == card.inscripcion.usuario.nombres)
              "
            >
              <v-icon rigth>mdi-delete</v-icon>Eliminar
            </v-btn>
          </v-card-title>
          <v-card-text>
            <!-- <div>
              <h1 class="ml-4 mr-4">{{ card.descripcion }}</h1>
            </div>  -->
            <div>
              <h1 class="ml-4 mr-4">{{ card.tema }}</h1>
            </div>
            <v-divider class="mt-4"></v-divider>
            <v-row > 
              <v-checkbox
                class="ml-6"
                v-model="card.index"
                color="cyan"
                label="Ver Comentarios"
                @click="verComentarios2(card)"
              ></v-checkbox>
              <v-col cols="12" sm="12" md="12">
                <v-banner 
                  v-model="card.index"
                  single-line
                  transition="slide-y-transition"
                >
                  <div v-for="(comentario, index) in comentarios" :key="index">
                    <v-row dense
                      v-if="card._id == comentario.publicacion"
                      class="mb-4"
                    >
                      <v-avatar color="cyan" size="24" class="ml-1">
                        <v-icon dark small>mdi-account-circle</v-icon>
                      </v-avatar>
                      <div >
                        <div class="float-sm-left">
                          <h4 class="ml-2">
                            <strong>{{
                              comentario.inscripcion.usuario.nombres +
                                " " +
                                comentario.inscripcion.usuario.apellidos
                            }}</strong>
                          </h4>
                        </div>
                        <br />
                        <div class="ml-2">
                          <small>{{ comentario.fecha_comentario }}</small>
                        </div>
                        <div>
                          <v-row dense cols="12">
                          <h4
                            class="ml-3 mr-10"
                            style=" font-family:'Comic Sans MS' ;
                                font-size: 15px;
                                line-height : 1px;
                                color:   #566573;
                                text-align: center;
                                "
                          >
                            {{ comentario.descripcion }}
                            <v-icon
                              class="ml-2"
                              small
                              color="red"
                              @click="deleteComentario(comentario, card)"
                              v-if="
                                (currentUser.role == 'ROLE_DOCENTE' &&
                                  currentUser.nombres ==
                                    comentario.inscripcion.usuario.nombres) ||
                                  currentUser.role == 'ROLE_ADMIN' ||
                                  (currentUser.role == 'ROLE_ENCARGADO' &&
                                    currentUser.nombres ==
                                      comentario.inscripcion.usuario.nombres)
                              "
                              >mdi-delete</v-icon
                            >
                          </h4></v-row>
                        </div>
                      </div>
                    </v-row>
                  </div><v-divider class="mt-4"></v-divider>
                  <v-row >
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
                </v-banner>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card> </v-col
    ></v-row>
  </v-img>
</template>
<script>
import moment from "moment"; //para fecha
import publicacionService from "../services/publicacionService";
export default {
  data: () => ({
    editedIndex: -1,
    message: "",
    marker: true,
    iconIndex: 0,

    dialog: false,
    dialog2: false,
    dialogC: false,
    lazy: "",
    RolTexto: [(v) => !!v || "Este campo es requerido"],
    tema: "",
    descripcion: "",
    publicacion: "",
    cards: [],
    detalles: [],
    publicacion: {
      _id: "",
      fecha_publicacion: "",
      tema: "",
      descripcion: "",
      detalleaula: "",
      inscripcion: "",
    },
    editedIndex: -1,
    defaultItem: {
      _id: "",
      fecha_publicacion: "",
      tema: "",
      descripcion: "",
      detalleaula: "",
      inscripcion: "",
    },
    comentarios: [],
  }),

  created() {
    this.initialize();
    this.mostrarDetalle();
    //this.verComentarios2();
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
          let date = new Date();
          ca = res.data.publicacion;
          ca.map((card) => {
            let date = new Date(card.fecha_publicacion);
            console.log(card.fecha_publicacion);
            console.log(date);
            //card.fecha_publicacion = moment(date).local()
            card.fecha_publicacion = moment(date).format(
              "DD/MM/YYYY - HH:mm A"
            );
            card.index = false;
          });
          console.log(res.data.publicacion);
          //this.ca.fecha_publicacion = ;
          this.cards = ca.reverse();
        })
        .catch((e) => {
          console.log("neles", e);
        });
    },
    guardarPublicacion() {
      var data = {
        tema: this.publicacion.tema,
        descripcion: this.publicacion.descripcion,
        detalleaula: JSON.parse(localStorage.getItem("id_detalle")),
        inscripcion: JSON.parse(localStorage.getItem("id_inscripcion")),
      };
      publicacionService
        .create(data)
        .then((response) => {
          alert("Publicación realizada con éxito");
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
<<<<<<< HEAD
      confirm("¿Estás seguro de querer eliminar el registro?");
=======
      confirm("¿Estas seguro de querer eliminar el registro?");
>>>>>>> 70712b7f4166dea7f5332cdee22e6a1a9a9e4862
      publicacionService
        .remove(card._id)
        .then((response) => {
          alert("Se eliminó con éxito");
          this.initialize();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /*verComentarios(card) {
      this.dialogC = true;
      var publicacion = card._id;
      var ca = [];
      publicacionService
        .verComentarios(publicacion)
        .then((res) => {
          if (publicacion == res.data.comentario[0].publicacion) {
            //this.dialogC = true;
            ca = res.data.comentario;
            ca.map((c) => {
              let date = new Date(c.fecha_comentario);
              c.fecha_comentario = moment(date).format("DD/MM/YYYY - HH:mm A");
            });
            this.comentarios = ca;
          }
        })
        .catch((e) => {
          console.log("neles", e);
        }); 
    },*/
    verComentarios2(card) {
      var ca = [];
      publicacionService
        .verComentarios()
        .then((res) => {
          ca = res.data.comentario;
          ca.map((c) => {
            let date = new Date(c.fecha_comentario);
            c.fecha_comentario = moment(date).format("DD/MM/YYYY - HH:mm A");
          });
          this.comentarios = ca;
        })
        .catch((e) => {
          console.log("neles", e);
        });
    },
    /* desplegar(card) {
      if (card.id == this.comentarios.publicacion) {
        this.v0 = true;
      } 
    },
    ocultar(card) {
      this.v0 = false;
    },*/

    guardarComentario(card) {
      var data = {
        descripcion: this.message,
        publicacion: card._id,
        inscripcion: JSON.parse(localStorage.getItem("id_inscripcion")),
      };
      console.log(data);
      if(this.message.length > 50){        
<<<<<<< HEAD
        alert('Ha sobrepasado el número de carateres permitido')
=======
        alert('Ha sobrepasado el número de caracteres permitido')
>>>>>>> 70712b7f4166dea7f5332cdee22e6a1a9a9e4862
      }
      else{
        publicacionService
        .createComentario(data)
        .then((response) => {
          //alert("Publicacion realizada con éxito");
          this.message = "";
          //this.initialize();
          //this.verComentarios(card);
          card.index = true;
          this.verComentarios2();
        })
        .catch((e) => {
          console.log(e);
        });
      }   
    },
    deleteComentario(comentario, card) {
      const index = this.comentarios.indexOf(comentario);
      //confirm("Estas seguro de querer eliminar el comentario?");
      publicacionService
        .removeComentario(comentario._id)
        .then((response) => {
          alert("Se eliminó con éxito");
          //this.initialize();
          //this.verComentarios(card);
          card.index = true;
          this.verComentarios2();
        })
        .catch((e) => {
          alert("No se pudo eliminar");
          console.log(e);
        });
    },
    editItem(card) {
      this.publicacion = Object.assign({}, card);
      this.dialog2 = true;
    },
    close1() {
      this.dialog = false;
      this.publicacion.descripcion = "";
      this.publicacion._id = "";
      this.publicacion.fecha_entrega = "";
    },
    close2() {
      this.dialog2 = false;
      this.publicacion.descripcion = "";
      this.publicacion._id = "";
      this.publicacion.fecha_entrega = "";
    },
    close3() {
      this.dialog3 = false;
      this.publicacion.descripcion = "";
      this.publicacion._id = "";
      this.publicacion.fecha_entrega = "";
    },
    editar() {
      var data = {
        _id: this.publicacion._id,
        descripcion: this.publicacion.descripcion,
        fecha_entrega: this.publicacion.fecha_entrega,
      };
      publicacionService
        .update(data._id, data)
        .then((response) => {
          data._id = response.data._id;
          console.log(response.data);
          this.close2();
          alert("Publicación modificada con éxito");
          this.initialize();
        })
        .catch((e) => {
          alert("Error al modificar publicación");
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
    dialogC(val) {
      val || this.close3();
    },
  },
};
</script>
<style scoped lang="scss">
h1 {
  font-family: "Times New Roman";
  font-size: 18px;
  line-height: 35px;
  color: blue;
  text-align: justify;
  font-weight: bold;
}
#di {
  width: 1000px;
}
</style>
