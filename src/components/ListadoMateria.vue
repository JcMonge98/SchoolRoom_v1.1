<template>
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
          <h3 class="text-center">Listado de Materias</h3>
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
          color="danger"
        ></v-text-field>
        <v-spacer></v-spacer>

        <!-- formulario temporal -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="purple" dark class="mb-2" v-on="on"
              >Nueva Materia</v-btn
            >
          </template>
          <v-card>
            <v-form ref="form" :lazy-validation="lazy">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="materia.nombre"
                        :rules="RolTexto"
                        label="Nombre materia"
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
                  @click="validar()"
                  v-if="materia.nombre.length > 5"
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
      <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="accent" @click="initialize">Refrescar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
//aqui
import materiasService from "../services/materiasService";

export default {
  data: () => ({
    lazy: "",
    buscar: "",
    _id: null,
    nombre: "",
    //RolTexto: [v => !!v || "Este campo es requerido"],A-Za-z ñ
    RolTexto: [
      (v) => !!v || "Este campo es requerido",
      (v) => /[a-zA-Z]\d*/.test(v) || "No se permiten números",
    ],
    dialog: false,
    headers: [
      {
        text: "Materia",
        sortable: false,
        value: "nombre"
      },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    defaultItem: {
      _id: null,
      nombre: ""
    },
    materias: [],
    materia: {
      _id: null,
      nombre: ""
    }
  }),
  // titulo de ventana de Dialogo
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva materia" : "Modificar Materia";
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    validar(){
      var numeros="0123456789";
      for(var i=0; i<this.materia.nombre.length; i++){
          if (numeros.indexOf(this.materia.nombre.charAt(i),0)!=-1){
            return alert("No se permiten numeros");
            
          }
      }
      return this.save();
    }, 

    //_________________ver_________________________
    initialize() {
      materiasService
        .index()
        .then(res => {

          this.desserts = Object.assign([this.editedIndex],res.data.materia);
          console.log(Object.assign([this.editedIndex],res.data.materia))
        })
        .catch(e => {
          console.log(e);
        });
    },
    //__________________________________________
    save() {
      var data = {
        _id: this.materia._id,
        nombre: this.materia.nombre
      };
        this.$refs.form.reset();
      if (this.editedIndex >= 0 ) {
        Object.assign(this.desserts[this.editedIndex], this.materia);
  
        //_______________________________actualizar________________________
        materiasService
          .update(data._id, data)
          .then(response => {
            data._id = response.data._id;
            console.log(response.data);
            this.dialog = false;
            alert("Materia modificada con éxito");
            this.initialize();
          })
          .catch(e => {
            console.log(e);
          });
      } else {//___________________________guardar____________________
        materiasService
          .create(data)
          .then(response => {
            this.materia._id = response.data._id;
            console.log(response.data);
            this.dialog = false;
            alert("Materia registrada con éxito");
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
      materiasService
        .remove(item._id)
        .then(response => {
          console.log(response.data);
          //this.$router.push({ name: "tutorials" });
          alert("Materia eliminada con éxito");
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
      this.materia = Object.assign({}, item);
      this.dialog = true;
    },

    //metdo cerrar dialog
    close() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.materia = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }
  }
};
</script>
