<template>
<v-img src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" >
  <v-container>
   <!-- <v-row no-gutters>
      <v-col cols="6">
        <v-data-table
          :headers="headersG"
          :items="dessertsG"
          class="elevation-5 mr-1 ml-1 mt-8"
        >
          <template v-slot:top>
            <v-toolbar flat color>
              <v-toolbar-title>
                <h3 class="text-center">Listado de Grados</h3>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <v-dialog
                v-model="dialogG"
                max-width="500px"
                style="color: purple"
              >
                <template v-slot:activator="{ on }">
                  <v-btn color="purple" dark class="mb-2" v-on="on"
                    >Nuevo Grado</v-btn
                  >
                </template>
                <v-card>
                  <v-form ref="form" :lazy-validation="lazy">
                    <v-card-title>
                      <span class="headline">{{ formTitleG }}</span>
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
                      <v-btn color="red darken-1" text @click="closeG"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="saveG"
                        v-if="grado.nombre != ''"
                        >Guardar</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small color="orange" class="mr-2" @click="editItemG(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small color="red" @click="deleteItemG(item)"
              >mdi-delete</v-icon
            >
          </template>
          <template v-slot:no-data>
            <v-btn color="accent" @click="initializeG">Refrescar</v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="6">
        <v-data-table
          :headers="headersS"
          :items="dessertsS"
          class="elevation-5 mr-1 ml-6 mt-8"
        >
          <template v-slot:top>
            <v-toolbar flat color>
              <v-toolbar-title>
                <h3 class="text-center">Listado de Secciones</h3>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <v-dialog
                v-model="dialogS"
                max-width="500px"
                style="color: purple"
              >
                <template v-slot:activator="{ on }">
                  <v-btn color="purple" dark class="mb-2" v-on="on"
                    >Nueva Seccion</v-btn
                  >
                </template>
                <v-card>
                  <v-form ref="form" :lazy-validation="lazy">
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
                              :items="itemsS"
                              label="Seccion"
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="closeS"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="saveS"
                        v-if="seccion.nombre != ''"
                        >Guardar</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon small color="orange" class="mr-2" @click="editItemS(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small color="red" @click="deleteItemS(item)"
              >mdi-delete</v-icon
            >
          </template>
          <template v-slot:no-data>
            <v-btn color="accent" @click="initializeS">Refrescar</v-btn>
          </template>
        </v-data-table>
        <br />
      </v-col>
    </v-row>   -->
    <v-row no-gutters >
      <v-col cols="12" >
        <v-data-table style="border-radius: 15px;margin-top: 4px;"
          :headers="headers"
          :items="desserts"
          :search="buscar"
          class="elevation-5 mr-1 ml-1 mb-1 mt-8"
        >
          <template v-slot:top>
            <!-- encabezado de la tabla -->
            <v-toolbar flat color style="border-radius: 15px">
              <v-toolbar-title>
                <h3 class="text-center font-weight-bold" style="color: #1A237E">Listado de Aulas</h3>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- input de busqueda(filtro) -->
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

              <!-- formulario temporal -->
              <v-dialog
                v-model="dialog"
                max-width="500px"
                style="color: purple"
              >
                <template v-slot:activator="{ on }">
                  <v-btn color="#3F51B5" dark class="mb-2" v-on="on"
                    >Nueva Aula</v-btn
                  >
                </template>
                <v-card style="border-radius: 10px">
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
                          <v-col cols="12" sm="4" md="4" >
                            <v-text-field
                              v-model="aula.numero"
                              :rules="RolTexto"
                              label="Número de Aula"
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
                              label="Código"
                              required
                              disabled
                              v-if="aula.numero != '' && aula.turno != ''"
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
                              label="Sección"
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
                        v-if="
                          aula.turno != '' &&
                          aula.numero != '' &&
                          aula.codigo == ''
                        "
                        >Generar Código</v-btn
                      >
                      <v-btn color="red darken-1" text @click="close"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                        v-if="aula.codigo != '' && aula.numero != '' && aula.turno != '' && aula.grado != '' && aula.seccion != ''"
                        >Guardar</v-btn
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
            <v-icon small color="orange" class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small color="red" @click="deleteItem(item)"
              >mdi-delete</v-icon
            >
          </template>
          <template v-slot:no-data>
            <v-btn color="accent" @click="initialize">Refrescar</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</v-img>
</template>

<script>
import aulasService from "../services/aulasService";
//import gradosService from "../services/gradosService";
//import seccionesService from "../services/seccionesService";

