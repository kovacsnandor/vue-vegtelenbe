import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
const apiKey = "AIzaSyAnXuYXsIii0iObuoiLi9ni8iCk95WuWx0";
const emptyUserObject = {
    kind: '',
    idToken: '',
    email: '',
    refreshToken: '',
    expiresIn: '',
    localId: ''
};

//Vuex indítása
Vue.use(Vuex);

//Ez azért kell, hogy ne sztring literállal kelljen
//a dispatch és commit függvényekbe beírni a neveket.
//hanem az egy helyen legyen definiálva
export const TYPES = {
    actions: {
        signIn: "signIn",
        signUp: "signUp",
        auth: "auth",
        loadPosts: "loadPosts"

    },
    mutations: {
        setUser: "setUser",
        deleteUser: "deleteUser",
        setPosts: "setPosts" // Menti a postokat a state-be
    }
}

//Ez a bejelnkezés állapota (ki van bejelnekezve)
//Ezeket az adatokat a bejeletnkezékor a webszerver küldi vissza
const state = {
    url: {
        signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        firebase: 'https://fizuhulive-ba27c.firebaseio.com/'
    },
    user: {...emptyUserObject, idToken: localStorage.getItem("idToken")},
    posts: []
}

//Ezek indítása: store.dispatch('akciónév')
//Az akciókat "ellőjjük"
const actions = {
    //Bejelntkezés kezdeményezése
    [TYPES.actions.signIn]({
        dispatch
    }, credentialsPayload) {
        return dispatch(TYPES.actions.auth, {
            // email: credentialsPayload.email,
            // password: credentialsPayload.password,
            ...credentialsPayload,
            isSignUp: false
        })
    },
    //Regisztráció kezdeményezése
    [TYPES.actions.signUp]({
        dispatch
    }, credentialsPayload) {
        return dispatch(TYPES.actions.auth, {
            // email: credentialsPayload.email,
            // password: credentialsPayload.password,
            ...credentialsPayload,
            isSignUp: true
        })
    },
    //Az autentikáció kezdeményezése a webszervernél
    [TYPES.actions.auth]({
        commit,
        state
    }, {
        email,
        password,
        isSignUp
    }) {
        return Axios.post(
                isSignUp ? state.url.signUp : state.url.signIn, {
                    "email": email,
                    "password": password,
                    "returnSecureToken": true
                })
            .then(r => r.data)
            .then(r => {
                console.log("loginapi:", r);
                //Letároljuk az új felhasználó adatait
                commit(TYPES.mutations.setUser, r)
                return r;
            })
            .catch(err => {
                console.warn("server hiba:", err);
                //Sikertelenség esetén törlöm a usert
                commit(TYPES.mutations.deleteUser);
                //A promisz láncolat végi catch(...) kapja meg
                //az ide rekott paramétert
                return Promise.reject(err.response.data.error.message);
            });
    },
    [TYPES.actions.loadPosts]({
        commit,
        state
    }) {
        return Axios
            .get(`${state.url.firebase}/blogposts.json?auth=${state.user.idToken}`)
            .then(r => r.data)
            .then((r) => {
                commit(TYPES.mutations.setPosts, r);
                return r;
            });
    }
};

//Indítása store.commit('mutation név')
//A mutation-okat commitoljuk
const mutations = {
    //Amikor létrejön egy user,
    //evvel tárolom le a szerver válaszát
    //Valójában ez a default userem, aki éppen be van jelentkezve
    [TYPES.mutations.setUser](state, userPayload) {
        console.log('userPayload', userPayload);
        state.user = {
            ...userPayload
        };
        //Mentjük a localStorage-ba
        localStorage.setItem("idToken", state.user.idToken)
    },
    [TYPES.mutations.deleteUser](state) {
        //Ezt azért így csináljuk, mert azt akarjuk hogy egy új
        //objektum keletkezzen, mert az objektum referencia típus
        //A másolatot akarom elmenteni
        state.user = {
            ...emptyUserObject
        };
        //Törlöm az "idToken" kulcsú bejegyzést
        //a local Storage-ból
        localStorage.removeItem("idToken");
    },
    [TYPES.mutations.setPosts](state, fbPost) {
        //todo: firebase-ből másképp jönnek az a datok, 
        //mint ahogy nekünk kellene
        state.posts = Object.values(fbPost);
    }


}

//a state egy vagy több elemének a kipublikálása
//saját szájízünk szerint.
//Olyasmi, mint az oop-ben a get
const getters = {
    //Azt állapítjuk meg, hogy be vagyunk-e jelentkezve
    // isLoggedIn(state) {
    //     return Boolean(state.user.idToken);
    // }
    isLoggedIn: state => Boolean(state.user.idToken)
}

//innentől kívülről látható a store objektum
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});