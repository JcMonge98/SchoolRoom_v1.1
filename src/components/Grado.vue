<template>
<v-img src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" >
  <v-content >
    <v-row>
      <v-col cols="12" sm="12"  >
        <!-- __________________________________________________ formulario temporal ____________________________________________________-->
        <v-dialog v-model="dialog" max-width="500px" >
          <template v-slot:activator="{ on }">
            <div class="offset-1" >
              <v-btn
                @click="llenarCombo"
                style="border-radius: 10px"
                color="purple"
                dark
                class="mb-2 mx-auto offset-md-2"
                v-on="on"
                v-if="
                  currentUser.role == 'ROLE_DOCENTE'
                "
              >Inscribir Materia</v-btn>
              <v-btn
                @click="dialog2=true"
                style="border-radius: 10px"
                color="cyan"
                dark
                class="mb-2 mx-auto ml-12"
              >Ver Personas</v-btn>
              <v-btn
              style="border-radius: 10px"
                color="#3F51B5"
                dark
                class="mb-2 mx-auto ml-8"
                @click="borrarStorage()"
              >volver al listado</v-btn>
            </div>
          </template>
          <v-card style="border-radius: 15px">
            <v-form ref="form" :lazy-validation="lazy" >
              <v-card-title >
                <span class="headline">Inscribir Materia</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <!--  <v-text-field v-model="user" label="Docente" disabled></v-text-field> -->
                  <v-select
                    :items="ins"
                    v-model="materia"
                    item-text="nombre"
                    item-value="_id"
                    placeholder="Seleccione una materia"
                    label="Materia"
                    required
                  ></v-select>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save" v-if="materia != ''">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" max-width="800px" >
            <v-card style="border-radius: 10px" max-width="800px">
        <v-data-table 
    :headers="headers"
    :items="desserts"
    class=""
    style="border-radius: 15px"
  >
    <template v-slot:top>
      <!-- encabezado de la tabla -->
      <v-toolbar flat color style="border-radius: 15px" >
        <v-toolbar-title>
          <h3 class="text-center font-weight-bold" style="color: #1A237E">Personas</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <!-- Datos de la tabla -->
    <template v-slot:item.actions="{ item }">
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="VerPersonas">Ver Personas</v-btn>
    </template>
  </v-data-table>
            </v-card>

        </v-dialog>
        <!-- __________________________________________________ formulario temporal ____________________________________________________-->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" v-for="(gradi, index) in grados" :key="index">
        <div cols="12" sm="12" class="text-center" >
          <v-chip class="ma-2" color="blue lighten-5" outlined x-large>
            <v-icon left>mdi-server-plus</v-icon>
            <strong>{{ gradi.grado.nombre }} "{{ gradi.seccion.nombre }}" Aula: {{ gradi.numero }}</strong>
          </v-chip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" sm="3" v-for="(detalle, index) in detalles" :key="index" class="mb-4 mr-12 mt-8 ml-12">
        <v-hover>
          <template v-slot="{ hover }" v-if="currentUser.role == 'ROLE_DOCENTE'">
            <v-form action>
              <v-card class="mx-auto" style="border-radius: 28px" :elevation="hover ? 24 : 2">
                <v-img class="blanck--text center" height="200px" src="../assets/55.jpg">
                   <br> <br> <br><v-card-title>
                    <h3>{{ detalle.materia.nombre }}</h3>
                  </v-card-title> 
                  <br>
                  <v-card-subtitle class="pb-0 black--text">Prof:{{' ' + detalle.inscripcion.usuario.nombres + ' ' + detalle.inscripcion.usuario.apellidos}}</v-card-subtitle>
                </v-img>
                <br>
                <v-card-text class="text--primary">
                  <div>Presiona entrar, para poder vizualizar todas las tareas de esta materia</div>
                </v-card-text>
                <v-card-actions>
                  <div class="center">
                    <v-btn color="#4A148C" text @click="llevarDetalle(detalle)">Entrar</v-btn>
                    <v-btn color="red" text @click="eliminarDetalle(detalle)">Eliminar</v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-form>
          </template>
        </v-hover>
      </v-col>
    </v-row>


    
  </v-content>
</v-img>
</template>
<script>
import detalleService from "../services/detalleService";
import gradosService from "../services/gradosService";

import inscripcionService from "../services/inscripcionService";

