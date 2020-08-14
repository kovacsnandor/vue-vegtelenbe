<template>
  <div class="regisztracio">
    <div class="container">
      <div class="row margin">
        <div class="col-6 mx-auto">
          <!-- alert -->
          <div class="alert alert-danger" role="alert" v-if="alerts.length">
            <ul>
              <li v-for="(alert, index) in alerts" :key="index">{{alert}}</li>
            </ul>
          </div>
          <!-- <div class="alert alert-danger" role="alert" v-if="alerts.danger">
            Nem sikerült elküldeni az adatokat! Kérjük írj az alábbi címre:
            <a
              href="mailto:support@fizu.hu"
            >support@fizu.hu</a>
          </div>-->

          <!-- card -->
          <div class="card login-card mb-3">
            <div class="card-header h3">Regisztrácó</div>
            <div class="card-body">
              <form @submit.prevent="registration()">
                <!-- <div class="form-group">
                  <label for="exampleInputEmail1">Felhasználónév</label>
                  <input type="text" class="form-control" placeholder="Felhasználónév" />
                </div>-->
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    v-model="email"
                  />
                  <small
                    id="emailHelp"
                    class="form-text text-muted"
                  >We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword">Jelszó</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Jelszó még egyszer</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    v-model="password2"
                  />
                </div>

                <!-- <div class="my-3 text-center">
                  <button type="submit" class="btn loginBtn loginBtn--facebook py-2">
                    <i class="fa fa-facebook pr-2"></i>Facebook bejelentkezés
                  </button>
                  <button type="submit" class="btn loginBtn loginBtn--google py-2">
                    <i class="fa fa-google pr-2"></i>Google bejelentkezés
                  </button>
                </div>-->
                <div class="card-footer bg-transparent"></div>
                <button class="btn btn-primary btn-lg btn-block" type="submit">Regisztráció</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TYPES } from '../store';

export default {
  name: "registration",
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      alerts: [],
    };
  },
  methods: {
    registration() {
      if (this.password != this.password2) {
        this.alerts.push("A két jelszó egyezik");
      }
      this.$store.dispatch(TYPES.actions.signUp,{
          email: this.email,
          password: this.password,
        })
        .then(r => {
          //Ezzel lehet kódból betölteni egy modult (mint a routerrel a címsorban)
          //meghívjuk a bejelntkező profilját
          this.$router.push({ name: "profil" });
        })
        .catch(err => {
          this.alerts.push(err);
        });
    },
  },
};
</script>