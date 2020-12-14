<template>
<v-img src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
<v-container  >
  <v-row>
    <v-col cols="6">
      <v-data-table style="border-radius: 15px"
    :headers="headers"
    :items="desserts"
    :search="buscar"
    class="elevation-5 mr-2 ml-2 mt-8"
  >
    <template v-slot:top  >
      <!-- encabezado de la tabla -->
      <v-toolbar flat color style="border-radius: 15px" >
        <v-toolbar-title>
          <h3 class="text-center font-weight-bold" style="color: #1A237E">Listado de Grados</h3> 
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- input de busqueda(filtro) 
        <v-text-field
          class="text-xs-center"
          v-model="buscar"
          append-icon="search"
          label="Busqueda"
          single-line
          hide-details
          color="cyan"
        ></v-text-field>
        <v-spacer></v-spacer>-->

        <!-- formulario temporal -->
        <v-dialog v-model="dialog" max-width="500px" style="color:purple">
          <template v-slot:activator="{ on }">
            <v-btn color="#3F51B5" dark class="mb-2" v-on="on">Nuevo Grado</v-btn>
          </template>
          <v-card style="border-radius: 10px">
            <v-form ref="form" :lazy-validation="lazy">
              <v-card-title >
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="grado.nombre"
                        :rules="RolTexto"
                        :items="items2"
                        label="Grado"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
               <!-- <v-btn
                  color="green darken-1"
                  text
                  @click="generar"
                  v-if="grado.grado !='' && grado.seccion != '' && grado.codigo ==''"
                >Generar Codigo</v-btn> -->
                <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  v-if="grado.nombre !=''"
                >Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
          <!-- Cierre formulario temporal -->
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- Datos de la tabla -->
    <template v-slot:item.actions="{ item }">
     <!-- <v-icon small color="orange" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon> 
      <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>-->
    </template>
    <template v-slot:no-data>
      <v-btn color="accent" @click="initialize">Refrescar</v-btn>
    </template>
  </v-data-table>
    </v-col>
    <v-col cols="6">
      <v-data-table style="border-radius: 15px"
    :headers="headersS"
    :items="dessertsS"
    :search="buscar2"
    class="elevation-5 mr-2 ml-2 mt-8"
  >
    <template v-slot:top >
      <!-- encabezado de la tabla -->
      <v-toolbar flat color style="border-radius: 15px">
        <v-toolbar-title>
          <h3 class="text-center font-weight-bold" style="color: #1A237E">Listado de Secciones</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- input de busqueda(filtro) 
        <v-text-field
          class="text-xs-center"
          v-model="buscar2"
          append-icon="search"
          label="Busqueda"
          single-line
          hide-details
          color="cyan"
        ></v-text-field>
        <v-spacer></v-spacer>-->

        <!-- formulario temporal -->
        <v-dialog v-model="dialogS" max-width="500px" style="color:purple">
          <template v-slot:activator="{ on }">
            <v-btn color="#3F51B5" dark class="mb-2" v-on="on">Nueva Sección</v-btn>
          </template>
          <v-card style="border-radius: 10px">
            <v-form ref="form" :lazy-validation="lazy" >
              <v-card-title>
                <span class="headline">{{ formTitleS }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="seccion.nombre"
                        :rules="RolTexto"
                        :items="items"
                        label="Sección"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="closeS">Cancelar</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="saveS"
                  v-if="seccion.nombre !=''"
                >Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
          <!-- Cierre formulario temporal -->
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- Datos de la tabla -->
    <template v-slot:item.actions="{ item }">
      <!-- <v-icon small color="orange" class="mr-2" @click="editItemS(item)">mdi-pencil</v-icon> 
      <v-icon small color="red" @click="deleteItemS(item)">mdi-delete</v-icon> -->
    </template>
    <template v-slot:no-data>
      <v-btn color="accent" @click="initializeS">Refrescar</v-btn>
    </template>
  </v-data-table>
    </v-col>
  </v-row>
  
  <!-- T____________________________________abla Secciones _______________________________________________- -->
  
  
  <br>
  </v-container>
</v-img>
</template>

<script>
import gradosService from "../services/gradosService";
import seccionesService from "../services/seccionesService";
export default {
  data: () => ({
    lazy:"",
    buscar: "",
    _id: "",
    nombre: "",
    RolTexto: [v => !!v || "Este campo es requerido"],
    dialog: false,
    items2: [
      "Primer Grado",
      "Segundo Grado",
      "Tercer Grado",
      "Cuarto Grado",
      "Quinto Grado",
      "Sexto Grado",
      "Septimo Grado",
      "Octavo Grado",
      "Noveno Grado"
    ],
    headers: [
      {
        text: "Grado",
        sortable: false,
        value: "nombre"
      },
     // { text: "Acciones", value: "actions", sortable: false }
    ],

    //datos para la tabla
    desserts: [],
    editedIndex: -1,
    //inicializa vacio
    grado: {
      _id: null,
      nombre: ""
    },
    
    buscar2: "",
    dialogS: false,
    items: [
      "A",
      "B",
      "C",
      "D"
    ],
    headersS: [
      {
        text: "Sección",
        sortable: false,
        value: "nombre"
      },
      //{ text: "Acciones", value: "actions", sortable: false }
    ],
    dessertsS: [],
    seccion: {
      _id: null,
      nombre: ""
    }
  }),
  // titulo de ventana de Dialogo
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Grado" : "Modificar Grado";
    },
    formTitleS() {
      return this.editedIndex === -1 ? "Nueva Sección" : "Modificar Sección";
    }
  },

  // llama el dialog
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogS(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    this.initializeS();
  },

  methods: {
    //_________________ver_________________________
    initialize() {
      gradosService
        .index()
        .then(res => {
          this.desserts = Object.assign([this.editedIndex],res.data.grados);
          console.log(Object.assign([this.editedIndex],res.data.grados))
        })
        .catch(e => {
          console.log(e);
        });
    },
    initializeS() {
      seccionesService
        .index()
        .then(res => {
          this.dessertsS = Object.assign([this.editedIndex],res.data.seccion);
          console.log(Object.assign([this.editedIndex],res.data.secciones))
        })
        .catch(e => {
          console.log(e);
        });
    },
    //__________________generar codigo________________________
   /* generar() {
      gradosService
        .codigoaleatorio()
        .then(res => {
          console.log(res.data.codigo);
          this.grado.codigo = res.data.codigo;
        })
        .catch(e => {
          console.log(e);
        });
    },*/
    //__________________________________________
    save() {
      var data = {
        _id: this.grado._id,
        nombre: this.grado.nombre
      };
      console.log(data);
        this.$refs.form.reset();
      if (this.editedIndex >= 0) {
        Object.assign(this.desserts[this.editedIndex], this.grado);
  
        //_______________________________actualizar________________________
        gradosService
          .update(data._id, data)
          .then(response => {
            data._id = response.data._id;
            console.log(response.data);
            this.dialog = false;
            alert("Grado modificado con éxito");
            this.initialize();
          })
          .catch(e => {
            alert("Error al modificar grado");
            console.log(e);
          });
      } else {//___________________________guardar____________________
        gradosService
          .create(data)
          .then(response => {
            this.grado._id = response.data._id;
            console.log(response.data);
            this.dialog = false;
            alert("Grado creado con éxito");
            this.initialize();
          })
          .catch(e => {
            alert("Error || Ya existe este grado");
            this.dialog = false;
            console.log(e);
          });
        }
        },

    saveS() {
      var data = {
        _id: this.seccion._id,
        nombre: this.seccion.nombre
      };
      console.log(data);
        this.$refs.form.reset();
      if (this.editedIndex >= 0) {
        Object.assign(this.dessertsS[this.editedIndex], this.seccion);
  
        //_______________________________actualizar________________________
        seccionesService
          .update(data._id, data)
          .then(response => {
            data._id = response.data._id;
            console.log(response.data);
            this.dialogS = false;
            alert("Sección modificada con éxito");
            this.initializeS();
          })
          .catch(e => {
            alert("Error al modificar sección");
            this.dialogS = false;
            console.log(e);
          });
      } else {//___________________________guardar____________________
        seccionesService
          .create(data)
          .then(response => {
            this.seccion._id = response.data._id;
            console.log(response.data);
            this.dialogS = false;
            alert("Sección creada con éxito");
            this.initializeS();
          })
          .catch(e => {
            alert("Error || Ya existe esta sección");
            console.log(e);
          });
        }
        },


    //_______________________________eliminar___________________________
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("¿Estás seguro de querer eliminar el registro?") &&
        this.desserts.splice(index, 1);
      gradosService
        .remove(item._id)
        .then(response => {
          console.log(response.data);
          alert("Grado eliminado con éxito");
          this.initialize();
        })
        .catch(e => {
          alert("Error al eliminar");
          console.log(e);
        });
    },
    deleteItemS(item) {
      const index = this.dessertsS.indexOf(item);
      confirm("¿Estás seguro de querer eliminar la sección?") &&
        this.desserts.splice(index, 1);
      seccionesService
        .remove(item._id)
        .then(response => {
          console.log(response.data);
          alert("Sección eliminada con éxito");
          this.initializeS();
        })
        .catch(e => {
          alert("Error al eliminar");
          console.log(e);
        });
    },
    //__________________________________________
    //metdo editar
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.grado = Object.assign({}, item);
      this.dialog = true;
    },
    editItemS(item) {
      this.editedIndex = this.dessertsS.indexOf(item);
      this.seccion = Object.assign({}, item);
      this.dialogS = true;
    },
    
    //metdo cerrar dialog
    close() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.grado = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeS() {
      this.dialogS = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.seccion = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    
  }
};
</script>
