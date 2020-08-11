<template>
  <div class="jumbotron jumbotron-fluid mb-0">
    <div class="container">
      <!-- <h1>{{title}}</h1> -->
      <h1>
          <slot name="title"></slot>
      </h1>
      <!-- <p class="lead">{{lead}}</p> -->
      <p class="lead">
          <slot name='lead'></slot>
      </p>
      <a class="btn btn-green btn-lg mt-3" :href="buttonURL" role="button">{{buttonText}}</a>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        'title', 'lead', 'buttonText', 'buttonURL'
    ]
}
</script>