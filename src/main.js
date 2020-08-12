//css
import 'bootstrap/scss/bootstrap.scss';
import './style.scss';

//js
import Vue from 'vue';
import VueRouter from "vue-router";
import App from './App.vue';
import router from "./router";
import store from "./store";


//init
Vue.use(VueRouter);
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

//Data service teszt
// import DataService from './Dataservice.js';

// const message = {
//     email : "feri@netacademia.hu",
//     message : "Teszt üzenet 3",
//     name : "Feri"
//   }

// DataService.PostContactMessage(message).then(success => {
//     console.log('result:', success);
// });