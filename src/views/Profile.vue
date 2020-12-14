<template>
  <v-img
    src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg"
    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
  >
    <!-- <div>
      <div>
        <p>Subir Imagen a Firebase</p>
        <input type="file" @change="previewImage" accept="*" />
      </div>
      <div>
        <p>
          Progress:{{ uploadValue.toFixed(+"%") }}
          <progress :value="uploadValue" max="100"></progress>
        </p>
      </div>
      <div>
        <img class="preview" :src="picture" />
        <br />
        <v-btn color="white darken-1" @click="onUpload" text
          >Subir Archivo</v-btn
        >
      </div>
    </div> -->

    <v-row align="center" justify="center">
      <v-col class="text-center mt-12" cols="8">
        <v-card style="border-radius: 20px" height="430px" max-width="800px">
          <v-img
            class="blanck--text center"
            height="355px"
            src="../assets/oo.jpg"
          >
            <v-card-title>
              <h2
                class="font-weight-medium mt-4"
                style="padding-left: 1px; color: white"
              >
                Bienvenid@ a SchoolRoom
              </h2>
              <v-row align="center" justify="center" class="text-center">
                <v-col class="text-center" cols="4">
                  
                  <img
                    height="200px"
                    max-width="200px"
                    style="border-radius: 100px"
                    class="ml-12 mr-9 "
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHDHqQ7DQSIxDuq7E4gRclTgJUCgnv-gPIIx2YDIbs-gUUYkQF&usqp=CAU"
                    v-if="this.image ==''"
                  />
                  <img
                    height="200px"
                    max-width="200px"
                    style="border-radius: 100px"
                    class="ml-12 mr-9 "
                    :src="image"
                    v-if="this.image !=''"
                  />
                  </v-col>
                <v-col class="text-center" cols="8">
                  <v-col cols="12">
                    <h5 class="mt-1" style="color: white">
                      <strong>Código:</strong>{{ currentUser.id }}
                    </h5>
                  </v-col>
                  <v-col cols="12">
                    <h5 style="color: white">
                      <strong>Nombres:</strong>{{ currentUser.nombres }}
                    </h5>
                  </v-col>
                  <v-col cols="12">
                    <h5 style="color: white">
                      <strong>Apellidos:</strong>{{ currentUser.apellidos }}
                    </h5>
                  </v-col>
                  <v-col cols="12">
                    <h5 style="color: white">
                      <strong>Correo:</strong>{{ currentUser.email }}
                    </h5>
                  </v-col>
                  <v-col cols="12">
                    <h5 style="color: white">
                      <strong>Rol:</strong>{{ currentUser.role }}
                    </h5>
                  </v-col>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle class="pb-0 black--text"></v-card-subtitle>
          </v-img>
          <v-card-actions>
            <v-row justify="center">
              <v-dialog v-model="dialog" max-width="800px">
                <template v-slot:activator="{ on }">
                  <v-btn color="cyan" outlined dark v-on="on" class="mt-3">
                    Modificar Datos
                  </v-btn>
                  <v-btn color="blue" outlined dark @click="xyzx()" class="mt-3 ml-12">
                    Actualizar Foto
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Modificar Datos Personales</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="id"
                            name="codigo"
                            :rules="RolTexto"
                            label="Código"
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="email"
                            name="email"
                            :rules="Rolemail"
                            label="Correo Electrónico"
                            disabled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="nombres"
                            name="nombres"
                            :rules="RolTexto"
                            label="Nombres"
                            required
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="apellidos"
                            name="apellidos"
                            :rules="RolTexto"
                            label="Apellidos"
                            disabled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="telefono"
                            name="telefono"
                            :rules="RolTel"
                            label="Teléfono"
                            hint="Ej:  7000-7000 / 2200-2200 (Opcional)"
                            persistent-hint
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="direccion"
                            name="direccion"
                            label="Dirección"
                            hint="Ej:  Chalatenango  (Opcional)"
                            persistent-hint
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="lastpassword"
                            label="Contraseña"
                            type="password"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="password"
                            name="password"
                            label="Confirmar"
                            type="password"
                            :rules="RolconPassword.concat(RolConfirmarPassword)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <!--<v-checkbox
                            v-model="v0"
                            label="Cambiar Contraseña"
                          ></v-checkbox>
                          <v-row v-if="v0 == true">
                            <v-col cols="12" sm="4">
                              <v-text-field
                                v-model="lastpassword"
                                label="Contraseña"
                                type="password"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                              <v-text-field
                                v-model="password"
                                name="password"
                                :rules="Rolpassword"
                                label="Nueva Contraseña"
                                type="password"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                              <v-text-field
                                v-model="confirmar"
                                name="confirmar"
                                :rules="
                                  RolconPassword.concat(RolConfirmarPassword)
                                "
                                label="Confirme Contraseña"
                                type="password"
                              ></v-text-field>
                            </v-col>
                          </v-row> -->
                      <!-- <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row> -->
                    </v-container>
                    <small
                      >*Únicamente puede cambiar télefono y dirección (confirme
                      su contraseña)</small
                    >
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red darken-1"
                      outlined
                      @click="dialog = false"
                    >
                      Cerrar
                    </v-btn>
                    <v-btn color="blue darken-1" outlined @click="save">
                      Modificar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="text-center mt-12" cols="8">
        <v-card style="border-radius: 12px" height="315px" max-width="800px" v-if="xyz==1">
          <v-row align="center" justify="center" class="text-center">
            <v-col class="text-center mt-12" cols="4">
              <img
              v-if="this.picture !='' "
                cols="12"
                style="border-radius: 100px"
                class="preview ml-12 mr-12 mt-12"
                :src="picture"
              />
              <img
                v-if="this.picture =='' "
                cols="12"
                style="border-radius: 100px"
                class="preview ml-12 mr-12 mt-12"
                src="https://lommon.es/wp-content/uploads/2020/02/no-photo.jpg"
              />
              <!--<p>
              <v-file-input dark accept="*" label="Seleccione el archivo" @change="previewImage">
              </v-file-input>
            </p> -->
            </v-col>
            <v-col class="text-center mt-12" cols="8">
              <p class="" style="color: black">Seleccionar Archivo</p>
              <input
              
                class="ml-3 mr-3 "
                type="file"
                @change="previewImage"
                accept="image/*"
              />

              <p class="ml-12 mr-12 mt-3" style="color: black">
                Subiendo:{{ " " + uploadValue.toFixed(+"%") + " %" }}
                <v-progress-linear
                  class=""
                  :value="uploadValue"
                  max="100"
                  color="cyan"
                ></v-progress-linear>
              </p>
           
            <v-btn color="cyan darken-1" @click="onUpload" outlined dark
              >Subir Foto</v-btn
            > 
            <v-btn color="red darken-1" class="ml-12" @click="xyz=0" outlined dark
              >Cancelar</v-btn></v-col>
            
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- <h1 class=" font-weight-medium mt-12" style = "padding-left: 1px"
        >Bienvenid@ a SchoolRoom</h1>  
        <br> 
    
        <p class="font-weight-regular text-left " style = "padding-left: 50px;">
      <strong>Código:</strong>
      {{currentUser.id}}
      </p>
      <p class="font-weight-regular text-left" style = "padding-left: 50px">
      <strong>Nombres:</strong>
      {{currentUser.nombres}}
      </p>
      <p class="font-weight-regular text-left" style = "padding-left: 50px">
        <strong>Apellidos:</strong>
        {{currentUser.apellidos}}
      </p>
      <p class="font-weight-regular text-left" style = "padding-left: 50px">
        <strong>Correo de Usuario:</strong>
        {{currentUser.email}}
      </p>
      <p class="text-left" style = "padding-left: 50px">
    <ul>
      <li>{{currentUser.role}}</li>
    </ul>
      </p>
      <br>-->
  </v-img>