export default {
  data: () => ({
    /*//datos de grados
    nombre: "",
    dialogG: false,
    items2: [
      "Primer Grado",
      "Segundo Grado",
      "Tercer Grado",
      "Cuarto Grado",
      "Quinto Grado",
      "Sexto Grado",
      "Septimo Grado",
      "Octavo Grado",
      "Noveno Grado",
    ],
    headersG: [
      {
        text: "Grado",
        sortable: false,
        value: "nombre",
      },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    dessertsG: [],
    editedIndexG: -1,
    grado: {
      _id: null,
      nombre: "",
    },
     defaultItemG: {
      _id: null,
      nombre: "",
    },

    //datos de secciones
    dialogS: false,
    itemsS: ["A", "B", "C", "D"],
    headersS: [
      {
        text: "Seccion",
        sortable: false,
        value: "nombre",
      },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    dessertsS: [],
    editedIndexS: -1,
    seccion: {
      _id: null,
      nombre: "",
    },
    defaultItemS: {
      _id: null,
      nombre: "",
    },
    */
    //datos d3l aula
    lazy: "",
    buscar: "",
    _id: "",
    numero: "",
    turno: "",
    grado: "",
    seccion: "",
    codigo: "",
    RolTexto: [(v) => !!v || "Este campo es requerido"],
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
        text: "Número de Aula",
        sortable: false,
        value: "numero",
      },
      {
        text: "Turno",
        sortable: false,
        value: "turno",
      },
      {
        text: "Código Aula",
        sortable: false,
        value: "codigo",
      },
      {
        text: "Grado",
        sortable: false,
        value: "grado.nombre",
      },
      {
        text: "Sección",
        sortable: false,
        value: "seccion.nombre",
      },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    turnos: [
      {
        nombre: "Matutino",
        _id: 1,
      },
      {
        nombre: "Vespertino",
        _id: 2,
      },
      {
        nombre: "Nocturno",
        _id: 3,
      },
    ],
    desserts: [],
    editedIndex: -1,
    aula: {
      _id: null,
      numero: "",
      turno: "",
      codigo: "",
      grado: "",
      seccion: "",
    },
    defaultItem: {
      id: "",
      numero: "",
      turno: "",
      codigo: "",
      grado: "",
      seccion: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Aula" : "Modificar Aula";
    },
   /* formTitleG() {
      return this.editedIndexG === -1 ? "Nuevo Grado" : "Modificar Grado";
    },
    formTitleS() {
      return this.editedIndexS === -1 ? "Nueva Seccion" : "Modificar Seccion";
    },*/
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
   /* dialogG(val) {
      val || this.closeG();
    },
    dialogS(val) {
      val || this.closeS();
    },*/
  },

  created() {
    //this.initializeG();
   // this.initializeS();

    this.initialize();
    this.cargarGrados();
    this.cargarSecciones();
  },

  methods: {
   /* //_________________   GRADOS _________________________

    initializeG() {
      gradosService
        .index()
        .then((res) => {
          this.dessertsG = Object.assign([this.editedIndexG], res.data.grados);
          console.log(Object.assign([this.editedIndexG], res.data.grados));
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveG() {
      var data = {
        _id: this.grado._id,
        nombre: this.grado.nombre,
      };
      console.log(data);
      this.$refs.form.reset();
      if (this.editedIndexG >= 0) {
        Object.assign(this.dessertsG[this.editedIndexG], this.grado);

        gradosService
          .update(data._id, data)
          .then((response) => {
            data._id = response.data._id;
            console.log(response.data);
            this.closeG();
            alert("Grado modificado con éxito");
            this.initializeG();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        //___________________________guardar____________________
        gradosService
          .create(data)
          .then((response) => {
            this.grado._id = response.data._id;
            console.log(response.data);
            this.closeG();
            alert("Grado creado con éxito");
            this.initializeG();
          })
          .catch((e) => {
            alert("No se creo el Grado");
            console.log(e);
          });
      }
    },
    deleteItemG(item) {
      const index = this.dessertsG.indexOf(item);
      confirm("Estas seguro de querer eliminar el registro?") &&
        this.dessertsG.splice(index, 1);
      gradosService
        .remove(item._id)
        .then((response) => {
          console.log(response.data);
          alert("Grado eliminado con éxito");
          this.initializeG();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editItemG(item) {
      this.editedIndexG = this.dessertsG.indexOf(item);
      this.grado = Object.assign({}, item);
      this.dialogG = true;
    },
    closeG() {
      this.dialogG = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.grado = Object.assign({}, this.defaultItemG);
        this.editedIndexG = -1;
      });
    },

    //_________________  SECCIONES _________________________
    initializeS() {
      seccionesService
        .index()
        .then((res) => {
          this.dessertsS = Object.assign([this.editedIndexS], res.data.seccion);
          console.log(Object.assign([this.editedIndexS], res.data.secciones));
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveS() {
      var data = {
        _id: this.seccion._id,
        nombre: this.seccion.nombre,
      };
      console.log(data);
      this.$refs.form.reset();
      if (this.editedIndexS >= 0) {
        Object.assign(this.dessertsS[this.editedIndexS], this.seccion);
        seccionesService
          .update(data._id, data)
          .then((response) => {
            data._id = response.data._id;
            console.log(response.data);
            this.closeS();
            alert("Seccion modificada con éxito");
            this.initializeS();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        seccionesService
          .create(data)
          .then((response) => {
            this.seccion._id = response.data._id;
            console.log(response.data);
            this.closeS();
            alert("Seccion creada con éxito");
            this.initializeS();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteItemS(item) {
      const index = this.dessertsS.indexOf(item);
      confirm("Estas seguro de querer eliminar la seccion?") &&
        this.dessertsS.splice(index, 1);
      seccionesService
        .remove(item._id)
        .then((response) => {
          console.log(response.data);
          alert("Seccion eliminada con éxito");
          this.initializeS();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editItemS(item) {
      this.editedIndexS = this.dessertsS.indexOf(item);
      this.seccion = Object.assign({}, item);
      this.dialogS = true;
    },
    closeS() {
      this.dialogS = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.seccion = Object.assign({}, this.defaultItemS);
        this.editedIndexS = -1;
      });
    }, */

    //_________________  AULAS _________________________

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
        })
        .catch((e) => {
          console.log("neles", e);
        });
    }, */

   /* initialize() {
      var ca = [];
      aulasService
        .index()
        .then((res) => {
          //let turno = new Turno();
          ca = res.data.aula;
          ca.map((card) => {
            let turno = new Turno(card.turno);
            console.log(card.turno);
            console.log(turno);
            if (card.turno == 1 || card.turno == 2) {
              card.turno = 'Diurno'
            }
            card.turno = "Nocturno"
          });
          console.log(res.data.aula);
          this.desserts = ca;
        })
        //.then((res) => {
         // this.desserts = Object.assign([this.editedIndex], res.data.aula);
         // console.log(Object.assign(res.data.aula));
        //})
        .catch((e) => {
          console.log(e);
        });
    },*/

    initialize() {
      var ca = []
      aulasService
        .index()
        .then((res) => {
          ca = res.data.aula;
          ca.map((card)=> {
            if(card.turno == 1){
              card.turno = "Matutino"
            }
            if(card.turno == 2){
              card.turno = "Vespertino"
            }
            if(card.turno == 3){
              card.turno = "Nocturno"
            }
          })
          this.desserts = Object.assign([this.editedIndex], ca);
          console.log(Object.assign(res.data.aula));
        })
        .catch((e) => {
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
        .then((res) => {
          console.log(res.data.codigo);
          this.aula.codigo = res.data.codigo;
        })
        .catch((e) => {
          alert("Error al generar código");
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
        seccion: this.aula.seccion,
      };
      console.log(data);
      this.$refs.form.reset();
      if (this.editedIndex >= 0) {
        //Object.assign(this.desserts[this.editedIndex], this.aula);

        //_______________________________actualizar________________________
        aulasService
          .update(data._id, data)
          .then((response) => {
            data._id = response.data._id;
            console.log(response.data);
            this.dialog = false;
            alert("Aula modificada con éxito");
            this.initialize();
          })
          .catch((e) => {
            alert("Error al modificar aula");
            console.log(e);
          });
      } else {
        //___________________________guardar____________________
        aulasService
          .create(data)
          .then((response) => {
            this.aula._id = response.data._id;
            console.log(response.data);
            this.dialog = false;
            alert("Aula creada con éxito");
            this.initialize();
          })
          .catch((e) => {
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
      aulasService
        .remove(item._id)
        .then((response) => {
          console.log(response.data);
          //this.$router.push({ name: "tutorials" });
          alert("Aula eliminada con éxito");
          this.initialize();
        })
        .catch((e) => {
          alert("Error al eliminar Aula");
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
        .then((res) => {
          this.grados = res.data.grados;
          console.log("grados", this.grados);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cargarSecciones() {
      aulasService
        .traerSecciones()
        .then((res) => {
          this.secciones = res.data.seccion;
          console.log("secciones", this.secciones);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
