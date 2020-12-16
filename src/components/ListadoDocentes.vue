<template>
<v-img src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
  <v-data-table style="border-radius: 15px"
    :headers="headers"
    :items="desserts"
    :search="buscar"
    class="elevation-5 mr-12 ml-12 mt-8"
  >
    <template v-slot:top>
      <v-toolbar flat color style="border-radius: 15px">
        <v-toolbar-title>
          <h3 class="text-center font-weight-bold" style="color: #1A237E">Listado de Docentes</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="buscar"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
          color="#1565C0"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px" >
          <template v-slot:activator="{ on }">
            <v-btn color="#3F51B5" dark class="mb-2" v-on="on"
              >Nuevo Docente</v-btn
            >
          </template>
          <v-card style="border-radius: 10px">
            <v-form ref="form" :lazy-validation="lazy">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="usuario.nombres"
                        :rules="RolTexto"
                        label="Nombres de usuario"
                        required
                         hint="Ej:  Juan Alberto"
            persistent-hint
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="usuario.apellidos"
                        :rules="RolTexto"
                        label="Apellidos de usuario"
                        required
                        hint="Ej:  Perez Sosa"
            persistent-hint
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="usuario.email"
                        :rules="Rolemail"
                        label="E-mail"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
          <v-btn
        color="blue darken-1"
        outlined
        @click="validar"
        v-if="usuario.nombres.length >= 3 && usuario.apellidos.length >= 5  && usuario.email ==''"
        enabled
      >Generar Correo</v-btn>
          <v-text-field v-if="usuario.email !=''" v-model="usuario.roles" label="Rol" type="text" value="docente" disabled></v-text-field>
        </v-col>
                   <!-- <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="usuario.roles"
                        :rules="RolTexto"
                        label="Rol"
                        type="text"
                        disabled
                      ></v-text-field>
                    </v-col> -->
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="usuario.password"
                          :rules="Rolpassword"
                          label="Contraseña"
                          type="password"
                          v-if="usuario.email != ''"
                          enabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="confirmar"
                          :rules="RolconPassword.concat(RolConfirmarPassword)"
                          label="Confirmar Contraseña"
                          type="password"
                          v-if="usuario.email != ''"
                          enabled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- <v-btn
                    color="green darken-1"
                    text
                    @click="validar"
                    v-if="
                      usuario.nombres.length > 3 &&
                        usuario.apellidos.length > 3 &&
                        usuario.email == ''
                    "
                    enabled
                    >Generar Correo</v-btn
                  > -->
                  <v-btn color="red darken-1" text @click="close"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    enabled
                    v-if="usuario.nombres.length > 3 && usuario.apellidos.length > 3  && usuario.email != '' && usuario.password == confirmar
                    "
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-form>
            </v-card>
            <!-- Cierre formulario temporal -->
          </v-dialog>

          <!-- <v-dialog v-model="dialog2" max-width="1000px">
          <v-card>
            <v-form ref="form" :lazy-validation="lazy">
              <v-card-title>
                <span class="headline">Editar Docente</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="usuario.nombres"
                        :rules="RolTexto"
                        label="Nombres de Usuario"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="usuario.apellidos"
                        :rules="RolTexto"
                        label="Apellidos de usuario"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="lastpassword"
                        :rules="Rolpassword"
                        label="Contraseña Administrador"
                        type="password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                 <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="usuario.email"
                        :rules="Rolemail"
                        label="E-mail"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="usuario.roles"
                        :rules="RolTexto"
                        label="Rol"
                        type="text"
                        disabled
                      ></v-text-field>
                    </v-col> 
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="usuario.password"
                        :rules="Rolpassword"
                        label="Contraseña"
                        type="password"
                        v-if="usuario.email != ''"
                        enabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="confirmar"
                        :rules="RolconPassword.concat(RolConfirmarPassword)"
                        label="Confirmar Contraseña"
                        type="password"
                        v-if="usuario.email != ''"
                        enabled
                      ></v-text-field>
                    </v-col> 
                  </v-row> 
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="editar"
                  v-if="
                      usuario.nombres.length != '' &&
                      usuario.apellidos.length != '' &&
                      lastpassword.length != '' "
                  >Modificar</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog> -->
        </v-toolbar>
      </template>
      <!-- Datos de la tabla -->
      <template v-slot:item.actions="{ item }">
        <!--  <v-icon small color="orange" class="mr-2" @click="editItem(item)"
        >mdi-pencil</v-icon
      >-->
        <v-icon color="orange" class="mr-2" @click="AcualizarPassword(item)"
          >mdi-refresh</v-icon
        >

        <v-icon color="red" @click="deleteItem(item)" v-if="item.cntr == 0"
          >mdi-delete</v-icon
        >
      </template>
      <template v-slot:no-data>
        <v-btn color="accent" @click="initialize">Refrescar</v-btn>
      </template>
    </v-data-table>
  </v-img>
