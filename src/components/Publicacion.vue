<template>
  <v-img
    src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg"
    
  >
  <v-row dense>
    <v-col cols="3">
      <v-card class="ml-5 mt-8" style="border-radius: 8px" color="cyan">
        <v-card-title
          class="headline"
          v-for="(detalle, index) in detalles"
          :key="index"
        >
          <v-row>
            <v-col cols="12" sm="12">
              <strong style="color: white">{{ detalle.materia.nombre }}</strong>
            </v-col>

            <v-col cols="12" sm="12">
              <small
                ><h5 style="color: white">
                  {{
                    detalle.aula.grado.nombre +
                    " " +
                    detalle.aula.seccion.nombre
                  }}
                </h5></small
              >
            </v-col>
            <v-btn
              style="border-radius: 10px"
              class="ml-4"
              tile
              outlined
              dark
              @click="borrarStorage()"
            >
              <v-icon left>keyboard_backspace</v-icon>Volver
            </v-btn>
          </v-row>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="9">
      <v-card class="mr-5 ml-5 mt-8 mb-8" style="border-radius: 8px">
        <v-card-title
          class="headline"
          v-for="(con, index) in contenido"
          :key="index"
        >
          <v-row >
            <v-col cols="12">
              <h5 class="ml-4 mr-2"  style="color: blue; font-size: 25px">{{ con.tema }}</h5>
              </v-col>
              <v-col cols="12">
              <h5 class="ml-4 mr-2" style="color: gray; font-size: 14px; text-align: justify;">{{ con.fecha_publicacion }}</h5>
            </v-col>

            <v-col cols="12">
              <h5 class="ml-4 mr-2">
                {{ con.descripcion }}
              </h5>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-divider class="mt-1"></v-divider>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <div v-for="(comentario, index) in comentarios" :key="index">
                <v-row dense class="mb-4">
                  <v-avatar color="cyan" size="24" class="ml-1 mt-2">
                    <v-icon dark small>mdi-account-circle</v-icon>
                  </v-avatar>
                  <div>
                   
                     <v-row> 
                        <h4 class="ml-4">
                        <strong>{{
                          comentario.inscripcion.usuario.nombres +
                          " " +
                          comentario.inscripcion.usuario.apellidos
                        }}</strong>
                      </h4>
                     </v-row>
                     <v-row>  
                       <h6 small  class="ml-4">{{ comentario.fecha_comentario }}</h6>
                     </v-row>
                     <v-row> 
                       <h4
                          class="ml-4 mr-10"
                          style="
                            font-family: 'Comic Sans MS';
                            font-size: 15px;
                            line-height: 1px;
                            color: #566573;
                            text-align: justify;
                          "
                        >
                          {{ comentario.descripcion }}
                          <v-icon
                            class="ml-2"
                            small
                            color="red"
                            @click="deleteComentario(comentario)"
                            v-if="
                              (currentUser.role == 'ROLE_DOCENTE' &&
                                currentUser.nombres ==
                                  comentario.inscripcion.usuario.nombres) ||
                              currentUser.role == 'ROLE_ADMIN' ||
                              (currentUser.role == 'ROLE_ENCARGADO' &&
                                currentUser.nombres ==
                                  comentario.inscripcion.usuario.nombres)
                            "
                            >mdi-delete</v-icon>
                        </h4>
                     </v-row>
                     <!-- 
                    <div class="">
                      <h4 class="ml-2">
                        <strong>{{
                          comentario.inscripcion.usuario.nombres +
                          " " +
                          comentario.inscripcion.usuario.apellidos
                        }}</strong>
                      </h4>
                    </div>
                    <br />
                      <h6 small  class="">{{ comentario.fecha_comentario }}</h6>
                    <div>
                      <v-row dense cols="12">
                        <h4
                          class="ml-3 mr-10"
                          style="
                            font-family: 'Comic Sans MS';
                            font-size: 15px;
                            line-height: 1px;
                            color: #566573;
                            text-align: justify;
                          "
                        >
                          {{ comentario.descripcion }}
                          <v-icon
                            class="ml-2"
                            small
                            color="red"
                            @click="deleteComentario(comentario, con)"
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
                        </h4></v-row
                      >
                    </div>  -->
                  </div>
                </v-row>
              </div>
              <v-divider class="mt-4"></v-divider>
              <v-row>
                <v-col cols="12" md="12" sm="12">
                  <v-textarea
                    auto-grow
                    rows="1"
                    row-height="15"
                    v-model="message"
                    :append-outer-icon="'mdi-send'"
                    :rules="RolTexto"
                    clear-icon="mdi-close-circle"
                    clearable
                    label="Añadir Comentario"
                    type="text"
                    @click:append="toggleMarker"
                    @click:append-outer="guardarComentario()"
                    @click:clear="clearMessage"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- <v-col >
        <v-card  >
            
          <v-card-title v-for="(cont, index) in contenido"
        :key="cont._id"
        :item="cont"
        :index="index">
        <h1>{{ cont.tema }}</h1>
            <div>
              <div class="float-sm-left">
                <h5 class="ml-2">
                  <v-avatar color="cyan" size="32" class="ml-2">
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{
                    cont.inscripcion.usuario.nombres +
                    " " +
                    cont.inscripcion.usuario.apellidos
                  }}
                </h5>
              </div>
              <h6 class="ml-12">
                <small>{{ cont.fecha_publicacion }}</small>
              </h6>
            </div>
          </v-card-title>
          <v-card-text>
            <div>
              <h1 class="ml-4 mr-4">{{ cont.descripcion }}</h1>
            </div>
            <v-divider class="mt-4"></v-divider>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <div v-for="(comentario, index) in comentarios" :key="index">
                  <v-row
                    dense
                    class="mb-4"
                  >
                    <v-avatar color="cyan" size="24" class="ml-1">
                      <v-icon dark small>mdi-account-circle</v-icon>
                    </v-avatar>
                    <div>
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
                            style="
                              font-family: 'Comic Sans MS';
                              font-size: 15px;
                              line-height: 1px;
                              color: #566573;
                              text-align: justify;
                            "
                          >
                            {{ comentario.descripcion }}
                            <v-icon
                              class="ml-2"
                              small
                              color="red"
                              @click="deleteComentario(comentario, cont)"
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
                          </h4></v-row
                        >
                      </div>
                    </div>
                  </v-row>
                </div>
                <v-divider class="mt-4"></v-divider>
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
                      @click:append-outer="guardarComentario(cont)"
                      @click:clear="clearMessage"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col> -->
  </v-row>
  </v-img>
