import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

import Login from '../views/Login.vue'

import ListadoGrado from '../components/ListadoGrado.vue'
import ListadoMateria from '../components/ListadoMateria.vue'
import ListadoAula from '../components/ListadoAula.vue'
import ListadoDocentes from '../components/ListadoDocentes.vue'
import ListadoEncargados from '../components/ListadoEncargados.vue';
import Grado from '../components/Grado.vue'
import GradoEncargados from '../components/GradoEncargados.vue'
//import Tablon from '../components/Tablon.vue'
import ListadoInscripciones from '../components/ListadoInscripciones.vue'
//import ListadoInscripcionesDocente from '../components/ListadoInscripcionesDocente.vue'
//import ListadoInscripcionesEncargado from '../components/ListadoInscripcionesEncargado.vue'

import Tablon2 from '../components/Tablon2.vue'


//agrege aqui
import Register from '../views/Register.vue';

Vue.use(VueRouter)

const routes = [{
        /*path: '/',
        name: 'Login',
        //name: 'Login',
        component: Login*/

        //agegue aqui
        path: '/',
        name: 'home',
        component: Home
    },
    //agegue aqui
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/profile',
        name: 'profile',
        // lazy-loaded
        component: () =>
            import ('../views/Profile.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        // lazy-loaded
        component: () =>
            import ('../views/BoardAdmin.vue')
    },
    {
        path: '/docente',
        name: 'docente',
        // lazy-loaded
        component: () =>
            import ('../views/BoardDocente.vue')
    },
    {
        path: '/encargado',
        name: 'encargado',
        // lazy-loaded
        component: () =>
            import ('../views/BoardEncargado.vue')
    },

    //_____________________________________________________
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/About',
        name: 'About',
        component: About
    },
    {
        path: '/ListadoGrado',
        name: 'ListadoGrado',
        component: ListadoGrado
    },
    {
        path: '/ListadoMateria',
        name: 'ListadoMateria',
        component: ListadoMateria
    },
    {
        path: '/ListadoAula',
        name: 'ListadoAula',
        component: ListadoAula
    },
    {
        path: '/ListadoDocentes',
        name: 'ListadoDocentes',
        component: ListadoDocentes
    },
    {
        path: '/ListadoEncargados',
        name: 'ListadoEncargados',
        component: ListadoEncargados
    },
    {
        path: '/ListadoInscripciones',
        name: 'ListadoInscripciones',
        component: ListadoInscripciones
    },
    /*
        {
            path: '/ListadoInscripcionesDocente',
            name: 'ListadoInscripcionesDocente',
            component: ListadoInscripcionesDocente
        },
        {
            path: '/ListadoInscripcionesEncargado',
            name: 'ListadoInscripcionesEncargado',
            component: ListadoInscripcionesEncargado
        },*/
    {
        path: '/Grado',
        name: 'Grado',
        component: Grado
    },
    {
        path: '/GradoEncargados',
        name: 'GradoEncargados',
        component: GradoEncargados
    },

    {
        path: '/Tablon2',
        name: 'Tablon2',
        component: Tablon2
    },
    {
        path: '/ListadoEncargados',
        name: 'ListadoEncargados',
        component: ListadoEncargados
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router