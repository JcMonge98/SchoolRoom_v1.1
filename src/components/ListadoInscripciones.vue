<template>
<v-img src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" >
<v-content>
 <!--  <v-row v-if="currentUser.role == 'ROLE_ADMIN'">
    <v-col cols=4 class="offset-4">
  <v-text-field
          class="text-xs-center"
          v-model="buscarCodigo"
          append-icon="search"
          label="Ingresa codigo de aula"
          single-line
          hide-details
          color="danger"
        ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn color="cyan" dark class="mb-2" @click="buscarGrado()">Buscar por Aula</v-btn>
        </v-col>
  </v-row> -->
  <v-data-table style="border-radius: 15px"
    :headers="headers"
    :items="desserts"
    :search="buscar"
    class="elevation-5 mr-12 ml-12 mt-8"
  >
    <template v-slot:top>
      <!-- encabezado de la tabla -->
      <v-toolbar flat color style="border-radius: 15px">
        <v-toolbar-title>
          <h3 class="text-center font-weight-bold" style="color: #1A237E">Inscripciones de Aulas</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- input de busqueda(filtro) -->
        <v-text-field
          class="text-xs-center"
          v-model="buscar"
          append-icon="search"
          label="Filtro"
          single-line
          hide-details
          color="#1A237E"
        ></v-text-field>
        <v-spacer></v-spacer>

        <!-- formulario temporal -->
        <v-dialog v-model="dialog" max-width="900">
          <template v-slot:activator="{ on }">
            <v-btn color="#3F51B5" dark class="mb-2" v-on="on" v-if="currentUser.role == 'ROLE_ENCARGADO' || currentUser.role == 'ROLE_DOCENTE' || currentUser.role == 'ROLE_ADMIN'">Inscribirse</v-btn>
          </template>
          <v-card style="border-radius: 10px">
            <v-form ref="form" :lazy-validation="lazy">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="inscripcion.codigo"
                        :rules="RolTexto"
                        label="Código de Aula"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="inscripcion.aula"
                        :rules="RolTexto"
                        label=""
                        aria-disabled=""
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                <!--  <v-text-field
                    v-model="inscripcion.user"
                    :rules="RolTexto"
                    label="Encargado"
                    v-if="editedIndex==-1"
                    disabled
                  ></v-text-field> -->
                  <v-row>
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field
                        v-model="inscripcion.numero"
                        :rules="RolTexto"
                        label="Número de Aula"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-select
                        v-model="inscripcion.turno"
                        :rules="RolTexto"
                        :items="turnos"
                        item-text="nombre"
                        item-value="_id"
                        label="Turno"
                        required
                        disabled
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field
                        v-model="inscripcion.grado"
                        :rules="RolTexto"
                        label="Grado"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field
                        v-model="inscripcion.seccion"
                        :rules="RolTexto"
                        label="Sección"
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="generar"
                  enabled
                  v-if="inscripcion.codigo !=''"
                >Buscar grado</v-btn>
                <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save" v-if="inscripcion.grado!=''">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
          <!-- Cierre formulario temporal -->
        </v-dialog>
        <v-dialog v-model="dialog2" max-width="1000px">
          <v-card>
            <v-form ref="form" :lazy-validation="lazy">
              <v-card-title>
                <span class="headline">Editar Inscripción</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                   <!-- <v-col cols="12" sm="3" md="3">
                      <v-select
                        v-model="inscripcion.usuario"
                        :rules="RolTexto"
                        :items="docentes"
                        item-text="nombres" 
                        item-value="_id"
                        label="Docente"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-select
                        v-model="inscripcion.usuario"
                        :rules="RolTexto"
                        :items="docentes"
                        item-text="apellidos"
                        item-value="_id"
                        label="Docente"
                        required
                        disabled
                      ></v-select>
                    </v-col> -->
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field
                        v-model="inscripcion.aula.codigo"
                        :rules="RolTexto"
                        label="Código de Aula"
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12" sm="3" md="3">
                      <v-select
                        v-model="inscripcion.aula.grado"
                        :rules="RolTexto"
                        :items="grados"
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
                        :items="secciones"
                        item-text="nombre"
                        item-value="nombre"
                        label="Sección"
                        required
                        disabled
                      ></v-select>
                    </v-col><v-col cols="12" sm="3" md="3">
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
                        label="Id Incripción"
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
                <v-btn
                  color="green darken-1"
                  text
                  @click="generar2"
                  enabled
                  v-if="inscripcion.codigo !=''"
                >Buscar Grado</v-btn>
                <v-btn color="red darken-1" text @click="close2">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="editar" v-if="inscripcion.grado!=''">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
          <!-- Cierre formulario temporal -->
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- Datos de la tabla -->
    <template v-slot:item.actions="{ item }">
      <v-btn icon text @click="llevarInscripcion(item)" color="purple darken-1" v-if="currentUser.role == 'ROLE_DOCENTE'">
        <v-icon small>mdi-note</v-icon>Ver
      </v-btn>
        <v-btn icon text @click="llevarInscripcion2(item)" color="purple darken-1" v-if="currentUser.role == 'ROLE_ENCARGADO' || currentUser.role == 'ROLE_ADMIN'">
          <v-icon small>mdi-note</v-icon>Ver+
        </v-btn>
      <v-btn icon text @click="editItem(item)" class="mr-2 ml-8" color="orange darken-1" v-if="currentUser.role == 'ROLE_ADMIN'">
       <v-icon small>mdi-pencil</v-icon>Editar
      </v-btn>
      <v-icon small color="red" class="ml-4" @click="deleteItem(item)" v-if="currentUser.role == 'ROLE_ADMIN' || currentUser.role == 'ROLE_ENCARGADO' && item.cntr == 0">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Refrescar</v-btn>
    </template>
  </v-data-table>
