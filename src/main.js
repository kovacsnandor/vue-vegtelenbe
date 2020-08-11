//css
import 'bootstrap/scss/bootstrap.scss';
import './style.scss';

//js
import Vue from 'vue';
import VueRouter from "vue-router";
import App from './App.vue';
import router from "./router";
import DataService from "./DataService";

//init
Vue.use(VueRouter);
new Vue({
    el: '#app',
    router,
    data() {
        return {
            //Ez azért kell, mert ezen keresztül
            //globálisan tudunk kommunikálni
            //ez felfogható egy globális változónak
            //Ez a struktúra jelenik meg a 
            user: {
                kind: '',
                idToken: '',
                email: '',
                refreshToken: '',
                expiresIn: '',
                localId: ''
            }
        }
    },
    methods: {
        signInAction(credentialsPayload) {
            return this.authAction({
                email: credentialsPayload.email,
                password: credentialsPayload.password,
                isSignUp: false
            })
        },
        signUpAction(credentialsPayload) {
            return this.authAction({
                email: credentialsPayload.email,
                password: credentialsPayload.password,
                isSignUp: true
            })
        },
        authAction(authPayload) {
            return DataService.Auth(authPayload)
                .then(r => this.setUserMutation(r));
            //Letároljuk az új felhasználó adatait

        },
        //Amikor létrejön egy user,
        //evvel tárolom le a szerver válaszát
        //Valójában ez a default userem, aki éppen be van jelentkezve
        setUserMutation(userPayload) {
            console.log('userPayload', userPayload);
            this.user = Object.assign({}, userPayload);
        }
    },
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