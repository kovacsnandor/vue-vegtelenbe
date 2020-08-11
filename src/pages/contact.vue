<template>
  <div class="container my-4">
    <h2 class="mb-4">Kapcsolat</h2>
    <form class="mb-3">
      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="inputName">Név</label>
          <input type="email" class="form-control" id="inputName" v-model="name" />
        </div>
        <div class="form-group col-12 col-md-6">
          <label for="inputEmail">Email cím</label>
          <input type="email" class="form-control" id="inputEmail" v-model="email" />
        </div>

        <div class="form-group col-12">
          <label for="inputMessage">Üzenet</label>
          <textarea class="form-control" id="inputMessage" rows="3" v-model="message"></textarea>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary" @click.prevent="Submit()">Küldés</button>
          <!-- <button type="submit" class="btn btn-success" @click.prevent="ShowSuccessAlert()">success</button>
          <button type="submit" class="btn btn-danger" @click.prevent="ShowDangerAlert()">danger</button>
          <button type="submit" class="btn btn-warning" @click.prevent="ShowWarningAlert()">warning</button>
          <button type="submit" class="btn btn-secondary" @click.prevent="HideAllAlert()">Hide all</button>-->
        </div>
      </div>
    </form>
    <div
      class="alert alert-success"
      role="alert"
      v-if="alerts.success"
    >Sikeresen elküldtük az üzenetet!</div>
    <div class="alert alert-danger" role="alert" v-if="alerts.danger">
      Az üzenetet nem sikerült elküldeni!
      <br />Kérlek, a hiba körülményeiről írj egy emai-t az alábbi címre:
      <br />
      <a href="mailto:support@fizu.hu">support@fizu.hu</a>
    </div>
    <div
      class="alert alert-warning"
      role="alert"
      v-if="alerts.warning"
    >Üresen maradt valamelyik mező!</div>
  </div>
</template>

<script>
import DataService from "../DataService.js";

export default {
  name: "contact",
  data() {
    return {
      alerts: {
        success: false,
        danger: false,
        warning: false,
      },
      name: null,
      email: null,
      message: null,
    };
  },
  methods: {
    ShowSuccessAlert() {
      this.alerts.success = true;
    },
    ShowDangerAlert() {
      this.alerts.danger = true;
    },
    ShowWarningAlert() {
      this.alerts.warning = true;
    },
    HideAllAlert() {
      this.alerts.danger = false;
      this.alerts.success = false;
      this.alerts.warning = false;
    },
    Submit() {
			this.HideAllAlert();
			if (!this.name || !this.email || !this.message ) {
				this.ShowWarningAlert();
				return;
			} 
      const now = new Date();
      DataService.PostContactMessage({
          email: this.email,
          name: this.name,
          message: this.message,
          date: now.toLocaleString()
      })
      .then((success) => {
        if (success) {
            //siker
            this.ShowSuccessAlert();
        }else{
            //hiba
            this.ShowDangerAlert()
        }
      });
    },
  },
};
</script>