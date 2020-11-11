<template>
<v-img src="https://thumbs.dreamstime.com/b/libros-de-texto-con-una-manzana-roja-delante-un-tablero-tiza-en-blanco-128713770.jpg" gradient="to top right, rgba(100,125,205,.37), rgba(27,35,72,.7)" >
  <v-container id="signinup-form" class="fill-height"  >
    <v-row align="center" justify="center" no-gutters >
      <v-col cols="12" sm="8" md="8" class=""  >
        <v-card class="evelation-12 card" style="border-radius: 20px" >
          <v-window v-model="step" >
            <!--SignIn-->
            
            <v-window-item :value="1" >
              
              <v-row class="" style=" background-color: #82b1ff2e">
                
                <v-col cols="12" md="8" class="pt-6 pb-6" >
                  <v-card-text>
                    <v-form class="signup-form-form" name="form" @submit.prevent="handleLogin">
                      <h6
                        class="text-center display-1 mb-10"                        
                        style="color: #1A237E"
                      >
                       <p class="font-weight-medium">
                      Iniciar Sesion
                      </p>
                      
                      </h6>
                      <!-- cambie aqui -->
                      <v-text-field
                        v-model="user.email"
                    :rules="RolTexto"
                        label="Correo Electronico"
                        name="email"
                        append-icon="person"
                        type="text"
                        color="#1565C0"
                      />
                      <!-- cambie aqui -->
                      <v-text-field
                        v-model="user.password"
                    :rules="RolTexto"
                        label="Contraseña"
                        name="password"
                        append-icon="lock"
                        type="password"
                        color="#1565C0"
                      />
                      <div class="text-center mt-6">
                        <v-btn type="submit" large color="#3F51B5" dark
                         style="border-radius: 5px"
                          >Entrar</v-btn >
                      </div>
                      <br>
                  <v-alert color="red lighten-3" v-if="this.message != ''"><h3 class="text-center">{{message}}</h3></v-alert>
                

                    </v-form>
                  </v-card-text>
                </v-col>
                
                <v-col
                  cols="12"
                  md="4"
                  class="darken-2 vcenter"
                  style="                  
                  padding-bottom: 0px;
                  padding-top: 0px;
                  0px;padding-left: 0px;
                 padding-right: 0px;"
                  

                >
                 <v-img class="white--text align-end" style="border-radius: 20px" height="auto" width="auto." src="../assets/44.jpg"></v-img>
                 <!-- <div>                                        
                      <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">SchoolRoom</h1>
                      <h4 class="text-center overline mb-3">
                        Bienvenid@
                      </h4>
                      <h4 class="text-center overline mb-3" black>
                        Bienvenid@
                      </h4>                       
                       </v-card-text>                                            
                    
                    <div class="text-center mb-6">
                        <v-btn dark outlined @click="step = 2">Sign Up</v-btn> 
                    </div> 
                  </div> -->

                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-img>
</template>

<script>
import User from '../models/user';


export default {
  name: 'Login',
  props: {
    source: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: 'purple'
    },
    fgColor: {
      type: String,
      default: 'white'
    }
  },
  
  data: () => ({
    //agrege aui
    user: new User('', ''),
      loading: false,
      message: '',
    email: '',
    step: 1,
    password: '',
    RolTexto: [v => !!v || "Este campo es requerido"],
    snackbarType: 'success',
    snackbarMessage: '',
    snackbar: false
  }),
/*
  methods: {
    async handleLogin() {
      console.log(this.usuario, this.email, this.password);
      try {
        await auth.login(this.email, this.password);
        this.$router.push("/Home");
      } catch (error) {
        this.error = true;
      }
    }
  },*/

  //agrege aqui
  methods: {
    handleLogin() {
      this.message = '';
      if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              location.reload();
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message = "Correo o Contraseña invalida"
                /*(error.response && error.response.data) ||
                error.message ||
                error.toString();*/
            }
          );
        }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
}
</script>

<style scoped lang="scss">

.v-input__icon--double .v-input__icon {
  margin-left: -4.25rem !important;
}
a.no-text-decoration {
  text-decoration: none;
}
#signinup-form {
  max-width: 75rem;
}
.signup-form-form {
  max-width: 23rem;
  margin: 0 auto;
}
.card {
  overflow: hidden;
}
.vcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>