</template>
<script>
import moment from "moment"; //para fecha
import publicacionService from "../services/publicacionService";
export default {
  data: () => ({
    hay: true,
    editedIndex: -1,
    message: "",
    marker: true,
    iconIndex: 0,

    lazy: "",
    //RolTexto: [(v) => !!v || "Este campo es requerido"],
    RolTexto: [
      v => (v || '').length > 2 || "Mínimo 2 caracteres",
      v => (v || '').length < 51 || "Máximo 50 caracteres",
    ],
    tema: "",
    descripcion: "",
    publicacion: "",
    cards: [],
    contenido: [],
    detalles: [],

    comentarios: [],
  }),

  created() {
    this.mostrarDetalle();
    this.initialize2();
    this.verComentarios2();
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
    /* initialize() {
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
          this.initialize2();
        })
        .catch((e) => {
          console.log("neles", e);
        });
    },*/
    initialize2() {
      var ca = [];
      var id = JSON.parse(localStorage.getItem("id_publicacion"));
      publicacionService
        .verPublicacion(id)
        .then((res) => {
          let date = new Date();
          ca = res.data.publicacion;
          ca.map((cont) => {
            let date = new Date(cont.fecha_publicacion);
            console.log(cont.fecha_publicacion);
            console.log(date);
            //card.fecha_publicacion = moment(date).local()
            cont.fecha_publicacion = moment(date).format(
              "DD/MM/YYYY - HH:mm A"
            );
          });
          console.log("publicacion1", res.data.publicacion);
          //this.ca.fecha_publicacion = ;
          this.contenido = ca;
        })
        .catch((e) => {
          console.log("neles", e);
        });
    },

    verComentarios2() {
      //this.dialogC = true;
      //this.initialize2();
      var ca = [];
      var id = JSON.parse(localStorage.getItem("id_publicacion"));
      publicacionService
        .verComentarios(id)
        .then((res) => {
          ca = res.data.comentario;
          ca.map((c) => {
            let date = new Date(c.fecha_comentario);
            c.fecha_comentario = moment(date).format("DD/MM/YYYY - HH:mm A");
          });
          this.comentarios = ca;
          console.log("comentarios", this.comentarios);
        })
        .catch((e) => {
          console.log("neles yi", e);
        });
    },

    guardarComentario() {
      var data = {
        descripcion: this.message,
        publicacion: JSON.parse(localStorage.getItem("id_publicacion")),
        inscripcion: JSON.parse(localStorage.getItem("id_inscripcion")),
      };
      console.log(data);
      if (this.message.length > 50) {
        alert("Ha sobrepasado el número de carateres permitido");
      } else {
        publicacionService
          .createComentario(data)
          .then((response) => {
            alert("Comentario realizado con éxito");
            this.message = "";
            //this.initialize();
            //this.verComentarios(card);
            //.index = true;
            this.verComentarios2();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteComentario(comentario) {
      const index = this.comentarios.indexOf(comentario);
      //confirm("Estas seguro de querer eliminar el comentario?");
      publicacionService
        .removeComentario(comentario._id)
        .then((response) => {
          alert("Se eliminó con éxito");
          this.verComentarios2();
        })
        .catch((e) => {
          alert("No se pudo eliminar");
          console.log(e);
        });
    },

    borrarStorage() {
      localStorage.removeItem("id_publicacion");
      this.$router.push("/Tablon2");
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
};
</script>
<style scoped lang="scss">
h2 {
  font-family: "Times New Roman";
  font-size: 18px;
  line-height: 35px;
  color: gray;
  text-align: justify;
  font-weight: bold;
}
h1 {
  font-family: "Times New Roman";
  font-size: 18px;
  line-height: 35px;
  color: dark;
  text-align: justify;
  font-weight: bold;
}
h4 {
  font-family: "Times New Roman";
  font-size: 18px;
  line-height: 35px;
  color: rgb(90, 83, 153);
  text-align: justify;
  font-weight: bold;
}
#di {
  width: 1000px;
}
</style>
