<template>
  <div class="col-12 col-lg-6 my-3">
    <!-- card -->
    <div class="card blog-card">
      <img class="card-img-top" :src="post.imageSrc" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title text-uppercase">{{post.title}}</h5>
        <p class="card-text">{{post.lead}}</p>
        <div class="d-flex flex-row justify-content-between align-items-center">
          <p class="card-text">
            <small class="text-muted">{{post.date}}</small>
          </p>
          <router-link 
            :to="{name: 'blogPost',  params: {postID: post.id}}" 
            class="m-0">
                Tovább olvasom... ({{post.id}})
        	</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>