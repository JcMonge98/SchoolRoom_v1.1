<template>
<v-img src="https://cdn.wallpapersafari.com/8/23/NKZOwi.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" >
  <v-card class="mx-auto mt-12" max-width="1000" style="border-radius: 15px">
    <v-card-title>
      <h2 class="text-center font-weight-medium" style="color: #1A237E">Formulario Registrar Usuarios</h2>
    </v-card-title>
    <v-form class="mr-5 ml-5 mt-5 mb-12" name="form" @submit.prevent="handleRegister">
      <v-row>
        <v-col cols="4" sm="4"></v-col>
        <v-col cols="4" sm="4">
          <v-text-field
            color="#1565C0"
            v-model="codigoVerificacion"
            name="codigo"
            label="Inserte código de verificación"
          ></v-text-field>
        </v-col>
        
        <v-col cols="8" sm="4">
          <v-btn
            color="#1A237E"
            outlined
            text
            @click="verificar()"
            v-if="codigoVerificacion.length > 3"
            enabled
          >Verificar</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
          v-if="this.verificado == true"
            v-model="user.nombres"
            name="nombres"
            :rules="RolTexto"
            label="Nombres"
            required
            hint="Ej:  Juan Alberto"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
          v-if="this.verificado == true"
            v-model="user.apellidos"
            name="apellidos"
            :rules="RolTexto"
            label="Apellidos"
            hint="Ej:  Perez Sosa"
            persistent-hint
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
          v-if="this.verificado == true"
            v-model="user.email"
            name="email"
            :rules="Rolemail"
            label="Correo Electrónico"
            disabled
          ></v-text-field>
          
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn
        color="blue darken-1"
        outlined
        @click="generarCorreo"
        v-if="user.nombres.length >= 3 && user.apellidos.length >= 5  && user.email ==''"
        enabled
      >Generar Correo</v-btn>
          <v-text-field v-if="this.verificado == true && user.email !=''" v-model="user.roles" label="Rol" type="text" value="encargado" disabled></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.password"
            name="password"
            :rules="Rolpassword"
            label="Contraseña"
            type="password"
            v-if="user.email != '' && this.verificado == true"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="confirmar"
            :rules="RolconPassword.concat(RolConfirmarPassword)"
            label="Confirmar Contraseña"
            type="password"
            v-if="user.email != '' && this.verificado == true"
          ></v-text-field>
        </v-col>
      </v-row>
      
      <v-btn
        dark
        class="mr-4 mb-8 mt-8"
        color="purple"
        type="submit"
        v-if="user.nombres.length > 3 && user.apellidos.length > 3 && user.email !='' && user.password.length >7 && user.password == confirmar"
      >Registrar</v-btn>
      <v-btn class="mr-4 mb-8 mt-8 ml-12" color="orange" :to="{name:'Home'}" v-if="this.verificado == true" dark outlined>Cancelar</v-btn>
    </v-form>
    <!-- agrege aqui 
    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >{{message}}</div>
    <v-alert color="red lighten-3" v-if="this.password.length < 7 && this.verificado == true" enabled>
      <h3 class="text-center">Debe ingresar 8 caracteres minimo</h3>
    </v-alert> -->
    <!-- <v-btn class="mr-4 mb-8 mt-8 ml-12" color="orange" :to="{name:'ListadoEncargados'}">Cancelar</v-btn> -->
  </v-card>
</v-img>
</template>

<script>
//agrege esto
import User from "../models/user";
import UserService from "../services/user.service";
import GradoService from "../services/gradosService";
import gradosService from "../services/gradosService";

export default {
  data: () => ({
    codigoVerificacion: "",
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    confirmar: "",
    roles: "encargado",
    RolTexto: [
      v => !!v || "Este campo es requerido",
      v => /[a-zA-Z]\d*/.test(v) || "No se permiten números",
      v => (v || '').length > 2 || "Mínimo 3 caracteres"
    ],
    Rolemail: [
      v => !!v || "Correo es requerido",
      v => /.+@.+\..+/.test(v) || "E-mail no válido"
    ],
    Rolpassword: [v => !!v || "Contraseña es requerida",
    v => (v || '').length > 7 || "Mínimo 8 caracteres"],

    RolconPassword: [v => !!v || "Contraseña es requerida"],

    //agrege esto
    user: new User("", "", ""),
    submitted: false,
    successful: false,
    message: "",
    verificado: false
  }),
  created() {
    this.user.roles = "encargado";
  },

  methods: {
    verificar() {
      var codigo = this.codigoVerificacion;
      /*gradosService
        .verificar(codigo)
        .then(res => {
          //console.log("si entre",res.data.v[0].codigo);
          if (codigo == res.data.v[0].codigo) {
            console.log("si entre x2");
            this.verificado = true;
          }
          
          
        })
        .catch(e => {
          alert("codigo no valido")
          console.log(e);
        });*/
        if (codigo == 'v3r1f1') {
            this.verificado = true;
          }
          else{
            alert("Código no valido")
            this.verificado = false;
          }
    },

    generarCorreo() {
      var nombres = this.user.nombres;
      var apellidos = this.user.apellidos;
      console.log(nombres, apellidos);
      UserService.correoaleatorio(nombres, apellidos)
        .then(res => {
          console.log(res.data.correo);
          this.user.email = res.data.correo;
        })
        .catch(e => {
          alert("Error al generar")
          console.log(e);
        });
    },
    /*
    submit() {
      this.$refs.form.reset();
    }*/
    handleRegister() {
      this.message = "";
      this.submitted = true;

      this.$store.dispatch("auth/register", this.user).then(
        data => {
          this.message = data.message;
          this.successful = true;
          alert("Usuario creado con éxito. Su correo es :"+this.user.email);
          this.$router.push("/login");
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    }
  },
  computed: {
    RolConfirmarPassword() {
      return () =>
        this.user.password === this.confirmar || "las contraseñas no coinciden";
    },
    //agrege esto
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  //agrege esto
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  }
};
</script>