import DataService from "./DataService";

let store = {
    state: {
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
    },
    signInAction(credentialsPayload) {
        return this.authAction({
            // email: credentialsPayload.email,
            // password: credentialsPayload.password,
            ...credentialsPayload,
            isSignUp: false
        })
    },
    signUpAction(credentialsPayload) {
        return this.authAction({
            // email: credentialsPayload.email,
            // password: credentialsPayload.password,
            ...credentialsPayload,
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
        this.state.user = Object.assign({}, userPayload);
    }

};

//innentől kívülről látható a store objektum
export default store;