export default {
  data: () => ({
    grados: [],
    lazy: "",
    user: "",
    dialog: "",
    dialog2: false,
    materia: "",
    materias: [],
    materiasuno: [],
    docentes: [],
    inscripcion: "",
    detalles: [],
    detalles2: [],
    ins: [],

    headers: [
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
    ],
    desserts: [],
  }),
  created() {
    this.cargarMaterias();
    this.mostrarGrado();
    this.initialize();
    this.detallesGrado();
  },
  methods: {
    
    initialize() {
        var inscripcion = JSON.parse(localStorage.getItem("id_inscripcion"));
        detalleService.show(inscripcion).then(res => {
          this.detalles = res.data.detalle;
          //console.log("detallesOne", res.data.detalle);
          localStorage.setItem('detalles', JSON.stringify(this.detalles));
          }).catch(e => {console.log(e);});
    },

    detallesGrado(){
        var grado = JSON.parse(localStorage.getItem("aula"));
        detalleService.show2(grado).then(res => {
          this.detalles2 = res.data.detalle;
          localStorage.setItem('detallesG', JSON.stringify(this.detalles2));
          }).catch(e => {console.log(e);});
    },

    eliminarDetalle(detalle) {
      const index = this.detalles.indexOf(detalle);
      confirm("¿Estas seguro de querer eliminar el registro?") &&
        //this.desserts.splice(index, 1);
      detalleService
        .remove(detalle._id)
        .then(response => {
          console.log(response.data);
          //this.$router.push({ name: "tutorials" });
          alert("Detalle eliminado con éxito");
          //this.detallesGrado();
          //this.llenarCombo();
          this.initialize();
        })
        .catch(e => {
          console.log(e);
        });
    },

    borrarStorage() {
      //localStorage.removeItem("grado");
      localStorage.removeItem("id_inscripcion");
      localStorage.removeItem("aula");
      localStorage.removeItem("detalles");
      localStorage.removeItem("detallesG");
      //localStorage.removeItem("materias");
      this.$router.push("/ListadoInscripciones");
    },

    llenarCombo(){
      var deta = JSON.parse(localStorage.getItem("detallesG"));
      var mate = JSON.parse(localStorage.getItem("materias"));
      console.log(deta,mate);
      if (deta != null) {
        for (var i = 0; i < mate.length; i++) {
        var igual=false;
        for (var j = 0; j < deta.length & !igual; j++) {
          if(mate[i]['nombre'] == deta[j]['materia']['nombre']) 
                 igual=true;
          }
          if(!igual)this.ins.push(mate[i]);
        }
      }else{
        for (var j = 0; j < mate.length; j++) {
          
          this.ins.push(mate[j]);
        } 
     }
     console.log(this.ins)
      /* var deta = JSON.parse(localStorage.getItem("detalles"));
      var mate = JSON.parse(localStorage.getItem("materias"));

      if (deta != null) {
        for (var i = 0; i < mate.length; i++) {
        var igual=false;
        for (var j = 0; j < deta.length & !igual; j++) {
          if(mate[i]['_id'] == deta[j]['materia']['_id']) 
                 igual=true;
          }
          if(!igual)this.ins.push(mate[i]);
        }
      }else{
        for (var j = 0; j < mate.length; j++) {
          
          this.ins.push(mate[j]);
        } 
     } */
      
      
    },

    save() {
      var data = {
        materia: this.materia,
        inscripcion: JSON.parse(localStorage.getItem("id_inscripcion")),
        aula: JSON.parse(localStorage.getItem("aula"))
      };
      detalleService
        .create(data)
        .then(response => {
          console.log(response.data);
          this.$refs.form.reset();
          this.llenarCombo();
          this.dialog = false;
          this.initialize();
          alert("Materia creada con éxito");

          // ____________ agregado ___________________

            var contador = this.detalles.length;
            var suma = contador + 1;
            console.log(suma);
            var data = {
              _id: JSON.parse(localStorage.getItem("id_inscripcion")),
              cntr: suma,
            };
            console.log("data", data);
            inscripcionService.updateCntr(data._id, data)
              .then((response) => {
                data._id = response.data._id;
                console.log("si funciono");
              })
              .catch((e) => {
                console.log("no guardo cntr");
              });
            // ____________ cierre agregado ___________________
        })
        .catch(e => {
          console.log(e);
        });
    },

    llevarDetalle(detalle) {
      localStorage.setItem("id_detalle", JSON.stringify(detalle._id));
      //localStorage.setItem("id_materia", JSON.stringify(detalle.materia._id));
      //localStorage.setItem("id_docente", JSON.stringify(detalle.inscripcion._id));
      this.$router.push("/Tablon2");
    },

    mostrarGrado() {
      var _id = JSON.parse(localStorage.getItem("aula"));
      detalleService
        .traerGrados(_id)
        .then(res => {
          this.grados = Array.from(res.data.aula);
          //console.log("aulas", Array.from(res.data.aula));
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    cargarMaterias() {
      var i = "";
      detalleService
        .traerMaterias()
        .then(res => {
          i = res.data.materia;
          this.materias = i;
          //console.log("materias", i);
          localStorage.setItem('materias', JSON.stringify(this.materias));
        })
        .catch(e => {
          console.log(e);
        });
    },
    close() {
      this.$refs.form.reset();
      this.dialog = false;
    },

    VerPersonas(){
      var aula = JSON.parse(localStorage.getItem("aula"));
          inscripcionService
          .showAdmin(aula)
          .then(res => {
            this.desserts = Object.assign(
              [this.editedIndex],
              res.data.inscripcion
            );
            console.log(
              Object.assign([this.editedIndex], res.data.inscripcion)
            );
          })
          .catch(e => {
            console.log(e);
            console.log("neles");
          });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
