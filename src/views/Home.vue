<template>
  <v-content>
    <v-carousel cycle height="700" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <div class="container">
      <div v-row>
        <div v-col cols="12" sm="">
          <hr class="section-heading-spacer">
          <div class="clearfix"></div>
          <h2 class="section-heading"></h2>
        </div>
      </div>
    </div>
    <v-row>
      <v-col cols="12" sm="6">
        <!--<h3 class="ml-8 mt-4 ">
          ***Siempre positivas
          Ante la adversidad, una actitud positiva es siempre la mejor respuesta.
          Descárgate gratis la Guía práctica #YoMeQuedoEnCasa con todo lo que necesitas
          para que el confinamiento sea más divertido
          <br>
          <br>
          ***Cambia tus pensamientos y cambiarás tu mundo (Norman Vincent Peale)
          <br><br>
          ***La verdadera educación consiste en obtener lo mejor de uno mismo (Mahatma Gandhi)
          <br><br>
          ***Nuestra paciencia conseguirá más cosas que nuestra fuerza (Edmund Burke)
          <br><br>
          ***El hombre bien preparado para la lucha ha conseguido medio triunfo (Miguel de Cervantes)
          <br><br>
          Es posible recuperarse de una derrota, pero cuesta más perdonarse a uno mismo por no haberlo intentado (George Edward Woodberry)
          <br><br>
        </h3>-->
        <div class="container">
          <h1 p class="text-center"><br>¿Qué es SchoolRoom?</h1>
        <p class="text-md-center font-italic">
          <br>
          <br>
          Es una herramienta desarrollada para mejorar la comunicación por y para los docentes y padres de familia.
        </p>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
         <v-img src="https://images.assetsdelivery.com/compings_v2/stockasso/stockasso1507/stockasso150700266.jpg" width="600" aspect-ratio="1.7" class="ml-12 mt-12" style="border-radius: 28px; padding-rigth:100px"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <div class="container">
      <div v-row>
        <div v-col cols="12" sm="">
          <hr class="section-heading-spacer">
          <div class="clearfix"></div>
          <h2 class="section-heading"></h2>
        </div>
      </div>
       </div>
      <v-col cols="12" sm="6">
        <v-img src="https://i0.wp.com/braibook.com/wp-content/uploads/2018/10/Sugerencias-para-maestros-que-atienden-alumnos-ciegos-a-nivel-licenciatura.png?fit=615%2C290&ssl=1" class="ml-12" style="border-radius: 28px; padding-rigth:100px" width="600" aspect-ratio="1.7"></v-img>
      </v-col>
      <v-col cols="12" sm="6">
         <v-row>
            <div class="container">
              <h1 p class="text-center"><br>¿Cómo funciona?</h1>
            <p class="text-md-left font-italic">
              <br>
              <br>
              Los profesores publicaran las tareas o actividades que lleven tus hijos a casa, podrás estar al pediente de su vida académica 
              y además, puedes consultar en caso de 
              dudas dejando un comentario al respecto.
            </p>
            </div>
         </v-row>
      </v-col>
    </v-row>
        <div class="container">
      <div v-row>
        <div v-col cols="12" sm="">
          <hr class="section-heading-spacer">
          <div class="clearfix"></div>
          <h2 class="section-heading"></h2>
        </div>
      </div>
    </div>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="container">
          <h1 p class="text-center"><br>¡Ayuda extra!</h1>
        <p class="text-md-center font-italic">
              <br>
              <br>
              1-  Solo tienes que ingresar el correo que te fue entregado y la contraseña por defecto que te entregaron 
              en el centro escolar Carlos Arnulfo Crespín (recuerda no compartir esto con nadie que no sea de tu confianza)
              <br>
              <br>
              2- Personaliza con colocar tus datos personales
              <br>
              <br>
              3- Ahora inscribe el código del grado actual de tu hijo o hija
              <br>
              <br>
              4- ¡¡¡LISTO!!! Ahora 
        </p>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
         <v-img src="https://resources.news.e.abb.com/images/2019/2/20/0/small-ABB_EB_KAMILA_IT_19.jpg" width="600" aspect-ratio="1.7" class="ml-12 mt-12" style="border-radius: 28px; padding-rigth:100px"></v-img>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          src: "https://fondosmil.com/fondo/17276.jpg"
        },
        {
            src: "https://st4.depositphotos.com/6530218/20580/i/450/depositphotos_205808004-stock-photo-isolated-turquoise-browed-motmot-eumomota.jpg"
        },
        {
          src: "https://pbs.twimg.com/media/Eh939WtXkAAdCAy.jpg"
        },
        {
            src: "https://3.bp.blogspot.com/-2HLugVK3Gcg/W0PznqmOyEI/AAAAAAAACBA/LUKxGbr2hWIU3THp4qfPWaJScD4sKQmIwCLcBGAs/s1600/maqui.jpg"
        }
      ]
    };
  }
};
</script>