</v-content>
</v-img>
</template>

<script>
import inscripcionService from "../services/inscripcionService";
import UserService from "../services/user.service";

import moment from "moment"; 
//para fecha
export default {
  data: () => ({
    buscar: "",
    buscarCodigo:"",
    dialog: "",
    lazy: "",
    _id: "",
    fecha_inscripcion: moment().format("YYYY-MM-DD"),
    usuario: "",
    RolTexto: [v => !!v || "Este campo es requerido"],
    codigo: "",
    aula: "",
    //columnas de la tabla
    headers: [
      {
        text: "Fecha Inscripción",
        sortable: false,
        //value: moment(new Date("fecha_inscripcion").format("YYYY-MM-DD"))
        value:"fecha_inscripcion"
      },
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
        text: "Sección",
        sortable: false,
        value: "aula.seccion.nombre"
      },
      {
        text: "Rol",
        sortable: false,
        value: "usuario.role.nombre"
      },
      { text: "Acciones", value: "actions", sortable: false }
    ],

    //datos para la tabla
    desserts: [],
    dess: [],
    editedIndex: -1,
    //inicializa vacio
    inscripcion: {
      _id: "",
      fecha_inscripcion: "",
      codigo: "",
      usuario: "",
      aula: ""
    },
    defaultItem: {
      _id: "",
      fecha_inscripcion: "",
      codigo: "",
      usuario: "",
      aula: ""
    },
    listaIncripcionesXGrado:[],


    dialog2:"",
    turnos: [
     {
        nombre: "Mañana",
        _id: 1
      },
      {
        nombre: "Tarde",
        _id: 2
      },
      {
        nombre: "Noche",
        _id: 3
      }
    ],
  }),

  created() {
    this.initialize();
    this.grados();
    this.secciones();
    this.docentes();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nueva Inscripción"
        : "Modificar Inscripción";
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  methods: {
    
    initialize() {
    var usuario = this.currentUser.id;
        console.log("usuario logeado => ",usuario);
        inscripcionService
          .show(usuario)
          .then(res => {
            this.desserts = Object.assign(
              [this.editedIndex],
              res.data.inscripcion
            );
            this.desserts.map((i) => {
              let date = new Date(i.fecha_inscripcion);
              i.fecha_inscripcion = moment(date).format('DD/MM/YYYY - HH:mm A');
            });
          })
          .catch(e => {
            console.log(e);
            console.log("neles");
          });
     // } 
    },

    save() {
      
            console.log("cntr",this.desserts.length);
      var data = {
       // _id: this.inscripcion._id,
        //fecha_inscripcion: "2020-01-01 00:00:00",
        aula: this.inscripcion.aula,
        usuario: this.currentUser.id
      };
      console.log(data);
        inscripcionService
          .create(data)
          .then(response => {
            this.inscripcion._id = response.data._id;
            console.log(response.data);
            this.$refs.form.reset();
            //this.dialog = false;
            this.initialize();
            alert("Inscripción creada con éxito");
            

            // ____________ agregado ___________________

            /* var contador = 0;
            for (let j = 0; j < this.desserts.length; j++) {
              contador += 1
            } */
            var contador = this.desserts.length;
            var suma = contador + 1;
            console.log(suma);
            var data = {
              _id: this.currentUser.id,
              cntr: suma,
            };
            UserService.updateCntr(data._id, data)
              .then((response) => {
                data._id = response.data._id;
                console.log("si funcionó");
                //alert("Usuario modificado con éxito");
              })
              .catch((e) => {
                //alert("Error al modificar");
                console.log("no guardo cntr");
              });
            // ____________ cierre agregado ___________________
            this.close();
          })
          .catch(e => {
            console.log(e);
          });
          
      //}
    },

    editar() {
      var data = {
        _id: this.inscripcion._id,
        usuario: this.inscripcion.usuario,
        aula: this.inscripcion.aula
      };
      console.log(data);
        inscripcionService
          .update(data._id, data)
          .then(response => {
            data._id = response.data._id;
            console.log(response.data);
            this.dialog2 = false;
            alert("Inscripción modificada con éxito");
            this.initialize();
            this.$refs.form.reset();
          })
          .catch(e => {
            alert("No se pudo modificar");
            console.log(e);
          });
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      var opcion = confirm("¿Estás seguro de querer eliminar el registro?");
      if (opcion == true) {
        this.desserts.splice(index, 1);
        inscripcionService
          .remove(item._id)
          .then(response => {
            console.log(response.data);
            this.$refs.form.reset();
            alert("Inscripción eliminada con éxito");
            this.initialize();
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        console.log("No se elimino");
      }
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.inscripcion = Object.assign({}, item);
      //console.log(this.inscripcion)
      this.dialog2 = true;
    },
    close() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.inscripcion = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        
      });
    },
    close2() {
      this.dialog2 = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.inscripcion = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.initialize();
    },
    generar() {
      var codigo = this.inscripcion.codigo;
      console.log(codigo);
      inscripcionService
        .generarAula(codigo)
        .then(res => {
          console.log(res.data.aula);
          this.inscripcion.aula = res.data.aula[0]._id;
          this.inscripcion.numero = res.data.aula[0].numero;
          this.inscripcion.turno = res.data.aula[0].turno;
          this.inscripcion.grado = res.data.aula[0].grado.nombre;
          this.inscripcion.seccion = res.data.aula[0].seccion.nombre;
        })
        .catch(e => {
          console.log(e);
        });
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

    buscarGrado() {
      var codigo = this.buscarCodigo;
      console.log(codigo);
      inscripcionService
        .generarAula(codigo)
        .then(res => {
          localStorage.setItem('buscarAula', JSON.stringify(res.data.aula[0]._id));
          this.initialize();
        })
        .catch(e => {
          console.log(e);
        });
    },
    llevarInscripcion(item){
      localStorage.setItem('aula', JSON.stringify(item.aula._id));
      localStorage.setItem('id_inscripcion', JSON.stringify(item._id));
      //localStorage.setItem('id_docente', JSON.stringify(item.user._id));
      this.$router.push('/Grado');
    },
    llevarInscripcion2(item){
      localStorage.setItem('aula', JSON.stringify(item.aula._id));
      localStorage.setItem('id_inscripcion', JSON.stringify(item._id));
     // localStorage.setItem('id_docente', JSON.stringify(item.user._id));
      this.$router.push('/GradoEncargados');
    },

    grados(){
      inscripcionService
        .traerGrados()
        .then(res => {
          this.grados = res.data.grados;
          console.log("grados",this.grados)
        })
        .catch(e => {
          console.log(e);
        });
    },

    secciones(){
      inscripcionService
        .traerSecciones()
        .then(res => {
          this.secciones = res.data.seccion;
          console.log(this.secciones)
        })
        .catch(e => {
          console.log(e);
        });
    },

    docentes(){
      var role = "5efb6e28cc97240017ce786f"
      inscripcionService
        .traerDocentes(role)
        .then(res => {
          this.docentes = res.data.usuario;
          console.log("docentes",this.docentes)
        })
        .catch(e => {
          console.log(e);
        });
    }


  }
};
</script>
