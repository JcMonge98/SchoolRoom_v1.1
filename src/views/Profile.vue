<template> 
<v-img src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
<v-content >
  <v-parallax 
    dark
    style="height: 500px;margin-left: 343px;
    margin-right: 343px;
    margin-top: 100px;
    border-radius: 20px;
    opacacity: 80px"
    src="../assets/33.jpg"
  
   
    
  > 

    <v-row 
      align="center"
      justify="center"
      
    >
    
      <v-img cols="10" style="border-radius: 10px"
            src="../assets/perfil.jpg"
            max-height="170px"
            max-width="170px"
          ></v-img> 

      <v-col class="text-center" cols="6">

        
        <h1 class=" font-weight-medium text-left" style = "padding-left: 10px"
        >Bienvenid@ a SchoolRoom</h1>  
        <br> 
    
        <p class="font-weight-regular text-left " style = "padding-left: 50px;">
      <strong>Codigo:</strong>
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
      <!-- <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li> -->
      <li>{{currentUser.role}}</li>
    </ul>
      </p>
      <br>
      <p class="text-left" style = "padding-left: 50px" >
    <v-btn class tile outlined dark style="border-radius: 10px" color="white" @click="ena">
        <v-icon center  >mdi-folder-plus</v-icon>Modificar Datos
    </v-btn>  
      </p>
      </v-col>
    </v-row>

  </v-parallax>
 
  <template v-if="this.si == true">
    
    <v-card class="mx-auto mt-12" max-width="1000" style="border-radius: 15px">
    <v-card-title>
      <h2 class="text-center font-weight-medium" style="color: #4A148C">Modificar Datos</h2>
    </v-card-title>
    <v-form class="mr-5 ml-5  mb-10" name="form" >
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="id"
            name="Codigo"
            :rules="RolTexto"
            label="Codigo"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="email"
            name="email"
            :rules="Rolemail"
            label="Correo Electronico"
            disabled
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="12" sm="4">
          <v-text-field v-model="role" label="Rol" type="text" value="encargado" disabled></v-text-field>
        </v-col>  -->
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="nombres"
            name="nombres"
            :rules="RolTexto"
            label="Nombres"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="apellidos"
            name="apellidos"
            :rules="RolTexto"
            label="Apellidos"
          ></v-text-field>
        </v-col>
      </v-row><v-checkbox
              v-model="v0"
              label="Cambiar Contraseña"
              @click="verComentarios(card)"
            ></v-checkbox>
      <v-row v-if="v0==true">
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="lastpassword"
            label="Contraseña anterior"
            type="password"
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
            :rules="RolconPassword.concat(RolConfirmarPassword)"
            label="Confirme Contraseña"
            type="password"
          ></v-text-field>
        </v-col>
       <!-- <v-col cols="12" sm="6">
          <v-text-field
            v-model="lastpassword"
            label="Confirmar Contraseña"
            type="password"
          ></v-text-field>
        </v-col> -->
      </v-row>
      <v-row align="center"
      justify="center">
          <v-btn
      dark
        class="mr-4 mb-8 mt-8"
        color="purple"
        style="border-radius: 5px"
        outlined @click="save" v-if="password != '' && password === confirmar && lastpassword != ''">Actualizar</v-btn>
      <v-btn class="mr-4 mb-8 mt-8 ml-12" style="border-radius: 5px" color="green" outlined :to="{name:'Home'}" @click="ena2" >Ir a Inicio</v-btn>
      </v-row>
    </v-form>
  </v-card>
    
  </template>
  
  </v-content>
</v-img>
</template>
<script>
import UserService from "../services/user.service";

export default {
  data: () => ({
    v0:false,
    si: false,
    nombres: "",
    id:"",
    apellidos: "",
    email: "",
    password: "",
    lastpassword: "",
    confirmar: "",
    role: "",
    
    RolTexto: [
      v => !!v || "Este campo es requerido",
      v => /[a-zA-Z]\d*/.test(v) || "No se permiten números"
    ],
    Rolemail: [
      v => !!v || "Correo es requerido",
      v => /.+@.+\..+/.test(v) || "E-mail no valido"
    ],
    Rolpassword: [v => !!v || "Contraseña es requerida"],
    RolconPassword: [v => !!v || "Contraseña es requerida"],
  }),
  computed: {
  RolConfirmarPassword() {
      return () =>
        this.password === this.confirmar || "las contraseñas no coinciden";
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  
  methods: {
    validar(){
      var numeros="0123456789";
      for(var i=0; i<this.nombres.length; i++){
          if (numeros.indexOf(this.nombres.charAt(i),0)!=-1){
            return alert("No se permiten numeros");
          }
      }
      for(var i=0; i<this.apellidos.length; i++){
          if (numeros.indexOf(this.apellidos.charAt(i),0)!=-1){
            return alert("No se permiten numeros");
          }
      }
    }, 

    //__________________________________________
    save() {
      var _id = this.id
      var data = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        password: this.password,
        lastpassword: this.lastpassword
      };
        //_______________________________actualizar________________________
        UserService.update(_id, data)
          .then(response => {
            _id = response.data._id;
            console.log(response.data.usuario);
            alert("Usuario modificado con éxito, los cambios serán visibles en tu próximo inicio de sesion");
            //localStorage.setItem('user', JSON.stringify(response.data.usuario));
            this.ena2();
            this.initialize();
          })
          .catch(e => {
            alert("No se pudo modificar");
            console.log(e);
          });
    },

    //__________________________________________ñ
    initialize() {
        var _id = this.currentUser.id;
        UserService.show(_id)
        .then(res => {
        this.id = res.data.usuario[0]._id;
        this.nombres = res.data.usuario[0].nombres,
        this.apellidos = res.data.usuario[0].apellidos,
        this.email = res.data.usuario[0].email,
        this.password = "",
        this.roles = res.data.usuario[0].roles


          }).catch(e => {
            console.log("neles",e);
            });
        
    },
    ena(){
        this.si = true;
    },
    ena2(){
        this.si = false;
    }
  },
  created(){
    this.initialize();
  }
};
</script>