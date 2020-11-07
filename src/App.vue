<template>
  <v-app style="background-color: #9e9e9e42">
    <!-- Encabezado-->
    <v-card color="blue lighten-1" flat height="50px" tile>
      <v-toolbar dense color="#E8EAF6">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <h3 class="text-center font-weight-bold">SchoolRoom</h3>
          </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- menu de sesion-->
        
          <v-btn v-if="!currentUser" color="cyan" text to="/register">Registrarse</v-btn>
          <v-btn v-if="!currentUser" color="#3F51B5" text to="/login">Iniciar Sesion</v-btn>
              
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="270" offset-x>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          
          <v-card v-if="currentUser">
            <v-list >
              <v-list-item>
                <v-list-item-avatar>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHDHqQ7DQSIxDuq7E4gRclTgJUCgnv-gPIIx2YDIbs-gUUYkQF&usqp=CAU"
                    alt="John"
                  />
                </v-list-item-avatar>
                <strong>{{currentUser.nombres + ' '}}{{currentUser.apellidos + ' '}}</strong>
                <!-- <br> -->
               <!-- {{currentUser.role}} -->
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="cyan"  text @click="menu = false" :to="{name:'profile'}">Ver Perfil</v-btn>
              <v-btn color="error"  text @click="menu = false" @click.prevent="logOut">Cerrar Sesion</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <!-- Cierre menu de sesion-->
      </v-toolbar>
    </v-card>
    <!-- Cierre Encabezado-->

    <!-- Menu desplegable izquierdo-->
    <!-- ***************************** Opciones de menu, del administrador ********************************** -->
    <v-navigation-drawer v-model="drawer" absolute temporary >
      <v-list-item >
        <v-list-item-icon>
          <v-icon>mdi-home-city</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            <h3 class="font-weight-black">SchoolRoom</h3>
            </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense>

        <v-list-item link :to="{name:'Home'}">
          <v-list-item-icon>
            <v-icon class="pb-4 pt-6">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="pb-4 pt-4">Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{name:'profile'}" v-if="showEncargadoBoard || showAdminBoard || showDocenteBoard">
          <v-list-item-icon>
            <v-icon class="pb-4 pt-6">mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="pb-4 pt-4">Ver Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{name:'ListadoGrado'}" v-if="showAdminBoard">
          <v-list-item-icon>
            <v-icon class="pb-4 pt-6">mdi-order-bool-ascending</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="pb-4 pt-4">Grados y Secciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link :to="{name:'ListadoAula'}" v-if="showAdminBoard">
          <v-list-item-icon>
            <v-icon class="pb-4 pt-6">meeting_room</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="pb-4 pt-4">Aulas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{name:'ListadoDocentes'}" v-if="showAdminBoard">
          <v-list-item-icon>
            <v-icon class="pb-4 pt-6">mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="pb-4 pt-4">Docentes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{name:'ListadoEncargados'}" v-if="showAdminBoard">
          <v-list-item-icon>
            <v-icon class="pb-4 pt-6">mdi-account-child</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="pb-4 pt-4">Encargados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{name:'ListadoInscripciones'}" v-if="showEncargadoBoard || showAdminBoard || showDocenteBoard">
          <v-list-item-icon>
            <v-icon class="pb-4 pt-6">mdi-badge-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="pb-4 pt-4">Inscripciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> 
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    // HelloWorld,
  },

  data: () => ({
    draw: false,
    drawer: null,
    menu: false
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    //agrege aqui
    showAdminBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role.includes('ROLE_ADMIN');
      }

      return false;
    },
    showDocenteBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role.includes('ROLE_DOCENTE');
      }

      return false;
    },
    showEncargadoBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role.includes('ROLE_ENCARGADO');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
      localStorage.clear();
    },

    created(){
        document.title = "SchoolRoom";
      
    },
  },
  


};
</script>
