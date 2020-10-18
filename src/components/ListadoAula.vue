<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="buscar"
    class="elevation-5 mr-12 ml-12 mt-8"
  >
    <template v-slot:top>
      <!-- encabezado de la tabla -->
      <v-toolbar flat color>
        <v-toolbar-title>
          <h3 class="text-center">Listado de Aulas</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- input de busqueda(filtro) -->
        <v-text-field
          class="text-xs-center"
          v-model="buscar"
          append-icon="search"
          label="Busqueda"
          single-line
          hide-details
          color="cyan"
        ></v-text-field>
        <v-spacer></v-spacer>

        <!-- formulario temporal -->
        <v-dialog v-model="dialog" max-width="500px" style="color:purple">
          <template v-slot:activator="{ on }">
            <v-btn color="purple" dark class="mb-2" v-on="on">Nueva Aula</v-btn>
          </template>
          <v-card>
            <v-form ref="form" :lazy-validation="lazy">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <!-- <v-row>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="grado._id"
                        :rules="RolTexto"
                        label="Codigo"
                        disabled
                      ></v-text-field> 
                    </v-col>
                  </v-row> -->
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="aula.numero"
                        :rules="RolTexto"
                        label="Numero"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-model="aula.turno"
                        :rules="RolTexto"
                        :items="turnos"
                        item-text="nombre"
                        item-value="_id"
                        label="Turno"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="aula.codigo"
                        :rules="RolTexto"
                        label="Codigo"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="aula.grado"
                        :items="grados"
                        item-text="nombre"
                        item-value="_id"
                        label="Grado"
                        :rules="RolTexto"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="aula.seccion"
                        :items="secciones"
                        item-text="nombre"
                        item-value="_id"
                        label="Seccion"
                        :rules="RolTexto"
                      ></v-select>
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
                  v-if="aula.turno !='' && aula.numero != '' && aula.codigo ==''"
                >Generar Codigo</v-btn>
                <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  v-if="aula.codigo !=''"
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
      <v-icon small color="orange" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="accent" @click="initialize">Refrescar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import aulasService from "../services/aulasService";
export default {
  data: () => ({
    lazy:"",
    buscar: "",
    _id: "",
    numero: "",
    turno: "",
    grado: "",
    seccion: "",
    codigo: "",
    RolTexto: [v => !!v || "Este campo es requerido"],
    dialog: false,
    grados: [],
    secciones: [],
    headers: [
     /* {
        text: "Codigo",
        align: "start",
        sortable: false,
        value: "_id"
      },*/
      {
        text: "Numero",
        sortable: false,
        value: "numero"
      },
      {
        text: "Turno",
        sortable: false,
        value: "turno"
      },
      {
        text: "Codigo Aula",
        sortable: false,
        value: "codigo"
      },
      {
        text: "Grado",
        sortable: false,
        value: "grado.nombre"
      },
      {
        text: "Seccion",
        sortable: false,
        value: "seccion.nombre"
      },
      { text: "Acciones", value: "actions", sortable: false }
    ],

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

    //datos para la tabla
    desserts: [],
    editedIndex: -1,
    //inicializa vacio
    aula: {
      _id: null,
      numero: "",
      turno: "",
      codigo: "",
      grado: "",
      seccion: ""
    },
    /*editedItem: {
      id: "",
      num_grado: "",
      seccion: "",
      codigo: ""
    },*/
    defaultItem: {
      id: "",
      numero: "",
      turno: "",
      codigo: "",
      grado: "",
      seccion: ""
    }
  }),
  // titulo de ventana de Dialogo
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Aula" : "Modificar Aula";
    }
  },

  // llama el dialog
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    this.cargarGrados();
    this.cargarSecciones();     
  },

  methods: {
    //_________________ver_________________________
    initialize() {
      aulasService
        .index()
        .then(res => {
          this.desserts = Object.assign([this.editedIndex],res.data.aula);
          console.log(Object.assign(res.data.aula))
        })
        .catch(e => {
          console.log(e);
        });
    },
    //__________________generar codigo________________________
    generar() {
      /*var data = {
        codigo: this.grado.codigo
      }; */
      aulasService
        .codigoaleatorio()
        .then(res => {
          console.log(res.data.codigo);
          this.aula.codigo = res.data.codigo;
        })
        .catch(e => {
          console.log(e);
        });
    },
    //__________________________________________
    save() {
      var data = {
        _id: this.aula._id,
        numero: this.aula.numero,
        turno: this.aula.turno,
        codigo: this.aula.codigo,
        grado: this.aula.grado,
        seccion: this.aula.seccion
      };
      console.log(data);
        this.$refs.form.reset();
      if (this.editedIndex >= 0) {
        //Object.assign(this.desserts[this.editedIndex], this.aula);
  
        //_______________________________actualizar________________________
        aulasService
          .update(data._id, data)
          .then(response => {
            data._id = response.data._id;
            console.log(response.data);
            this.dialog = false;
            alert("Aula modificada con éxito");
            this.initialize();
          })
          .catch(e => {
            console.log(e);
          });
      } else {//___________________________guardar____________________
        aulasService
          .create(data)
          .then(response => {
            this.aula._id = response.data._id;
            console.log(response.data);
            this.dialog = false;
            alert("Aula creada con éxito");
            this.initialize();
          })
          .catch(e => {
            console.log(e);
          });
        }
        },


    //_______________________________eliminar___________________________
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Estas seguro de querer eliminar el registro?") &&
        this.desserts.splice(index, 1);
      aulasService
        .remove(item._id)
        .then(response => {
          console.log(response.data);
          //this.$router.push({ name: "tutorials" });
          alert("Aula eliminada con éxito");
          this.initialize();
        })
        .catch(e => {
          console.log(e);
        });
    },
    //__________________________________________
    //metdo editar
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.aula = Object.assign({}, item);
      //console.log( Object.entries({},item.numero,item.turno,item.codigo,item.grado._id,item.seccion._id));
      this.dialog = true;
    },
    
    //metdo cerrar dialog
    close() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.aula = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    cargarGrados() {
      aulasService
        .traerGrados()
        .then(res => {
          this.grados = res.data.grados;
          console.log("grados",this.grados);
        })
        .catch(e => {
          console.log(e);
        });
    },
    cargarSecciones() {
      aulasService
        .traerSecciones()
        .then(res => {
          this.secciones = res.data.seccion;
          console.log("secciones",this.secciones);
        })
        .catch(e => {
          console.log(e);
        });
    },    
  }
};
</script>
