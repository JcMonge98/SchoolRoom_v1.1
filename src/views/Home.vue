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
    <v-row>
      <v-col cols="12" sm="6">
        <h3 class="ml-8 mt-4 ">
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
        </h3>
      </v-col>
      <v-col cols="12" sm="6">
         <v-img src="https://s1.significados.com/foto/online-3412473-640_bg.jpg" width="600" aspect-ratio="1.7" class="ml-12 mt-12" style="border-radius: 28px; padding-rigth:100px"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-img src="https://www.doctorponce.com/wp-content/uploads/2019/06/doctor-ponce-1024x678.jpg" class="ml-12" style="border-radius: 28px; padding-rigth:100px" width="600" aspect-ratio="1.7"></v-img>
      </v-col>
      <v-col cols="12" sm="6">
         <h3 class="mr-8 mt-4 mb-12">
          ***Momentos de crisis nos ayudan a tomar consciencia de lo pequeño que es el 
          ser humano y la importancia de disfrutar al máximo cada día.
          <br><br>
          ***Los libros son peligrosos. Los mejores deberían ser etiquetados con un "Esto podría cambiar tu vida" (Helen Exley)
          <br><br>
          ***La juventud es el momento de estudiar la sabiduría; la vejez, el de practicarla (Jean Jacques Rousseau)
          <br><br>
          ***Aprender sin pensar es inútil. Pensar sin aprender, peligroso (Confucio)
          <br><br>
          ***Emplea todos tus esfuerzos, incluso cuando las posibilidades jueguen en tu contra (Arnold Palmer)
          <br><br>
          ***Ponte objetivos arduos y no pares hasta llegar ahí (Bo Jackson)
        </h3>
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
          src: "https://fondosmil.com/fondo/17300.jpg"
        },
        {
          src:
            "http://3.bp.blogspot.com/-boSC713hY7Y/Ut_vW7dci3I/AAAAAAAAAH4/fOLwoBYDPFI/s1600/tics4.jpg"
        },
        {
          src:
            "http://3.bp.blogspot.com/-hmzecyQYs44/Ut_vcyoS79I/AAAAAAAAAIA/CudN3nTin6c/s1600/tics5.jpg"
        }
      ]
    };
  }
};
</script>