</template>
<script>
import Vue from "vue";
import firebase from "firebase";

import UserService from "../services/user.service";
export default {
  data: () => ({
    imageData: null,
    picture: null,
    uploadValue: 0,
    input: "",
    image: "",
    xyz: 0,
    dialog: false,
    v0: false,
    si: false,
    nombres: "",
    id: "",
    apellidos: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    lastpassword: "",
    confirmar: "",
    role: "",
    dialog2: false,
    RolTel: [
      (v) => /[0-9]\d*/.test(v) || "No se permiten letras",
      //v => (v || '').length > 7 || "Mínimo 8 caracteres"
    ],

    RolTexto: [
      (v) => !!v || "Este campo es requerido",
      (v) => /[a-zA-Z]\d*/.test(v) || "No se permiten números",
    ],
    Rolemail: [
      (v) => !!v || "Correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail no valido",
    ],
    Rolpassword: [(v) => !!v || "Contraseña es requerida"],
    RolconPassword: [(v) => !!v || "Contraseña es requerida"],
  }),
  computed: {
    RolConfirmarPassword() {
      return () =>
        this.lastpassword === this.password || "las contraseñas no coinciden";
    },
    /* RolConfirmarPassword() {
      return () =>
        this.password === this.confirmar || "las contraseñas no coinciden";
    },*/
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },

  methods: {
    validar() {
      var numeros = "0123456789";
      for (var i = 0; i < this.nombres.length; i++) {
        if (numeros.indexOf(this.nombres.charAt(i), 0) != -1) {
          return alert("No se permiten números");
        }
      }
      for (var i = 0; i < this.apellidos.length; i++) {
        if (numeros.indexOf(this.apellidos.charAt(i), 0) != -1) {
          return alert("No se permiten números");
        }
      }
    },

    //__________________________________________
    save() {
      var _id = this.id;
      var data = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        telefono: this.telefono,
        direccion: this.direccion,
        email: this.email,
        password: this.password,
        lastpassword: this.lastpassword,
      };
      //_______________________________actualizar________________________
      UserService.update(_id, data)
        .then((response) => {
          _id = response.data._id;
          console.log(response.data.usuario);
          alert(
            "Usuario modificado con éxito, los cambios serán visibles en tu próximo inicio de sesión"
          );
          //localStorage.setItem('user', JSON.stringify(response.data.usuario));
          this.initialize();
          this.dialog = false;
          this.password = "";
          this.confirmar = "";
          this.lastpassword = "";
        })
        .catch((e) => {
          alert("No se pudo modificar");
          console.log(e);
        });
    },
    save2() {
      var _id = this.id;
      var data = {
        //nombres: this.nombres,
        //apellidos: this.apellidos,
        //telefono: this.telefono,
        //direccion: this.direccion,
        password: this.password,
        lastpassword: this.lastpassword,
      };
      //_______________________________actualizar________________________
      UserService.updateCntr(_id, data)
        .then((response) => {
          _id = response.data._id;
          console.log(response.data.usuario);
          alert(
            "Usuario modificado con éxito, los cambios serán visibles en tu próximo inicio de sesión"
          );
          //localStorage.setItem('user', JSON.stringify(response.data.usuario));
          this.initialize();
          this.dialog = false;
        })
        .catch((e) => {
          alert("No se pudo modificar");
          console.log(e);
        });
    },

    //__________________________________________ñ
    initialize() {
      var _id = this.currentUser.id;
      UserService.show(_id)
        .then((res) => {
          this.id = res.data.usuario[0]._id;
          (this.nombres = res.data.usuario[0].nombres),
            (this.apellidos = res.data.usuario[0].apellidos),
            (this.telefono = res.data.usuario[0].telefono),
            (this.direccion = res.data.usuario[0].direccion),
            (this.email = res.data.usuario[0].email),
            (this.password = ""),
            (this.roles = res.data.usuario[0].roles);
        })
        .catch((e) => {
          console.log("neles", e);
        });
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onUpload(e) {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            console.log(url);
            localStorage.setItem("URL", JSON.stringify(url));
            this.guardarURL();
          });
        }
      );
    },

    guardarURL() {
      var _id = this.id;
      var data = {
        url: JSON.parse(localStorage.getItem("URL")),
      };
      UserService.saveUrl(_id, data)
        .then((response) => {
          _id = response.data._id;
          console.log("save URL", response.data.usuario);
          this.image = this.currentUser.url;
          alert("Foto añadida con éxito, los cambios seran visibles en su proxímo inicio de sesión");
          this.borrarURL();
          //location.reload();
           this.xyz = 0;
        })
        .catch((e) => {
          alert("No se pudo guardar la foto");
          console.log(e);
        });
    },

    borrarURL() {
      localStorage.removeItem("URL");
      //location.reload();
    },

    xyzx(){
      this.xyz = 1;
    }
  },
  created() {
    this.initialize();
    this.image = this.currentUser.url;
  },
};
</script>
<style scoped="">
img.preview {
  width: 170px;
  height: 170px;
  border-radius: 5px;
}
</style>