</template>
<script>
import UserService from "../services/user.service";
import inscripcionService from "../services/inscripcionService";
export default {
  data: () => ({
    validarB: 0,
    inscripcion: [],
    lastpassword: "",
    buscar: "",
    buscar2: "",
    dialog: "",
    dialog2: "",
    lazy: "",
    nombres: "",
    apellidos: "",
    roles: "",
    email: "",
    password: "",
    confirmar: "",
    RolTexto: [
      (v) => !!v || "Este campo es requerido",
      (v) => /[a-zA-Z]\d*/.test(v) || "No se permiten números",
    ],
    Rolemail: [
      (v) => !!v || "Correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail no válido",
    ],
    Rolpassword: [(v) => !!v || "Contraseña es requerida"],
    RolconPassword: [(v) => !!v || "Contraseña es requerida"],
    //columnas de la tabla
    headers: [
      /* {
        text: "Codigo",
        align: "start",
        sortable: false,
        value: "_id"
      },*/
      {
        text: "Nombres",
        sortable: false,
        value: "nombres",
      },
      {
        text: "Apellidos",
        sortable: false,
        value: "apellidos",
      },
      {
        text: "E-mail",
        sortable: false,
        value: "email",
      },
      
      {
        text: "Rol",
        sortable: false,
        value: "role.nombre",
      },
     /* {
        text: "Inscripciones",
        sortable: false,
        value: "cntr",
      }, */
      { text: "Acciones", value: "actions", sortable: false },
    ],

    //datos para la tabla
    desserts: [],
    editedIndex: -1,
    //inicializa vacio
    usuario: {
      _id: "",
      nombres: "",
      apellidos: "",
      email: "",
      password: "",
      //confirmar: "",
      roles: "docente",
    },
    defaultItem: {
      _id: "",
      nombres: "",
      apellidos: "",
      email: "",
      password: "",
      confirmar: "",
      roles: "docente",
    },
  }),
  // titulo de ventana de Dialogo
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Docente" : "Modificar Docente";
    },
    RolConfirmarPassword() {
      return () =>
        this.usuario.password === this.confirmar ||
        "Las contraseñas no coinciden";
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  // llama el dialog
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    //this.BotonEliminar();
  },

  methods: {
    validar() {
      var numeros = "0123456789";
      for (var i = 0; i < this.usuario.nombres.length; i++) {
        if (numeros.indexOf(this.usuario.nombres.charAt(i), 0) != -1) {
          return alert("No se permiten números");
        }
      }
      for (var i = 0; i < this.usuario.apellidos.length; i++) {
        if (numeros.indexOf(this.usuario.apellidos.charAt(i), 0) != -1) {
          return alert("No se permiten números");
        }
      }
      return this.generarCorreo();
    },
    //_________________ver_________________________
    initialize() {
      var roles = Object.assign("5fa4e914955045001760eb71");
      console.log(roles);
      UserService.getDocentes(roles)
        .then((res) => {
          this.desserts = Object.assign([this.editedIndex], res.data.usuario);
          console.log(Object.assign([this.editedIndex], res.data.usuario));
         /* // ____________________ mapeo ___________________

          this.desserts.map((i) => {
            var tiene = 0;

            inscripcionService
            .show(i._id)
            .then((res) => {
              this.inscripcion = Object.assign(
                [this.editedIndex],
                res.data.inscripcion
              );
              if (this.inscripcion != null) {
                 tiene = 1;
              }
              //this.desserts[i].push(tiene);
              console.log("docnetes", this.desserts);
            })

            //console.log("yo",i._id); 
          }); // ____________________ cierre mapeo ___________________ */


        })
        .catch((e) => {
          console.log(e);
        });
    },
    //__________________generar correo
    generarCorreo() {
      var nombres = this.usuario.nombres;
      var apellidos = this.usuario.apellidos;
      console.log(nombres, apellidos);
      UserService.correoaleatorio(nombres, apellidos)
        .then((res) => {
          console.log(res.data.correo);
          this.usuario.email = res.data.correo;
        })
        .catch((e) => {
          alert("Error al generar correo");
          console.log(e);
        });
    },
    //_______________________________eliminar___________________________
    deleteItem(item) {
      /*for (let i = 0; i < this.inscripciones.length; i++) {

        console.log("Inscripciones2",this.inscripciones[i]);

        if (this.inscripciones[i]["usuario"]["_id"] == item._id) {
          
          alert("Nose puede eliminar, ya posee inscripciones");

        } else { */
          const index = this.desserts.indexOf(item);
          var opcion = confirm("¿Estás seguro de querer eliminar el registro?");
          if (opcion == true) {
            this.desserts.splice(index, 1);
            UserService.remove(item._id)
              .then((response) => {
                console.log(response.data);
                alert("Usuario eliminado con éxito");
                this.initialize();
              })
              .catch((e) => {
                alert("Error al eliminar");
                console.log(e);
              });
          } else {
            console.log("No se eliminó");
          }
      //  }
     // }

      /* for (let i = 0; i < this.inscripciones.length; i++) {
            
              for (let j = 0; j < this.desserts.length; j++) {
                
                  if (this.inscripciones[i]['usuario']['_id'] == this.desserts[j]['_id']) {
                    this.validarB = 1;
                  }
                  else{
                    this.validarB = 0;
                  }
              }
            }*/
    },
    //__________________________________________
    save() {
      var data = {
        _id: this.usuario._id,
        nombres: this.usuario.nombres,
        apellidos: this.usuario.apellidos,
        email: this.usuario.email,
        password: this.usuario.password,
        role: this.usuario.roles,
      };
      this.$refs.form.reset();
      /*if (this.editedIndex >= 0) {
        Object.assign(this.desserts[this.editedIndex], this.grado);

        //_______________________________actualizar________________________
        UserService.update(data._id, data)
          .then((response) => {
            data._id = response.data._id;
            console.log(response.data);
            this.dialog = false;
            alert("Usuario modificado con éxito");
            this.initialize();
          })
          .catch((e) => {
            this.dialog = false;
            alert("Error al modificar");
            console.log(e);
          });
      } else { */
      //___________________________guardar____________________
      console.log(data);
      UserService.create(data)
        .then((response) => {
          this.usuario._id = response.data._id;
          console.log(response.data);
          this.dialog = false;
          alert("Usuario creado con éxito");
          this.initialize();
        })
        .catch((e) => {
          alert("Error || Ya existe este docente");
          console.log(e);
        });
      //}
    },
    //__________________________________________
    editar() {
      var data = {
        _id: this.usuario._id,
        nombres: this.usuario.nombres,
        apellidos: this.usuario.apellidos,
        lastpassword: this.lastpassword,
        //email: this.usuario.email,
        //password: this.usuario.password,
        //role: this.usuario.roles,
      };
      UserService.update(data._id, data)
        .then((response) => {
          data._id = response.data._id;
          console.log(response.data);
          this.dialog2 = false;
          alert("Usuario modificado con éxito");
          this.initialize();
        })
        .catch((e) => {
          this.dialog2 = false;
          alert("Error al modificar");
          console.log(e);
        });
    },
    //metdo editar
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.usuario = Object.assign({}, item);
      this.dialog2 = true;
      console.log(this.usuario);
      /*
      this.editedIndex = this.desserts.indexOf(item);
      this._id = item._id;
      this.usuario.nombres = item.nombres;
      this.usuario.apellidos = item.apellidos;
      this.usuario.email = item.email;
      this.dialog = true; */
    },
    AcualizarPassword(item) {
      this.editedIndex = this.desserts.indexOf(item);
      var opcion = confirm(
        "¿Estás seguro de querer reestablecer contraseña de usuario?"
      );
      if (opcion == true) {
        UserService.reestablecerP(item._id)
          .then((response) => {
            console.log(response.data);
            alert("Usuario reestablecido con éxito");
            this.initialize();
          })
          .catch((e) => {
            alert("Error al reestablecer");
            console.log(e);
          });
      } else {
        console.log("No se actualizo");
      }
    },
    //metdo cerrar dialog
    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.usuario = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    BotonEliminar() {
      this.desserts.map((i) => {
        console.log("yo",i._id);

        inscripcionService
        .show(i._id)
        .then((res) => {
          this.inscripcion = Object.assign(
            [this.editedIndex],
            res.data.inscripcion
          );
          
        })
        .catch((e) => {
          console.log(e);
          console.log("neles");
        });

      })

      
    },
    /* BotonEliminar() {
      inscripcionService
        .index()
        .then((res) => {
          this.inscripciones = Object.assign(
            [this.editedIndex],
            res.data.inscripcion
          );
          console.log("inscripciones", this.inscripciones);

            for (let i = 0; i < this.inscripciones.length; i++) {
            
              for (let j = 0; j < this.desserts.length; j++) {

                  var contador = 0;
                  while (this.inscripciones[i]) {
                    contador = contador+1;
                  }
                  
                
                  if (this.inscripciones[i]['usuario']['_id'] == this.desserts[j]['_id']) {
                    this.validarB = 1;
                  }
                  else{
                    this.validarB = 0;
                  }
              }
            } 
        })
        .catch((e) => {
          console.log(e);
          console.log("neles");
        });
    },*/
  },
};
</script>
