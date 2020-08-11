<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-0 sticky-top">
    <router-link class="navbar-brand fizu" to="/">fizu.hu</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item px-3" v-for="item in itemCollection" :key="item.id">
          <router-link class="nav-link" :to="{name: item.id}" >{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import navItems from '../navItems';
export default {
  data(){
    return  {itemCollection: navItems}
  }
};
</script>