<template>
  <v-container id="signinup-form" class="fill-height">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="8" class="">
        <v-card class="evelation-12 card">
          <v-window v-model="step">
            <!--SignIn-->
            <v-window-item :value="1">
              <v-row class="">
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <v-form class="signup-form-form" @submit.prevent="login">
                      <h1
                        class="text-center display-1 mb-10"
                        :class="`${bgColor}--text`"
                      >
                        Iniciar Sesión
                      </h1>
                      <v-text-field
                        id="username"
                        v-model="email"
                        
                    :rules="RolTexto"
                        label="Nombre de usuario"
                        name="Username"
                        append-icon="person"
                        type="text"
                        :color="bgColor"
                      />
                      <v-text-field
                        id="password"
                        v-model="password"
                    :rules="RolTexto"
                        label="Contraseña"
                        name="Password"
                        append-icon="lock"
                        type="password"
                        :color="bgColor"
                      />
                      <div class="text-center mt-6">
                        <v-btn type="submit" large :color="bgColor" dark
                          >Entrar</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="darken-2 vcenter"
                  :class="`${bgColor}`"
                >
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">SchoolRoom</h1>
                      <h4 class="text-center overline mb-3">
                        Bienvenid@
                      </h4>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <!--  <v-btn dark outlined @click="step = 2">Sign Up</v-btn> -->
                    </div> 
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import auth from "@/Login/auth";
export default {
  name: 'Signupform',
  props: {
    source: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: 'green'
    },
    fgColor: {
      type: String,
      default: 'white'
    }
  },
  
  data: () => ({
    step: 1,
    email: '',
    password: '',
    RolTexto: [v => !!v || "Este campo es requerido"],
    snackbarType: 'success',
    snackbarMessage: '',
    snackbar: false
  }),
  methods: {
    async login() {
      console.log(this.usuario, this.email, this.password);
      try {
        await auth.login(this.email, this.password);
        this.$router.push("/Home");
      } catch (error) {
        this.error = true;
      }
    }
  }
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