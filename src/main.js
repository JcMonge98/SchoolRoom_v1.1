import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import firebase from 'firebase'

import Vuex from 'vuex' //*

Vue.use(Vuex)

Vue.config.productionTip = false

firebase.initializeApp({
    apiKey: "AIzaSyDI8KId4do4oDOatiVo9-2QT-vm0az57aQ",
    authDomain: "schoolroom-67921.firebaseapp.com",
    databaseURL: "https://schoolroom-67921.firebaseio.com",
    projectId: "schoolroom-67921",
    storageBucket: "schoolroom-67921.appspot.com",
    messagingSenderId: "225551272221",
    appId: "1:225551272221:web:3937860cbc7e66bda5f9f4"
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')