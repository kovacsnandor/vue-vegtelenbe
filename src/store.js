import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


import DataService from "./DataService";

//Ez azért kell, mert ezen keresztül
//globálisan tudunk kommunikálni
//ez felfogható egy globális változónak
//Ez a struktúra jelenik meg a
const state = {
    user: {
        kind: '',
        idToken: '',
        email: '',
        refreshToken: '',
        expiresIn: '',
        localId: ''
    }
}

//Ezek indítása: store.dispatch('akciónév')
//Az akciókat "ellőjjük"
const actions = {
    signInAction(vuexContext, credentialsPayload) {
        return vuexContext.dispatch('authAction',{
            // email: credentialsPayload.email,
            // password: credentialsPayload.password,
            ...credentialsPayload,
            isSignUp: false
        })
    },
    signUpAction(vuexContext, credentialsPayload) {
        return vuexContext.dispatch( "authAction", {
            // email: credentialsPayload.email,
            // password: credentialsPayload.password,
            ...credentialsPayload,
            isSignUp: true
        })
    },
    authAction(vuexContext, authPayload) {
        return DataService.Auth(authPayload)
            .then(r => vuexContext.commit("setUserMutation",r));
        //Letároljuk az új felhasználó adatait

    }
};

//Indítása store.commit('mutation név')
//A mutation-okat commitoljuk
const mutations = {
    //Amikor létrejön egy user,
    //evvel tárolom le a szerver válaszát
    //Valójában ez a default userem, aki éppen be van jelentkezve
    setUserMutation(state,userPayload) {
        console.log('userPayload', userPayload);
        state.user = Object.assign({}, userPayload);
    }

}


//innentől kívülről látható a store objektum
export default new Vuex.Store({
    state,
    actions,
    mutations
});